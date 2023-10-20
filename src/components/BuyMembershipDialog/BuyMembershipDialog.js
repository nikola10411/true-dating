import React, { useState } from 'react';
import { Box, Button, Checkbox, CircularProgress, Dialog, Grid, Typography, Alert } from "@mui/material";

import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { MEMBERSHIP_1_MONTH, MEMBERSHIP_3_MONTHS, MEMBERSHIP_6_MONTHS, POUND_SYMBOL } from '../../constants';
import { getCurrentCust, createStrCust, createMembershipPaymentIntent } from '../../services/stripe';

import VerticalStepper from '../VerticalStepper'
import { useAuth } from '../../contexts/AuthProvider'
import { getFullName } from '../../utils/fullName';
import { useEffect } from 'react';
import visaImg from '/public/images/visa_logo.png';
import mastercardImg from '/public/images/mc_symbol_opt_53_2x.png'
import securePaymentImg from '../../../public/images/secure-stripe-payment-logo.png'

import { updateUserDocument } from '../../services/user';
import { createPaidMembership } from '../../services/paidMembership';
import { COLORS } from "../../theme"
import Image from 'next/image';

function BuyMembershipDialog({ open, onClose, membershipType }) {
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState({});
  const [useLastPaymentMethod, setUseLastPaymentMethod] = useState(false);
  const [cardValidationError, setCardValidationError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  //const classes = useStyles({ cardValidationError });
  const stripe = useStripe();
  const elements = useElements();
  //const options = useOptions();
  //let history = useHistory();

  useEffect(() => {
    const getDetails = async () => {
      if (user) {
        const res = await getCurrentCust(user);
        if (res.customerExist) {
          await setCurrentCustomer({id: res.customerID, card: res.card})
          if (res.card && res.card.id) {
            setUseLastPaymentMethod(true);
          }
        } 
      }   
    }
    getDetails();
  }, [])


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
        await setCurrentCustomer({id: res.id})
      }
    }
    

    try {
      const { clientSecret } = await createMembershipPaymentIntent(membershipType, customerID);
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethodID,
      });

      if (error) {
        throw error;
      }

      if (paymentIntent.status === 'succeeded') {
        setPaymentSuccess(true);
      
        const newMembership = {         
          amount: paymentIntent.amount,
          currency: paymentIntent.currency,
          created: paymentIntent.created,
          id: paymentIntent.id,
          email: user.email,
          billing_details: {
            name: getFullName(user.firstName, user.lastName),
            email: user.email,
            phone: user.phoneNumber || '0',
          },
          membershipType: membershipType
        };


        // create new sub
        // this will trigger sendSubConfirmationEmail cloud function
        createPaidMembership(newMembership);
        const finalData = {id : user.uid, subPurchasedDate: new Date(), membershipType: membershipType, ...user}
        updateUserDocument(finalData)
        
        setIsProcessing(false);
        onClose();
        history.push(`/thankyou/${newMembership.id}`);
      }
    } catch ({ message }) {
      setCardValidationError(message);
    }
  

    setIsProcessing(false);
  };

  function getSteps() {
    return [
      'Card Details',
    ];
  }

  const getMembershipPrice = () => {
    switch (membershipType) {
      case MEMBERSHIP_1_MONTH: {
        return 50
      }
      case MEMBERSHIP_3_MONTHS: {
        return 100
      }
      case MEMBERSHIP_6_MONTHS: {
        return 150
      }        
    }
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
        <img className={classes.cardLogo} src={img}/>
      )
    }
  }

  function renderLastPayment() {
    if (currentCustomer.card) {
        return (
          <Box className={classes.lastPaymentView}>
            <Typography variant='caption'>
              Use last payment method
            </Typography>
            <Box className={classes.checboxView}>
              <Checkbox 
                color='primary'
                size='small'
                checked={useLastPaymentMethod}
                onChange={(event) => {
                  setUseLastPaymentMethod(event.target.checked);
              }}/> 
              {renderCardImage()}
              <Typography className={classes.cardNoText}> 
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
          <form onSubmit={handleSubmit} >
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
                {getMembershipPrice()}
              </Typography>
            </Button>
          
          </form>
        );
      default:
        return (
          <>
          </>
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
       })} >
        <Typography variant='h4'>Complete Order</Typography>
      </Grid>

      <Box p={2}>
        {submitError && (
          <Box mb={2}>
            <Alert severity='error'>{submitError}</Alert>
          </Box>
        )}        
        <VerticalStepper
          activeStep={0}
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
export default React.memo(BuyMembershipDialog);