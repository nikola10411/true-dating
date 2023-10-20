import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../src/contexts/AuthProvider";
import { routes } from "../src/routes";
import { Alert, Box, Button, CircularProgress, Grid, Link, TextField, Typography } from "@mui/material";
import Logo from "../src/components/Logo";
import { validateEmail } from "../src/utils/email";
import { validatePassword } from '../src/utils/password';
import { INVALID_EMAIL, INVALID_PASSWORD, USER_NOT_FOUND, WRONG_PASSWORD } from "../src/constants";

import { signIn } from "../src/services/auth";

export default function Login() {
  const router = useRouter()
  const { user, syncing } = useAuth();
  const [state, setState] = useState({
    email: '',
    password: '',
    errors: {},
    loading: false,
  });
  const [serverError, setServerError] = useState(null);

  useEffect(() => {
    // window.gtag('event', 'user_visit_login', { });  
  }, [])

  const handleInputChange = ({ target: { name, value } }) => {
    if (state.errors[name]) {
      delete state.errors[name];
    }
    setState({ ...state, [name]: value });
  };

  const validateFormFields = (email, password) => {
    const validEmail = validateEmail(email);
    const validPassword = validatePassword(password);
    const errors = {};

    if (Object.keys(state.errors).length > 0) {
      setState((state) => ({ ...state, errors: {} }));
    }

    if (!validEmail) {
      errors.email = INVALID_EMAIL;
    }

    if (!validPassword) {
      errors.password = INVALID_PASSWORD;
    }

    if (Object.keys(errors).length > 0) {
      setState({ ...state, errors });
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = state;
    const valid = validateFormFields(email, password);
    if (!valid) return;

    setServerError(null);
    try {
      setState((state) => ({ ...state, loading: true }));
      await signIn(email, password);
    } catch (error) {
      setState({ ...state, loading: false });
      if (error.code === USER_NOT_FOUND) {
        return setServerError('This email is not registered!');
      }

      if (error.code === WRONG_PASSWORD) {
        return setServerError('Wrong password!');
      }

      console.log(error)

      setServerError(error.message);
    }
  };

  const handleSignUp = () => {
    let state = {}
    if (router && router.query && router.query.data) {
      state.redirectTo = router.query.data
    }
    router.push({
      pathname: routes.signUp,
      state,
    });
  }


  if (user && !syncing) {
    if (user.isAdmin) {
      return router.replace(routes.admin);
    } else {
      if (router && router.query && router.query.data) {
        return router.replace(router.query.data);
      } else {
        return router.replace(routes.home);
      }
    }
  }

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
            <form onChange={handleInputChange} onSubmit={handleSubmit} style={{ width: '100%' }}>
              <Grid container spacing={2}>
                {!!serverError && (
                  <Grid item xs={12}>
                    <Alert severity="error">{serverError}</Alert>
                  </Grid>
                )}
              </Grid>
              <Grid item sx={12} mt={2}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  autoFocus
                  error={!!state.errors.email}
                  helperText={state.errors.email || ''}
                />
              </Grid>
              <Grid item xs={12} mt={2}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='current-password'
                  error={!!state.errors.password}
                  helperText={state.errors.password || ''}
                />
              </Grid>
              <Grid item container justifyContent='flex-end' alignItems='center' mt={2}>
                <Link href={routes.passwordReset} underline="none">Forgot Password?</Link>
              </Grid>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                sx={{
                  mt: 2
                }}
                disabled={state.loading}
                endIcon={state.loading ? <CircularProgress size={16} /> : undefined}
              >
                Sign In
              </Button>
              <Box textAlign='center' mt={2}>
                <Typography component='span' variant='body2'>
                  {`Don't have an account? `}
                </Typography>
                <Link className="login_signupButton" onClick={handleSignUp} variant='body2' underline="none">
                  {`Sign Up`}
                </Link>
              </Box>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  )
}