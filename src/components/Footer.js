import { ArrowRightAlt } from "@mui/icons-material"
import { Box, Container, Grid, Button, Link, Typography, useMediaQuery } from "@mui/material"
import { useTheme } from "@mui/system";

import { useState } from "react"
import Image from "next/image";

import { routes } from "../routes";

import logo_white from '../../public/images/logo_white.svg'
import poweredByStripe from '../../public/images/poweredByStripe.png';
import creditCards from '../../public/images/creditcards.png';
import topFooterBg from '../../public/images/top_footer_bg.jpg';

import { FaFacebookF } from 'react-icons/fa';

import { Instagram, Twitter } from "@mui/icons-material";

import {COLORS} from '../theme';

export default function Footer() {
  const [email, setEmail] = useState('')
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  const handleEmailSubscribe = () => {

  }
  const handleEmail = (e) => {
    setEmail(e.target.value)
  }
  return (
    <footer>
      <section id='top_footer' style={{position: 'relative'}}>
        <Image src={topFooterBg} fill style={{objectFit: 'cover', zIndex: 0}} alt="Subscribe Background" />
        <Box pt={4} pb={6} sx={{ position: 'relative', zIndex: 1}}>
          <div className='background_overlay'></div>
          <Container>
            <div className='row' style={{ justifyContent: 'center' }}>
              <h2>
                <strong>Stop Swiping. </strong>Start Dating.
              </h2>
            </div>
            <div className='row' style={{ justifyContent: 'center' }}>
              <p>Subscribe To Receive Emails Of All Future Events and Amazing Discounts.</p>
            </div>

            <Grid container justifyContent='center'>
              <form id='lsubscribe_form' onSubmit={handleEmailSubscribe}>
                <input type='email' placeholder='Enter your email address...' value={email} onChange={handleEmail} />
                <Button
                  variant='contained'
                  color='primary'
                  endIcon={<ArrowRightAlt />}
                  type='submit'
                  size='large'
                >
                  Submit
                </Button>
              </form>
            </Grid>
          </Container>
        </Box>
      </section>

      <section className='true-footer'>
        <Box py={6}>
          <Container>
            <Grid container spacing={isSmall ? 0 : 4}>
              <Grid
                item
                container
                direction='column'
                justifyContent='space-between'
                alignItems={{xs: 'center', sm: 'flex-start'}}
                xs={12}
                sm={6}
                md={6}
                lg={5}
              >
                <Image className="logo" src={logo_white} alt="" />
                <Box pb={2} textAlign={{'xs': 'center', 'sm': 'unset'}}>
                  <Typography variant='body1'>
                    London’s most popular Speed Dating & Singles Parties. Better prices, venues and hosts than anywhere else.
                  </Typography>
                </Box>
                <Box pb={2} textAlign={{'xs': 'center', 'sm': 'unset'}}>
                  <Typography variant='body1'>
                    Registered in England & Wales 13765392 | Stateland Court, 3 Cranbrook Lane, London,
                    N11 1PH | <br /> Tel: 07543662855
                  </Typography>
                </Box>
                <Grid
                  item
                  container
                  spacing={2}
                  justifyContent={{xs: 'center', sm: 'flex-start'}}
                  alignItems='center'
                >
                  <Grid item>
                    <Link href='https://www.facebook.com/londondateevents' aria-label="Facebook">
                      <FaFacebookF style={{ fill: COLORS.radicalRed }} size={20} />
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href='https://www.instagram.com/true.dating' aria-label="Instagram Link">
                      <Instagram color='primary' />
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href='https://twitter.com/truedating1' aria-label="Twitter Link">
                      <Twitter color='primary' />
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={5}
                lg={2}
                container
                direction='column'
                alignItems={{xs: 'center', sm: 'flex-start'}}
              >
                <Box pb={4} pt={{xs: 8, sm: 0}}>
                  <Typography variant='h5'>Quick Links</Typography>
                </Box>
                <Grid item container justifyContent={'space-between'}>
                  <Grid
                    item
                    container
                    xs
                    spacing={1}
                    alignItems={{xs: 'center', sm: 'flex-start'}}
                    direction='column'
                  >
                    <Grid item>
                      <Link underline="none" href={routes.home}>Home</Link>
                    </Grid>
                    <Grid item>
                      <Link underline="none" href={routes.about}>About Us</Link>
                    </Grid>
                    <Grid item>
                      <Link underline="none" href={routes.faq}>FAQ</Link>
                    </Grid>
                    <Grid item>
                      <Link underline="none" href={routes.events}>Events</Link>
                    </Grid>
                    <Grid item>
                      <Link underline="none" href={routes.blog}>Blog</Link>
                    </Grid>
                    <Grid item>
                      <Link underline="none" href={routes.contact}>Contact</Link>
                    </Grid>
                    <Grid item>
                      <Link underline="none" href={routes.login}>Login</Link>
                    </Grid>
                    <Grid item>
                      <Link underline="none" href={routes.membership}>Membership</Link>
                    </Grid>
                    <Grid item>
                      <Link underline="none" href={routes.tos}>Terms & Conditions</Link>
                    </Grid>
                    <Grid item>
                      <Link underline="none" href={routes.privacyPolicy}>Privacy Policy</Link>
                    </Grid>
                    <Grid item>
                      <Link underline="none" href={'/sitemap'}>Sitemap</Link>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={2}
                container
                direction='column'
              >
                <Box
                  pb={4}
                  pt={{xs: 8, sm: 0}}
                  textAlign={{'xs': 'center', 'sm': 'unset'}}
                >
                  <Typography variant='h5'>Services</Typography>
                </Box>
                <Grid
                  item
                  container
                  direction='column'
                  alignItems={{xs: 'center', sm: 'flex-start'}}
                  spacing={1}
                >
                  <Grid item>
                    <Link underline="none" href={routes.events}>Dating Events</Link>
                  </Grid>
                  <Grid item>
                    <Link underline="none" href={routes.matureDating}>Mature Dating</Link>
                  </Grid>
                  <Grid item>
                    <Link underline="none" href={routes.christianDating}>Christian Dating</Link>
                  </Grid>
                  <Grid item>
                    <Link underline="none" href={routes.gayDating}>Gay Dating</Link>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={2}
                container
                direction='column'
              >
                <Box
                  pb={4}
                  pt={{xs: 8, sm: 0}}
                  textAlign={{'xs': 'center', 'sm': 'unset'}}
                >
                  <Typography variant='h5'>Event Locations</Typography>
                </Box>
                <Grid
                  item
                  container
                  direction='column'
                  alignItems={{xs: 'center', sm: 'flex-start'}}
                  spacing={1}
                >
                  <Grid item>
                    <Link underline="none" href={routes.brixton}>Brixton</Link>
                  </Grid>
                  <Grid item>
                    <Link underline="none" href={routes.chelsea}>Chelsea</Link>
                  </Grid>
                  <Grid item>
                    <Link underline="none" href={routes.farringdon}>Farringdon</Link>
                  </Grid>
                  <Grid item>
                    <Link underline="none" href={routes.clapham}>Clapham</Link>
                  </Grid>
                  <Grid item>
                    <Link underline="none" href={routes.hammersmith}>Hammersmith</Link>
                  </Grid>
                  <Grid item>
                    <Link underline="none" href={routes.londonBridge}>London Bridge</Link>
                  </Grid>
                  <Grid item>
                    <Link underline="none" href={routes.shoreditch}>Shoreditch</Link>
                  </Grid>
                  <Grid item>
                    <Link underline="none" href={routes.soho}>Soho</Link>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </section>


      <section className='true-footer'>
        <Box py={6}>
          <Container>
            <Grid container spacing={isSmall ? 0 : 4}>
              <Grid
                item
                sm={6}
                md={4}
                lg={12}
                container
                direction='column'
                justifyContent='space-between'
                alignItems={'center'}
                spacing={isSmall ? 2 : 0}
              >
                <Grid item>
                  <Box mt={isSmall ? 8 : 0} />
                </Grid>
                <Grid item>
                  <Image src={poweredByStripe} alt='' />
                </Grid>
                <Grid item>
                  <Image src={creditCards} alt='Payment | True Dating' />
                </Grid>
                <Grid item>
                  <Box py={6}>
                    <Typography variant='caption'>
                      © All Rights Reserved - True Dating<sup style={{ fontSize: 8 }}>TM</sup> 2023
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </section>
    </footer>
  )
}
