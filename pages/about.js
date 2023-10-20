import Image from 'next/image';
import { useRouter } from 'next/router';

import { Box, Breadcrumbs, Button, Container, Grid, Link, Typography } from '@mui/material';
import { ArrowRightAlt } from '@mui/icons-material';

import Reviews from '../src/components/Reviews';

import { COLORS } from '../src/theme';

import { routes } from '../src/routes';

import Head from 'next/head';

export default function About() {
  const router = useRouter()
  return (
    <Box textAlign='justify'>
      <Head>
        <title>About Us | True Dating</title>
        <meta name="description" content="True Dating is a premier speed dating and singles events service in London that offers the most outstanding environment and experience to everyone!" />
        <meta name='keywords' content='True Dating' />
      </Head>
      <Box bgcolor={COLORS.lightGrey} py={4}>
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
            <Link underline="hover" color="inherit" href={routes.home}>
              Home
            </Link>
            <Typography color="text.primary">About us</Typography>
          </Breadcrumbs>
        </Container>
        <Box py={4}>
          <Container>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={12} md={6} sx={(theme) => ({
                '& img': {
                  maxWidth: '100%',
                  borderRadius: 8,
                  marginTop: 2,
                  boxShadow: theme.shadows[2],
                  display: 'none',
                  [theme.breakpoints.down('sm')]: {
                    display: 'block',
                    maxWidth: 500,
                    width: '100%',
                  },
                }
              })}>
                <h1>About Us</h1>
                <br />
                <p>Tired of swiping and tired of boring first dates? Look no further.</p>
                <Image width={400} height={400} src={'https://firebasestorage.googleapis.com/v0/b/true-dating-ff8ed.appspot.com/o/images%2Fabout%2FaboutImg1.jpg?alt=media&token=0b953b7a-2d11-4647-9a34-080c9fd8bca8'} alt='Speed Dating London' />
                <br />
                <p>
                  <strong>True Dating:</strong> Where love is just a Speed Date Away! We are the premier speed dating and singles events service in London, bringing like-minded singles together in a fun and electric environment.
                </p>
                <br />
                <p>
                  Regarding dating, it makes more sense to interact face-to-face with people than through regular dating events or dating apps. This is exactly what True Dating provides.
                </p>
                <br />
                <p>
                  At True Dating, we understand that finding love can be challenging; that's why we make it easier for our clients by providing a different and unique way of dating by hosting the best events in London. With our speed dating events and singles events in London, we cater to busy professionals looking for an alternative to the traditional dating scene.
                </p>
                <br />
                <p>
                  Finding love should be fun and electric, so we host speed dating events in London. Our events are designed to help you meet like-minded singles in a fun and relaxed environment.
                </p>

                <br />
                <p>
                  True dating is your solution for dating in London for those who want to meet new people without the hassle of online dating or long-winded first dates.
                </p>

                <br />
                <p>
                  If you're looking for a new and exciting way to meet people, come to one of our events and see if your true love is just a speed date away!
                </p>

                <br />
                <br />
                <h3>
                  <span style={{ fontWeight: 500 }}>Stop Swiping.</span>&nbsp;Start Dating.
                </h3>
                <Box pt={4}>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={() => router.push(routes.faq)}
                    endIcon={<ArrowRightAlt />}
                  >
                    FAQ'S
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6} sx={(theme) => ({
                '& img': {
                  maxWidth: '100%',
                  borderRadius: 8,
                  boxShadow: theme.shadows[2],
                  [theme.breakpoints.down('sm')]: {
                    display: 'none',
                  },
                }
              })}>
                <Image width={1000} height={1000} src={'https://firebasestorage.googleapis.com/v0/b/true-dating-ff8ed.appspot.com/o/images%2Fabout%2FaboutImg1.jpg?alt=media&token=0b953b7a-2d11-4647-9a34-080c9fd8bca8'} alt='Speed Dating London' />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
      <Box py={6}>
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={6} sx={(theme) => ({
              '& img': {
                maxWidth: '100%',
                borderRadius: 8,
                boxShadow: theme.shadows[2],
                [theme.breakpoints.down('sm')]: {
                  display: 'none',
                },
              }
            })}>
              <Image width={1000} height={1000} src={'https://firebasestorage.googleapis.com/v0/b/true-dating-ff8ed.appspot.com/o/images%2Fabout%2FaboutImg2.jpg?alt=media&token=c5c8792f-ef8b-40ce-a44e-171e92484adc'} alt='Singles event london' />
            </Grid>
            <Grid item xs={12} sm={12} md={6} sx={(theme) => ({
              '& img': {
                maxWidth: '100%',
                borderRadius: 8,
                boxShadow: theme.shadows[2],
                display: 'none',
                [theme.breakpoints.down('sm')]: {
                  display: 'block',
                  maxWidth: 500,
                  width: '100%',
                },
              }
            })}>
              <Typography variant='h2' fontSize={'2rem'} fontWeight={700}>What Makes</Typography>
              <Typography variant='h2' fontSize={'2rem'} fontWeight={500}>Our Events Different?</Typography>
              <br />
              <Image width={1000} height={1000} src={'https://firebasestorage.googleapis.com/v0/b/true-dating-ff8ed.appspot.com/o/images%2Fabout%2FaboutImg2.jpg?alt=media&token=c5c8792f-ef8b-40ce-a44e-171e92484adc'} alt='Singles event london' />
              <br />
              <p>
                Our speed dating and singles events are designed to make real connections without wasting any time. We host events across London and limit the number of participants to ensure you get quality time with potential matches. Our events provide a fun, relaxed and easygoing atmosphere where you can meet like-minded individuals looking for love, friendship or just someone to share a good time with.
              </p>
              <br />
              <p>
                These events are singles-only gatherings organized and hosted by and for singles. Our experienced hosts will ensure that everyone feels comfortable and at ease so you can focus on having a good time and getting to know the other singles.
              </p>
              <br />
              <p>
                They will be there to facilitate the conversation and help break the ice, all while ensuring that the event runs smoothly. In addition to our speed dating events, we also host a variety of other singles events, such as mixer events, singles parties and dating events in London to cater for all needs and preferences.
              </p>
              <br />
              <p>
                Whether you are in your 30s, 40s, 50s or beyond, our events cater to a wide range of ages, allowing you to meet individuals in a fun, electric and exciting environment.
              </p>

              <br />
              <p>
                At True Dating, we believe that love and connection should be accessible to everyone, and we're committed to making that happen. We're passionate about what we do. We hope you'll join us at one of our upcoming events and experience the True Dating difference for yourself. So why wait? Sign up today and let us help you find your true match!
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
          </Grid>
        </Container>
      </Box>
      <Box bgcolor={COLORS.lightGrey} py={6}>
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={6} sx={(theme) => ({
              '& img': {
                maxWidth: '100%',
                borderRadius: 8,
                boxShadow: theme.shadows[2],
                display: 'none',
                [theme.breakpoints.down('sm')]: {
                  display: 'block',
                  maxWidth: 500,
                  width: '100%',
                },
              }
            })}>
              <Typography variant='h2' fontSize={'2rem'} fontWeight={700}>
                <Typography variant='span' fontSize={'2rem'} fontWeight={500}>Our </Typography>
                Story
              </Typography>
              <br />
              <Image width={1000} height={1000} src={'https://firebasestorage.googleapis.com/v0/b/true-dating-ff8ed.appspot.com/o/images%2Fabout%2FaboutImg3.jpg?alt=media&token=9e76e6b2-cf7b-4b88-a596-d1474d6ef600'} alt='Our Story' />
              <br />
              <p>
                Founded in 2019, True Dating was formed by a team of singletons who were sick of
                regular dating events. We'd tried them all and found the same problems. Terrible
                venues, unequal ratio of men to women, uninterested hosts, we could keep going...so
                we thought why not create an alternative? Hire fantastic venues suitable for
                meeting people. Recruit brilliant hosts who interact with them throughout the night
                and make them reasonably priced.
              </p>
              <br />
              <p>
                We believe our events are unrivalled for atmosphere and sheer fun. Dating events can
                seem intimidating if you've never tried them before. But they’re a brilliant way of
                getting off the apps and dating websites. You'll get the opportunity to talk too lots
                of people who are there for the same reason you are. Whether you find love or just
                have a really great night out, you'll wonder why you hadn't tried one before.
              </p>

              <Box pt={4}>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={() => history.push(routes.events)}
                  endIcon={<ArrowRightAlt />}
                >
                  View Events
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6} sx={(theme) => ({
              '& img': {
                maxWidth: '100%',
                borderRadius: 8,
                boxShadow: theme.shadows[2],
                [theme.breakpoints.down('sm')]: {
                  display: 'none',
                },
              }
            })}>
              <Image width={1000} height={1000} src={'https://firebasestorage.googleapis.com/v0/b/true-dating-ff8ed.appspot.com/o/images%2Fabout%2FaboutImg3.jpg?alt=media&token=9e76e6b2-cf7b-4b88-a596-d1474d6ef600'} alt='Our Story' />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box py={6}>
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={6} sx={(theme) => ({
              '& img': {
                maxWidth: '100%',
                borderRadius: 8,
                boxShadow: theme.shadows[2],
                [theme.breakpoints.down('sm')]: {
                  display: 'none',
                },
              }
            })}>
              <Image width={1000} height={1000} src={'https://firebasestorage.googleapis.com/v0/b/true-dating-ff8ed.appspot.com/o/images%2Fabout%2Ffounder.jpg?alt=media&token=ce569be8-f9cf-4ebb-b58d-fcc071776032'} alt='Imran Malik - Founder True Dating' />
            </Grid>
            <Grid item xs={12} sm={12} md={6} sx={(theme) => ({
              '& img': {
                maxWidth: '100%',
                borderRadius: 8,
                boxShadow: theme.shadows[2],
                display: 'none',
                [theme.breakpoints.down('sm')]: {
                  display: 'block',
                  maxWidth: 500,
                  width: '100%',
                },
              }
            })}>
              <Typography variant='h2' fontSize={'2rem'} fontWeight={700}>Meet The Founder</Typography>
              <Typography variant='h2' fontSize={'2rem'} fontWeight={500}>Imran Malik</Typography>
              <br />
              <Image width={1000} height={1000} src={'https://firebasestorage.googleapis.com/v0/b/true-dating-ff8ed.appspot.com/o/images%2Fabout%2Ffounder.jpg?alt=media&token=ce569be8-f9cf-4ebb-b58d-fcc071776032'} alt='Imran Malik - Founder True Dating' />
              <br />
              <p>
                A London native, Imran Malik founded True Dating in 2019 after being on the dating
                scene first-hand and knowing there was something missing. His passion lies in
                bringing people together, forming real connections and helping others find their
                special someone in a fun and relaxed environment. In his spare time, he enjoys
                playing tennis, travelling and is an avid supporter of Manchester United. Imran is
                committed to continuously improving the dating experience and open to opportunities
                or partnerships with True Dating. Please reach out if you are interested in
                partnering in this mission at{' '}
                <Link href='mailto:contact@truedating.co.uk' underline='none'>contact@truedating.co.uk</Link>.
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
          </Grid>
        </Container>
      </Box>
      <Reviews bgColor={COLORS.lightGrey} />
    </Box>
  );
}
