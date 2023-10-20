import React, { useState } from 'react';
import { Box, Button, Checkbox, CircularProgress, Dialog, Grid, TextField, Typography, Alert } from "@mui/material";

import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { POUND_SYMBOL } from '../../constants';
import { createPaymentIntent, getCurrentCust, createStrCust } from '../../services/stripe';

import InviteGuest from '../InviteGuest';
import VerticalStepper from '../VerticalStepper'
import DividerWithText from '../DividerWithText';
import { useMemo } from 'react';
import { addUsersToEvent, getEvent, updateEvent } from '../../services/event';
import { useAuth } from '../../contexts/AuthProvider'
import { createOrder } from '../../services/order';
import { getFullName } from '../../utils/fullName';
import { useEffect } from 'react';
import visaImg from '../../../public/images/visa_logo.png';
import mastercardImg from '../../..//public/images/mc_symbol_opt_53_2x.png'
import securePaymentImg from '../../../public/images/secure-stripe-payment-logo.png'
import { COLORS } from "../../theme"
import { useRouter } from 'next/router';
import Image from 'next/image';

function BuyTicketDialog({ open, onClose, nrOfTickets, event }) {
    const { user } = useAuth();
    const [activeStep, setActiveStep] = React.useState(0);
    const [isProcessing, setIsProcessing] = useState(false);
    const [currentCustomer, setCurrentCustomer] = useState({});
    const [useLastPaymentMethod, setUseLastPaymentMethod] = useState(false);
    const [cardValidationError, setCardValidationError] = useState(null);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [isTicketForMe, setIsTicketForMe] = useState(true);
    const [submitError, setSubmitError] = useState(null);
    const stripe = useStripe();
    const elements = useElements();
    const invitedUsersArray = useMemo(() => [], []);
    const [discountCode, setDiscountCode] = useState('');
    const [discountPercent, setDiscountPercent] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const getDetails = async () => {
            const res = await getCurrentCust(user);
            if (res.customerExist) {
                await setCurrentCustomer({ id: res.customerID, card: res.card })
                if (res.card && res.card.id) {
                    setUseLastPaymentMethod(true);
                }
            }
        }
        getDetails()
    }, [])

    const handleNext = (newParticipant) => {
        if (!newParticipant) {
            return;
        }

        invitedUsersArray[activeStep] = newParticipant;
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    useEffect(() => {
        const discountCodes = event.discountCodes
        if (discountCodes && discountCode) {
            const discount = discountCodes.find((eventDiscountCode) => eventDiscountCode.code === discountCode)
            if (discount) {
                setDiscountPercent(discount.percent)
            } else {
                setDiscountPercent(0)
            }
        } else {
            setDiscountPercent(0)
        }
    }, [discountCode, event])

    const checkEventAvailability = async () => {
        try {
            const eventDoc = await getEvent(event.id);
            const pendingUsers = [...invitedUsersArray];
            const pendingMen = pendingUsers.filter((p) => p.gender === 'M');
            const pendingWomen = pendingUsers.filter((p) => p.gender === 'F');

            if (pendingMen.length > eventDoc.menAvailableTickets) {
                throw Error('Not enough available tickets for men');
            }

            if (pendingWomen.length > eventDoc.womenAvailableTickets) {
                throw Error('Not enough available tickets for women');
            }

            return {};
        } catch (error) {
            return { error };
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        if (cardValidationError) {
            setCardValidationError(null);
        }

        if (submitError) {
            setSubmitError(null);
        }

        setIsProcessing(true);

        let paymentMethodID = null
        if (useLastPaymentMethod && currentCustomer.card) {
            paymentMethodID = currentCustomer.card.id
        }

        let customerID = currentCustomer.id;

        if (!paymentMethodID) {
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardElement),
                billing_details: {
                    name: getFullName(user.firstName, user.lastName),
                    email: user.email,
                    phone: user.phoneNumber || '0',
                },
            });
            paymentMethodID = paymentMethod.id;

            if (error) {
                setCardValidationError(error.message);
                return
            }

            // create stripe customer if not there as of now
            if (!currentCustomer.id) {
                const res = await createStrCust(user.email, user.firstName, paymentMethod.id);
                customerID = res.id;
                setCurrentCustomer({ id: res.id })
            }
        }


        const { error } = await checkEventAvailability();
        if (error) {
            setSubmitError(error.message);

            const dialogElement = document.querySelector('.MuiDialog-paper');
            if (dialogElement) {
                dialogElement.scrollTo({ top: 0, behavior: 'smooth' });
            }

            return setIsProcessing(false);
        }

        try {
            const { clientSecret } = await createPaymentIntent(nrOfTickets, event.id, discountCode, customerID);
            // const paymentIntent = {
            //     status: 'succeeded',
            //     amount: 1300,
            //     currency: 'GBP',
            //     created: '',
            //     id: 'xyz',
            // }

            // const error = null;
            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: paymentMethodID,
            });

            if (error) {
                throw error;
            }

            if (paymentIntent.status === 'succeeded') {
                setPaymentSuccess(true);
                // add new participants to the Event
                // with invitation => pending

                // set invitation status for the customer
                const newParticipants = isTicketForMe
                    ? invitedUsersArray.map((u) => {
                        if (u.email === user.email) {
                            return { ...u, invitation: 'sent' };
                        }

                        return u;
                    })
                    : invitedUsersArray;

                if (isTicketForMe) {
                    // update invitation status for the current user
                    // because she/he will receive a confirmation email
                    // and the rest will receive and invitation email
                    const user = newParticipants.find((u) => u.invitation === 'sent');
                    if (user?.gender === 'M') {
                        event.menAvailableTickets = event.menAvailableTickets - 1;
                    }
                    if (user?.gender === 'F') {
                        event.womenAvailableTickets = event.womenAvailableTickets - 1;
                    }
                }

                // update event doc
                updateEvent({
                    ...event,
                    participants: [...event.participants, ...newParticipants],
                });

                const newOrder = {
                    eventId: event.id,
                    invitedUsers: invitedUsersArray.map((u) => u.email),
                    nrOfTickets,
                    amount: paymentIntent.amount,
                    currency: paymentIntent.currency,
                    created: paymentIntent.created,
                    id: paymentIntent.id,
                    billing_details: {
                        name: getFullName(user.firstName, user.lastName),
                        email: user.email,
                        phone: user.phoneNumber || '0',
                    },
                };

                // create new order
                // this will trigger sendConfirmationEmail cloud function
                createOrder(newOrder);

                // send confirmation email

                // add users to the event
                const newUsersToInvite = isTicketForMe ? invitedUsersArray.slice(1) : invitedUsersArray;
                if (newUsersToInvite.length) {
                    addUsersToEvent(newUsersToInvite, event.id);
                }
                setIsProcessing(false);
                router.push(`/thankyou`);
                //router.push(`/thankyou/${newOrder.id}`);
                onClose();
            }
        } catch ({ message }) {
            setCardValidationError(message);
        }


        setIsProcessing(false);
    };

    function getSteps() {
        return [
            ...Array.from(Array(nrOfTickets).keys()).map((_, i) => `Ticket ${i + 1}`),
            'Card Details',
        ];
    }

    function renderCardImage() {
        if (currentCustomer.card) {
            let img = null;
            if (currentCustomer.card.brand == 'visa') {
                img = visaImg;
            } else if (currentCustomer.card.brand == 'mastercard') {
                img = mastercardImg;
            }

            return (
                <Image src={img} width={30} />
            )
        }
    }

    function renderLastPayment() {
        if (currentCustomer.card) {
            return (
                <Box sx={(theme) => ({
                    display: 'flex',
                    flexDirection: 'column',
                    paddingLeft: '2px',
                })}>
                    <Typography variant='caption'>
                        Use last payment method
                    </Typography>
                    <Box sx={(theme) => ({
                          display: 'flex',
                          alignItems: 'center',
                          marginLeft: '-9px',
                          marginTop: '-3px'
                    })}>
                        <Checkbox
                            color='primary'
                            size='small'
                            checked={useLastPaymentMethod}
                            onChange={(event) => {
                                setUseLastPaymentMethod(event.target.checked);
                            }} />
                        {renderCardImage()}
                        <Typography sx={(theme) => ({
                            marginTop: '-2px',
                        })}>
                            {currentCustomer.card.last4}
                        </Typography>
                    </Box>
                </Box>
            )
        }
    }
    function getStepContent(step) {
        switch (step) {
            case 0:
                return (
                    <InviteGuest
                        activeStep={activeStep}
                        handleNext={handleNext}
                        handleBack={handleBack}
                        isGuest={!isTicketForMe}
                        setIsTicketForMe={setIsTicketForMe}
                        invitedUsers={invitedUsersArray}
                        event={event}
                    />
                );
            case getSteps().length - 1:
                return (
                    <form onSubmit={handleSubmit}>
                        <Box sx={(theme) => ({
                            '& .StripeElement': {
                                border: ({ cardValidationError }) =>
                                    `1px solid ${cardValidationError ? theme.palette.error.main : theme.palette.grey[400]}`,
                                padding: theme.spacing(2, 1),
                                borderRadius: theme.shape.borderRadius,
                            },
                        })} py={2}>
                            {cardValidationError && (
                                <Typography color='primary' variant='caption'>
                                    {cardValidationError}
                                </Typography>
                            )}
                            {renderLastPayment()}
                            {!useLastPaymentMethod && <CardElement options={{
                                style: {
                                    base: {
                                        iconColor: COLORS.shark,
                                        fontWeight: '700',
                                        // fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
                                        fontSize: '16px',
                                        fontSmoothing: 'antialiased',
                                        ':-webkit-autofill': {
                                            color: '#fce883',
                                        },
                                        '::placeholder': {
                                            // color: '#87BBFD',
                                        },
                                    },
                                    invalid: {
                                        // iconColor: 'red',
                                        // color: 'rgba(255, 0, 0, 0.5)',
                                    },
                                },
                            }} />}
                        </Box>
                        <Box pb={2}>
                            <TextField
                                value={discountCode}
                                onChange={(e) => setDiscountCode(e.target.value)}
                                label="Discount Code"
                                fullWidth
                                variant='outlined'
                            />
                        </Box>
                        <Button
                            fullWidth
                            className="payButton"
                            variant='contained'
                            color='primary'
                            type='submit'
                            disabled={!stripe || isProcessing}
                            endIcon={isProcessing ? <CircularProgress size={16} /> : undefined}
                        >
                            Pay &nbsp;
                            <Typography variant='h5' style={{ lineHeight: 0, position: 'relative', top: -2 }}>
                                {POUND_SYMBOL}
                                {nrOfTickets * event.ticketPrice * (100 - discountPercent) / 100}
                            </Typography>
                        </Button>
                        <Box my={2}>
                            <DividerWithText text='OR' />
                        </Box>
                        <Button
                            disabled={isProcessing}
                            variant='outlined'
                            color='secondary'
                            onClick={handleBack}
                            fullWidth
                        >
                            Back
                        </Button>
                    </form>
                );
            default:
                return (
                    <InviteGuest
                        isGuest={true}
                        activeStep={activeStep}
                        handleNext={handleNext}
                        handleBack={handleBack}
                        invitedUsers={invitedUsersArray}
                        event={event}
                    />
                );
        }
    }

    return (
        <Dialog
            open={open}
            onClose={isProcessing || paymentSuccess ? undefined : onClose}
            fullWidth
            sx={(theme) => ({
                [theme.breakpoints.down('xs')]: {
                    '& .MuiDialog-paper': {
                        width: '100%',
                        margin: '0 5vw',
                    },
                },
            })}
        >
            <Grid container justifyContent='center' sx={(theme) => ({
                position: 'sticky',
                top: 0,
                zIndex: 2,
                padding: theme.spacing(2),
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                borderBottom: '1px solid #eee',
            })}>
                <Typography variant='h4'>Complete Order</Typography>
            </Grid>

            <Box p={2}>
                {submitError && (
                    <Box mb={2}>
                        <Alert severity='error'>{submitError}</Alert>
                    </Box>
                )}
                <VerticalStepper
                    activeStep={activeStep}
                    getSteps={getSteps}
                    getStepContent={getStepContent}
                />
                <Box py={4} textAlign='center'>
                    <Image
                        className='membership_securePaymentImg'
                        src={securePaymentImg}
                        alt='Secure Payments'
                    />
                </Box>
            </Box>
        </Dialog>
    );
}
export default React.memo(BuyTicketDialog);