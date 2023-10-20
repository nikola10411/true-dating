import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import firebaseApp from "../src/configs/firebase";
import { validateEmail } from "../src/utils/email";
import { Alert, Box, Button, CircularProgress, Grid, TextField } from "@mui/material";
import Logo from "../src/components/Logo";
import { routes } from "../src/routes";
import { useRouter } from "next/router";
import { USER_NOT_FOUND } from "../src/constants";

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(null);
  const router = useRouter()

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (serverError) {
      setServerError(null);
    }

    if (error) {
      setError(null);
    }

    const valid = validateEmail(email);
    if (!valid) {
      return setError(INVALID_EMAIL);
    }

    setLoading(true);
    try {
      const auth = getAuth(firebaseApp);
      await sendPasswordResetEmail(auth, email, { url: `${window.location.origin}/login` });
      setEmailSent(true);
    } catch (error) {
      if (error.code === USER_NOT_FOUND) {
        setServerError('This email is not registered!');
      } else {
        setServerError(error.message);
      }
    }
    setLoading(false);
  };

  const handleInputChange = ({ target: { value } }) => {
    setEmail(value);
  };

  return (
    <Grid container component={'main'} sx={(theme) => ({
      minHeight: '100vh',
      backgroundColor: theme.palette.grey[100]
    })}>
      <Grid item xs={false} sm={4} md={7} sx={{
        backgroundImage: 'url(https://source.unsplash.com/1600x900/?dating)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }} />
      <Grid item container xs={12} sm={8} md={5} sx={(theme) => ({ padding: theme.spacing(4) })}>
        <Grid container alignItems='center' direction='column' justifyContent='center'>
          <Box sx={(theme) => ({
            maxWidth: 400,
            marginBottom: theme.spacing(4),
          })}>
            <Logo />
          </Box>
          <Box maxWidth={500} width={'100%'}>
            <Box width='100%'>
              <Box pb={2}>
                <Alert severity={emailSent ? 'success' : 'info'}>
                  {emailSent ? (
                    <span>
                      Follow the instructions sent to <strong>{email}</strong> to recover your password
                    </span>
                  ) : (
                    'Get instructions sent to this email that explain how to reset your password'
                  )}
                </Alert>
              </Box>

              {serverError && (
                <Box pb={2}>
                  <Alert severity='error'>{serverError}</Alert>
                </Box>
              )}

              <form
                onChange={handleInputChange}
                onSubmit={
                  emailSent
                    ? (e) => {
                      e.preventDefault();
                      return router.push(routes.login);
                    }
                    : handleSubmit
                }
              >
                <Grid container spacing={2}>
                  {!emailSent && (
                    <Grid item xs={12}>
                      <TextField
                        variant='outlined'
                        required
                        fullWidth
                        id='email'
                        label='Email'
                        name='email'
                        autoComplete='email'
                        autoFocus
                        error={!!error}
                        helperText={error || ''}
                      />
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <Button
                      type='submit'
                      fullWidth
                      variant='contained'
                      color='primary'
                      disabled={loading}
                      endIcon={loading ? <CircularProgress size={16} /> : undefined}
                    >
                      {emailSent ? 'Done' : 'Send'}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  )
}