import React, { useCallback, useEffect, useState } from 'react';
import {
    Box,
    Button,
    CircularProgress,
    FormControlLabel,
    Grid,
    InputAdornment,
    MenuItem,
    Switch,
    TextField,
} from "@mui/material";

import { FiberNew, Check } from '@mui/icons-material';
import { PENDING } from '../constants';
import { validateEmail } from '../utils/email';
import { getUserByEmail } from '../services/user';
import { debounce } from '../utils/debounce';
import { useAuth } from '../contexts/AuthProvider'

const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    phoneNumber: '',
    invitation: PENDING,
    attended: false,
    isNewUser: false,
};

// timer in ms
const TIMER = 500;

function InviteGuest({
    activeStep,
    event,
    handleNext,
    handleBack,
    isGuest,
    invitedUsers,
    setIsTicketForMe,
}) {
    const { user } = useAuth();
    const [fieldError, setFieldError] = useState({});
    const [newParticipant, setNewParticipant] = useState(invitedUsers[activeStep] || initialValues);
    const [syncing, setSyncing] = useState(false);
    const emailError = fieldError?.email;
    const { isNewUser } = newParticipant;

    const setCurrentUserAsParticipant = useCallback(() => {
        const { firstName, lastName, phoneNumber, gender, email } = user;
        setNewParticipant({ ...initialValues, firstName, lastName, phoneNumber, gender, email });
    }, [user]);

    useEffect(() => {
        if (activeStep === 0 && !invitedUsers[activeStep]) {
            setCurrentUserAsParticipant();
        }
    }, [activeStep, invitedUsers, setCurrentUserAsParticipant]);

    const handleSearch = useCallback(
        async (email) => {
            const isCurrentUserEmailAddress = user.email === email;
            
            if (fieldError.email) {
                console.log('1')
                fieldError.email = undefined;
                setFieldError(fieldError);
            }

            if (isCurrentUserEmailAddress && !setIsTicketForMe) {
                console.log('2')
                setFieldError({ email: "You can't invite yourself as a guest" });
                return setSyncing(false);
            }

            if (
                invitedUsers.length &&
                invitedUsers.map((u) => u?.email).includes(email) &&
                invitedUsers[activeStep]?.email !== email
            ) {
                console.log('3')
                setFieldError({ email: 'You already have a ticket for this guest' });
                return setSyncing(false);
            }
            console.log('4')
            setNewParticipant({ ...initialValues, email });

            if (!validateEmail(email)) {
                fieldError.email = 'Invalid email address';
                setFieldError(fieldError);
            } else {
                // get user info
                console.log('6')
                const userDoc = isCurrentUserEmailAddress ? user : await getUserByEmail(email);
                if (userDoc) {
                    console.log('7')
                    // is existing user
                    const { firstName, lastName, phoneNumber, gender } = userDoc;
                    setNewParticipant((newParticipant) => ({
                        ...newParticipant,
                        firstName,
                        lastName,
                        phoneNumber,
                        gender,
                    }));

                    if (isCurrentUserEmailAddress && setIsTicketForMe) {
                        setIsTicketForMe(true);
                    }
                } else {
                    console.log('8')
                    // is new user
                    setNewParticipant({ ...initialValues, email, isNewUser: true });
                }
            }
            setSyncing(false);
        },
        [activeStep, fieldError, invitedUsers, setIsTicketForMe, user]
    );

    const handleInputChange = useCallback(
        ({ target: { name, value } }) => {
            setNewParticipant({ ...newParticipant, [name]: value });
            if (name === 'email') {
                setSyncing(true);
                debounce(() => handleSearch(value), TIMER);
            }
        },
        [handleSearch, newParticipant]
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        if (syncing || emailError) {
            // prevent submit
            return;
        }

        if (
            event.participants.length &&
            event.participants.map((p) => p.email).includes(newParticipant.email)
        ) {
            return setFieldError({
                email:
                    newParticipant.email === user.email
                        ? 'You are already invited to this event'
                        : 'This user is already invited to this event',
            });
        }

        handleNext(newParticipant);
    };

    return (
        <form onSubmit={handleSubmit}>
            {setIsTicketForMe && (
                <Grid container alignItems='center'>
                    <h4>This is for me</h4>
                    <Box ml={4}>
                        <FormControlLabel
                            name='featured'
                            label={!isGuest ? 'YES' : 'NO'}
                            labelPlacement='end'
                            checked={!isGuest}
                            control={<Switch color='primary' title='Featured Event' />}
                            onChange={(_, checked) => {
                                if (checked) {
                                    setCurrentUserAsParticipant();
                                    if (emailError) {
                                        setFieldError({});
                                    }
                                } else {
                                    setNewParticipant(initialValues);
                                }

                                setIsTicketForMe(checked);
                            }}
                        />
                    </Box>
                </Grid>
            )}
            <Grid container spacing={2} direction='column'>
                <Grid item>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={!(isNewUser || !isGuest) ? 12 : 6}>
                            <TextField
                                disabled={!isGuest}
                                value={newParticipant.email}
                                onChange={handleInputChange}
                                name='email'
                                fullWidth
                                variant='outlined'
                                label='Email'
                                required
                                type='email'
                                error={!!emailError}
                                helperText={emailError || ''}
                                InputProps={
                                    syncing
                                        ? {
                                            endAdornment: (
                                                <InputAdornment position='end'>
                                                    <CircularProgress size={24} />
                                                </InputAdornment>
                                            ),
                                        }
                                        : isNewUser
                                            ? {
                                                endAdornment: (
                                                    <InputAdornment position='end'>
                                                        <FiberNew size={24} color='primary' />
                                                    </InputAdornment>
                                                ),
                                            }
                                            : isGuest && validateEmail(newParticipant.email) && !fieldError?.email
                                                ? {
                                                    endAdornment: (
                                                        <InputAdornment position='end'>
                                                            <Check size={24} color='primary' />
                                                        </InputAdornment>
                                                    ),
                                                }
                                                : undefined
                                }
                            />
                        </Grid>
                        {(isNewUser || !isGuest) && (
                            <>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        disabled={!isNewUser}
                                        value={newParticipant.gender}
                                        onChange={handleInputChange}
                                        name='gender'
                                        variant='outlined'
                                        fullWidth
                                        label='Gender'
                                        select
                                        required
                                        error={fieldError.gender}
                                    >
                                        <MenuItem value='M'>Male</MenuItem>
                                        <MenuItem value='F'>Female</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        disabled={!isNewUser}
                                        value={newParticipant.firstName}
                                        onChange={handleInputChange}
                                        name='firstName'
                                        fullWidth
                                        variant='outlined'
                                        label='First Name'
                                        required
                                        error={fieldError.firstName}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        disabled={!isNewUser}
                                        value={newParticipant.lastName || ''}
                                        onChange={handleInputChange}
                                        name='lastName'
                                        fullWidth
                                        variant='outlined'
                                        label='Last Name'
                                        required
                                        error={fieldError.lastName}
                                    />
                                </Grid>
                                <Grid item xs>
                                    <TextField
                                        disabled={!isNewUser}
                                        value={newParticipant.phoneNumber || ''}
                                        onChange={handleInputChange}
                                        name='phoneNumber'
                                        fullWidth
                                        variant='outlined'
                                        label='Phone'
                                        type='tel'
                                    />
                                </Grid>
                            </>
                        )}
                    </Grid>
                </Grid>
            </Grid>
            <div sx={(theme) => ({
                marginTop: theme.spacing(2),
                '& button:nth-child(1)': {
                    marginRight: theme.spacing(1),
                },
            })}>
                <div>
                    <Button
                        variant='outlined'
                        color='secondary'
                        disabled={!activeStep}
                        onClick={handleBack}>
                        Back
                    </Button>
                    <Button variant='contained' color='primary'  type='submit'>
                        Next
                    </Button>
                </div>
            </div>
        </form>
    );
}

export default React.memo(InviteGuest);