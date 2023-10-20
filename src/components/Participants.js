import { memo, useCallback, useState } from "react";
import { PENDING } from "../constants";
import { getUsersByEmail } from "../services/user";
import { Box, Button, CircularProgress, Grid, InputAdornment, MenuItem, TextField } from "@mui/material";
import { Add, Cancel, FiberNew, Save } from "@mui/icons-material";
import ParticipantsTable from "./ParticipantsTable";
import { debounce } from '../utils/debounce';
import { validateEmail } from "../utils/email";


const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  gender: '',
  phoneNumber: '',
  invitation: PENDING,
  attended: false,
};

// timer in ms
const TIMER = 1000;

function Participants({ participants = [], onChange, disabled }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [fieldError, setFieldError] = useState({});
  const [newParticipant, setNewParticipant] = useState(initialValues);
  const [isNewUser, setIsNewUser] = useState(false);
  const [syncing, setSyncing] = useState(false);

  const handleDelete = useCallback(
    (row) => {
      onChange(participants.filter((p) => p.email !== row.email));
    },
    [onChange, participants]
  );

  const handleAdd = useCallback(() => {
    const fieldError = {};

    ['firstName', 'lastName', 'email', 'gender'].forEach((key) => {
      if (!newParticipant[key]) {
        fieldError[key] = true;
      }
    });

    if (participants.map((p) => p.email).includes(newParticipant.email)) {
      fieldError.email = 'User was already added';
    }

    if (!validateEmail(newParticipant.email)) {
      fieldError.email = 'Invalid email address';
    }

    if (Object.keys(fieldError).length) {
      return setFieldError(fieldError);
    }

    setShowAddForm(false);
    onChange([...participants, newParticipant]);
    setFieldError({});
    setNewParticipant(initialValues);
  }, [newParticipant, onChange, participants]);

  const handleSearch = useCallback(
    async (email) => {
      if (fieldError.email) {
        fieldError.email = undefined;
        setFieldError(fieldError);
      }
      setIsNewUser(false);
      setNewParticipant({ ...initialValues, email });

      if (!validateEmail(email)) {
        fieldError.email = 'Invalid email address';
        setFieldError(fieldError);
      } else {
        // get user info
        const user = await getUsersByEmail([email]);
        
        if (user && user.length > 0) {
          // is existing user
          setIsNewUser(false);
          const { firstName, lastName, phoneNumber, gender } = user[0].data();
          setNewParticipant((newParticipant) => ({
            ...newParticipant,
            firstName,
            lastName,
            phoneNumber,
            gender,
          }));
        } else {
          // is new user
          setIsNewUser(true);
        }
      }
      setSyncing(false);
    },
    [fieldError]
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

  return (
    <Grid container spacing={2} direction='column'>
      <Grid item container alignItems='center' spacing={2}>
        <Grid item>
          <h4>Participants</h4>
        </Grid>
        {showAddForm && (
          <Grid item>
            <Button
              color='secondary'
              type='button'
              onClick={() => {
                setShowAddForm(false);
                setFieldError({});
                setNewParticipant(initialValues);
              }}
              startIcon={<Cancel />}
              variant='contained'
            >
              Cancel
            </Button>
          </Grid>
        )}
        <Grid item>
          <Button
            color='primary'
            type='button'
            onClick={() => (showAddForm ? handleAdd() : setShowAddForm(true))}
            startIcon={showAddForm ? <Save /> : <Add />}
            variant='contained'
            disabled={disabled}
          >
            Add
          </Button>
        </Grid>
      </Grid>
      {showAddForm && (
        <Grid item>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                value={newParticipant.email}
                onChange={handleInputChange}
                name='email'
                fullWidth
                variant='outlined'
                label='Email'
                required
                type='email'
                error={!!fieldError.email}
                helperText={fieldError.email || ''}
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
                    : undefined
                }
              />
            </Grid>
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
              <Grid item container spacing={2}>
                <Grid item xs>
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
                <Grid item xs>
                  <TextField
                    disabled={!isNewUser}
                    value={newParticipant.lastName}
                    onChange={handleInputChange}
                    name='lastName'
                    fullWidth
                    variant='outlined'
                    label='Last Name'
                    required
                    error={fieldError.lastName}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
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
          </Grid>
        </Grid>
      )}
      <Grid item>
        <Box minHeight={100}>
          <ParticipantsTable
            onChange={onChange}
            onDelete={handleDelete}
            participants={participants}
          />
        </Box>
      </Grid>
    </Grid>
  )
}

export default memo(Participants);