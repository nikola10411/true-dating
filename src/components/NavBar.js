import { useState } from "react";
import { Box, Container, Grid, Link,  useMediaQuery } from "@mui/material"
import { useTheme, alpha } from '@mui/system';
import Hamburger from "hamburger-react";

import { FaFacebookF } from 'react-icons/fa';
import { Instagram, Twitter } from "@mui/icons-material";

import Logo from "./Logo";

import { menuConfig } from "../configs/menuConfig";
import { COLORS } from '../theme'


import dynamic from "next/dynamic";
const LoginButton = dynamic(() => import('./LoginButton'), {
  ssr: false,
});

export default function NavBar() {
  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Grid container sx={{
      position: 'sticky',
      top: 0,
      zIndex: 2,
      fontWeight: theme.typography.fontWeightBold,
      backgroundColor: alpha(theme.palette.common.white, 0.95),
      borderBottom: `1px solid ${theme.palette.divider}`,
    }}>
      <Container>
        <Box py={1.2}>
          <Grid container alignItems='center' wrap='nowrap' justifyContent='space-between'>
            <Box sx={{
              [theme.breakpoints.up('md')]: {
                display: 'none',
              },
              zIndex: 999,
            }}>
              <Hamburger size={24} toggle={setOpen} toggled={open} direction='right' label="hamburger menu" />
            </Box>
            <Box sx={{
              maxWidth: 170,
              '& a': {
                display: 'flex',
              },
              [theme.breakpoints.down('sm')]: {
                maxWidth: 150,
                position: 'relative',
                top: theme.spacing(0.3),
              },
            }}>
              <Logo />
            </Box>
            <Box sx={{
              '& a': {
                textDecoration: 'none',
                color: theme.palette.secondary.main,
                marginRight: theme.spacing(2),
                [theme.breakpoints.down('sm')]: {
                  margin: 0,
                  marginBottom: theme.spacing(2),
                },
                '&:hover': {
                  color: '#000',
                  scale: 1.04,
                },
              },
              [theme.breakpoints.down('md')]: {
                zIndex: 998,
                position: 'fixed',
                left: 0,
                right: 0,
                bottom: 0,
                top: 0,
                height: '100vh',
                overflowY: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: 'center',
                backgroundColor: alpha(theme.palette.common.white, 0.95),
                padding: theme.spacing(2),
                fontSize: theme.typography.h5.fontSize,
                opacity: open ? 1 : 0,
                transition: theme.transitions.create(['opacity']),
                pointerEvents: open ? 'all' : 'none',
              },
            }} display='flex' alignItems='center'>
              {
                menuConfig.map((item) => (
                  <Link onClick={() => { setOpen(false) }} href={item.path} key={item.path}>
                    {item.name}
                  </Link>
                ))
              }
              <Grid item>
                <Grid container alignItems='center' spacing={{ xs: 2, md: 0 }}>
                  <Grid item>
                    <Link href='https://www.facebook.com/londondateevents' aria-label="Facebook Truedating Link">
                      <FaFacebookF style={{ fill: COLORS.radicalRed }} size={20} />
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href='https://www.instagram.com/true.dating' aria-label="Instagram Truedaing Link">
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
              {
                !isMobile && (
                  <LoginButton />
                )
              }
            </Box>
            {
              isMobile && (
                <LoginButton />
              )
            }
          </Grid>
        </Box>
      </Container>
    </Grid>
  )
}