import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Box, Breadcrumbs, Button, Container, Divider, Grid, Link, Typography } from '@mui/material';
import { ArrowRightAlt, ChevronRight, Favorite } from '@mui/icons-material';

import { COLORS } from '../src/theme';

import faqImg from '../public/images/faq.jpg';
import { routes } from '../src/routes';
import { QA } from '../src/constants/qa';
import Reviews from '../src/components/Reviews';
import Head from 'next/head';

export default function FAQ() {
  const [collapsed, setCollapsed] = useState();
  const router = useRouter()

  return (
    <>
      <Box py={4} bgcolor={COLORS.lightGrey}>
        <Head>
          <title>Dating Frequently Asked Questions | True Dating</title>
          <meta name="description" content="Check out our frequently asked questions at True Dating. Join our premier speed dating and singles events service in London and enjoy the best benefits!" />
          <meta name='keywords' content='Single People' />
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
            <Typography color="text.primary">FAQ</Typography>
          </Breadcrumbs>
        </Container>
        <Box py={4}>
          <Container>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={12} md={6} sx={(theme) => ({
                '& img': {
                  maxWidth: '100%',
                  borderRadius: 15,
                  boxShadow: theme.shadows[2],
                }
              })}>
                <Image src={faqImg} alt='Speed Dating FAQs' />
                <Box py={2}>
                  <h1>
                    Frequently Asked <span style={{ fontWeight: 500 }}>Questions</span>
                  </h1>
                </Box>
                <p>
                  So what makes our events different from all the others? Because these are singles events for single people, run by single people. We know what makes a great event and we have the best hosts on hand to ensure you get the most out of your night. This is really where we think we stand out.
                </p>
                <br />
                <p>
                  Our hosts are going to be like your friend - supportive, encouraging and really annoying if they think you fancy someone. But seriously, our hosts are there to make you feel welcome and enjoy the night. They promise to help create a fantastic atmosphere at each of our events.
                </p>
                <br />
                <p>
                  We run speed dating events on a weekly basis and singles parties and social mixers on a monthly basis, all over London. Our events will cover different age ranges so there will be something for everyone. As much as we love you, we don't want you to become regular customers. Our events aren't designed for you to keep coming back but for you to make the most of them and find someone special. The more weddings, the better!
                </p>
                <Box pt={4}>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={() => router.push(routes.events)}
                    endIcon={<ArrowRightAlt />}
                  >
                    View Events
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Grid container direction='column' spacing={3}>
                  {QA.map((qa, i) => (
                    <Grid item container key={qa.q} alignItems='center'>
                      <Favorite color='primary' />
                      <Typography variant='h4'
                        onClick={() => setCollapsed((collapsed) => (collapsed === i ? undefined : i))}
                        sx={(theme) => ({
                          margin: theme.spacing(0, 1),
                          marginRight: 'auto',
                          '&:hover': {
                            cursor: 'pointer',
                          },
                        })}
                        fontSize={'1rem'}
                        fontWeight={700}
                      >
                        {qa.q}
                      </Typography>
                      <ChevronRight
                        color='primary'
                        fontSize='large'
                        className={collapsed === i ? 'arrow-down' : undefined}
                        sx={(theme) => ({
                          transition: theme.transitions.create(['transform']),
                          '&.arrow-down': {
                            transform: 'rotate(90deg)',
                          },
                          '&:hover': {
                            cursor: 'pointer',
                          },
                        })}
                        onClick={() => setCollapsed((collapsed) => (collapsed === i ? undefined : i))}
                      />
                      <Box
                        className={!(collapsed === i) ? '' : 'visible'}
                        sx={(theme) => ({
                          maxHeight: 0,
                          overflow: 'hidden',
                          transition: theme.transitions.create(['max-height'], {
                            duration: 500,
                            easing: theme.transitions.easing.easeInOut,
                          }),
                      
                          paddingLeft: theme.spacing(4),
                          '& p': {
                            padding: theme.spacing(2, 0, 1, 0),
                          },
                          '&.visible': {
                            maxHeight: 1000,
                          },
                        })}
                      >
                        <p>{qa.a}</p>
                      </Box>
                      <Box width='100%' pt={2} pl={4}>
                        <Divider />
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
      <Reviews />
    </>
  )
}

export const getServerSideProps = async ({ req, res }) => {
  return {
    props: {
      'events' : 'e'
    }
  }
}