import React, { useState } from 'react';
import { Box, Breadcrumbs, Button, CircularProgress, Container, Grid, Link, TextField, Typography } from '@mui/material';
import { COLORS } from '../src/theme';
import { ArrowRightAlt } from '@mui/icons-material';
import { FaFacebookF } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';

import { handleFormSubmit } from '../src/services/contractForm';
import Head from 'next/head';

export default function Contact() {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, message } = e.target;
    setSubmitting(true);

    try {
      await handleFormSubmit({
        name: name.value,
        email: email.value,
        phone: phone.value,
        message: message.value,
      });

      name.value = '';
      email.value = '';
      phone.value = '';
      message.value = '';
    } catch (error) {
      console.error(error?.message);
    }

    setSubmitting(false);
  };

  return (
    <>
      <Box py={3} bgcolor={COLORS.lightGrey}>
        <Head>
          <title>Contact Us | True Dating</title>
          <meta name="description" content="Need help? Get in touch with us and we will get back to you as soon as we can. Stay tuned to our speed dating and singles events and enjoy the best experience." />
          <meta name='keywords' content='Contact' />
        </Head>
        <Container>
          <Breadcrumbs aria-label="breadcrumb" sx={{
            backgroundColor: COLORS.lightGrey,
            color: COLORS.shark,
            paddingTop: '12px',
            marginBottom: '-24px',
            '& a': {
              color: 'grey',
            }
          }}>
            <Link underline="hover" color="inherit" href="/">
              Home
            </Link>
            <Typography color="text.primary">Contact</Typography>
          </Breadcrumbs>
        </Container>
        <Box className={'contactMobileContainer'} py={3}>
          <Container>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <h1>
                  Get In <span style={{ fontWeight: 500 }}>Touch</span>
                </h1>
                <Box py={2}>
                  <p>Contact us or email us and we promise to get back to you as soon as we can.</p>
                </Box>
                <Box py={2}>
                  <h4>Email</h4>
                  <p>contact@truedating.co.uk</p>
                </Box>
                <Box py={2}>
                  <h4>Address</h4>
                  <p>Stateland Court, 3 Cranbrook Lane, London, N11 1PH</p>
                </Box>
                <Box py={2}>
                  <h4>Phone Number</h4>
                  <p>07543662855</p>
                </Box>
                <Box py={2}>
                  <h4>Office Hours</h4>
                  <p>Monday - Saturday 9am - 7pm</p>
                </Box>
                <Box py={2}>
                  <Grid container spacing={2}>
                    <Grid item>
                      <a href='https://www.facebook.com/londondateevents/'>
                        <FaFacebookF color={COLORS.radicalRed} size={32} />
                      </a>
                    </Grid>
                    <Grid item>
                      <a href='https://www.instagram.com/true.dating/'>
                        <FaInstagram color={COLORS.radicalRed} size={32} />
                      </a>
                    </Grid>
                    <Grid item>
                      <a href='https://twitter.com/truedating1'>
                        <FaTwitter color={COLORS.radicalRed} size={32} />
                      </a>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6} sx={{
                '& .MuiTextField-root': {
                  backgroundColor: 'common.white',
                }
              }}>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField variant='outlined' fullWidth label='Name' required name='name' />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField variant='outlined' fullWidth label='Email' required name='email' />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField variant='outlined' fullWidth label='Phone' name='phone' />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant='outlined'
                        fullWidth
                        multiline
                        label='Message'
                        required
                        name='message'
                        minRows={6}
                        maxRows={10}
                      />
                    </Grid>
                    <Grid item>
                      <Button
                        variant='contained'
                        color='primary'
                        endIcon={submitting ? <CircularProgress size={24} /> : <ArrowRightAlt />}
                        type='submit'
                        size='large'
                        disabled={submitting}
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
      <iframe
        style={{ border: 0 }}
        title='location'
        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d619.3355082618414!2d-0.1398828878156904!3d51.616943440589154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761975a53aef5b%3A0x750d7dcc4354386c!2sStateland%20Court%2C%203%20Cranbrook%20Ln%2C%20Arnos%20Grove%2C%20London%20N11%201PH%2C%20UK!5e0!3m2!1sen!2sro!4v1626443590208!5m2!1sen!2sro'
        width='100%'
        height='500'
        allowFullScreen=''
        loading='lazy'
      />
    </>
  );
}