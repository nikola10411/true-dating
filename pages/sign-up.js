import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../src/contexts/AuthProvider";
import { routes } from "../src/routes";
import { Alert, Box, Button, CircularProgress, Grid, InputAdornment, Link, MenuItem, TextField, Tooltip, Typography } from "@mui/material";
import Logo from "../src/components/Logo";
import { Info } from "@mui/icons-material";
import { validateEmail } from "../src/utils/email";
import { validatePassword } from '../src/utils/password';
import { INVALID_EMAIL, INVALID_PASSWORD, USER_NOT_FOUND, WRONG_PASSWORD } from "../src/constants";
import { signUp } from "../src/services/auth";


export default function Login() {
  const router = useRouter()
  const { user, syncing } = useAuth();
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    password: '',
    errors: {},
    loading: false,
  });
  const [serverError, setServerError] = useState(null);

  const confirmPasswordRef = useRef();

  useEffect(() => {
    // window.gtag('event', 'user_visit_login', { });  
  }, [])

  const handleInputChange = ({ target: { name, value } }) => {
    if (state.errors[name]) {
      delete state.errors[name];
    }
    setState({ ...state, [name]: value });
  };

  const validateForm = () => {
    if (serverError) {
      setServerError(null);
    }
    const { email, password } = state;
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

    if (password !== confirmPasswordRef.current?.value) {
      errors.confirmPassword = PASSWORDS_DO_NOT_MATCH;
    }

    if (Object.keys(errors).length > 0) {
      setState({ ...state, errors });
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const valid = validateForm();
    if (!valid) return;

    const { email, password, firstName, lastName, gender } = state;
    setState((state) => ({ ...state, loading: true }));
    try {
      await signUp({ email, password, firstName, lastName, gender });
    } catch (error) {
      setServerError(error.message);
      setState((state) => ({
        ...state,
        loading: false,
      }));
    }
  };



  if (user && !syncing) {
    if (user.isAdmin) {
      return router.replace(routes.admin);
    } else {
      return router.replace(routes.home);
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
            <Box display={'flex'} alignItems={'center'} flexDirection={'column'}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  {serverError && (
                    <Grid item xs={12} mt={2}>
                      <Alert severity='error'>
                        {serverError}
                      </Alert>
                    </Grid>
                  )}
                  <Grid item xs={12} sm={6} >
                    <TextField
                      autoComplete='fname'
                      name='firstName'
                      variant='outlined'
                      required
                      fullWidth
                      id='firstName'
                      label='First Name'
                      autoFocus
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant='outlined'
                      required
                      fullWidth
                      id='lastName'
                      label='Last Name'
                      name='lastName'
                      autoComplete='lname'
                      onChange={handleInputChange}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <Tooltip title='Only your first name will be visible to other members.'>
                              <Info color='action' style={{ cursor: 'default' }} />
                            </Tooltip>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant='outlined'
                      required
                      fullWidth
                      id='email'
                      label='Email Address'
                      name='email'
                      autoComplete='email'
                      error={!!state.errors.email}
                      helperText={state.errors.email || ''}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name='gender'
                      variant='outlined'
                      defaultValue=''
                      fullWidth
                      label='Gender'
                      select
                      required
                      onChange={handleInputChange}
                    >
                      <MenuItem value=''>
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value='M'>Man</MenuItem>
                      <MenuItem value='F'>Woman</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant='outlined'
                      required
                      fullWidth
                      name='password'
                      label='Password'
                      type='password'
                      id='password'
                      error={!!state.errors.password}
                      helperText={state.errors.password || ''}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      inputRef={confirmPasswordRef}
                      variant='outlined'
                      required
                      fullWidth
                      name='confirmPassword'
                      label='Confirm Password'
                      type='password'
                      id='confirmPassword'
                      error={!!state.errors.confirmPassword}
                      helperText={state.errors.confirmPassword || ''}
                    />
                  </Grid>
                  <Grid item xs>
                    <Box textAlign='center'>
                      <Typography component='span' variant='body2'>
                        By signing up you agree to our &nbsp;
                        <Link href={routes.tos} underline="none">
                          Terms of Use
                        </Link>
                        &nbsp; and &nbsp;
                        <Link href={routes.privacyPolicy} underline="none">
                          Privacy Policy
                        </Link>
                      </Typography>
                    </Box>
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
                    Sign Up
                  </Button>
                  <Grid item xs>
                    <Box textAlign='center'>
                      <Typography component='span' variant='body2'>
                        Already have an account?
                      </Typography>
                      <Link href={routes.login} underline="none">
                        {` Sign In`}
                      </Link>
                    </Box>
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