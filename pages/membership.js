import React, { useEffect } from 'react';
import { Box, Breadcrumbs, Button, Checkbox, Link, Typography } from '@mui/material';
import { Wc, Mail, OfflineBolt, Favorite, ArrowRightAlt } from '@mui/icons-material';
import Modal from 'react-modal';

import { POUND_SYMBOL, MEMBERSHIP_1_MONTH, MEMBERSHIP_3_MONTHS, MEMBERSHIP_6_MONTHS } from '../src/constants';
import BuyMembershipDialog from '../src/components/BuyMembershipDialog/BuyMembershipDialog';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js/pure';
import { useState } from 'react';
import { useAuth } from '../src/contexts/AuthProvider';
import { routes } from '../src/routes';
import { useRouter } from 'next/router';

let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK);
  }
  return stripePromise;
}

Modal.setAppElement('#modal-root');


export default function Membership() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [membershipType, setMembershipType] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      if (user.membershipType) {
        return router.replace(routes.account);
      }
    }
  }, [])

  const renderEmptyRow = (styleClass) => {
    return (
      <Box className={`content_row leftBorder ${styleClass ? styleClass : ''}`}>
      </Box>
    )
  }

  const renderCheckbox = (styleClass) => {
    return (
      <Box className={`content_row center leftBorder ${styleClass ? styleClass : ''}`}>
        <Checkbox
          disabled
          style={{
            color: "#dd0713",
            transform: "scale(1.1)",
          }}
          checked />
      </Box>
    )
  }

  const buttonClick = (membershipType) => {
    if (user) {
      setOpen(true)
      setMembershipType(membershipType)
    } else {
      router.push({
        pathname: routes.login,
        state: { redirectTo: window.location.pathname },
      });
    }
  }

  const renderBuyButton = (membershipType) => {
    return (
      <Box className={`content_row center white button noborder`}>
        <Button
          id='desktopButton'
          fullWidth
          variant='contained'
          color='primary'
          onClick={() => buttonClick(membershipType)}
          endIcon={<ArrowRightAlt class='endIcon' />}>
          Buy Now
        </Button>
        <Button
          id='mobileButton'
          fullWidth
          variant='contained'
          onClick={() => buttonClick(membershipType)}
          color='primary'>
          Buy
        </Button>
      </Box>
    )
  }

  const renderSaving = (savingText) => {
    return (
      <Typography class='savings_text'>{savingText}</Typography>
    )
  }

  return (
    <Elements stripe={getStripe()}>
      {open && 
        <Modal
          isOpen={open}
          className={'modalWrapper'}
          onRequestClose={() => setOpen(false)}>
             <BuyMembershipDialog
                open={open}
                membershipType={membershipType}
                onClose={() => setOpen(false)}/>
        </Modal>
      }
      <Box id='subscription_top_banner' py={15}>
        <Breadcrumbs id='breadcrumbs_membership' aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href={routes.home}>
            Home
          </Link>
          <Typography color={'white'}>Membership</Typography>
        </Breadcrumbs>
        <h1 class='membershiph1'>Become a member and commit to finding that special someone.</h1>
      </Box>
      <Box id='content_container'>
        <Box id='content_title'>
          <h2 class='membershiph2'>Membership Information</h2>
        </Box>
        <Box id='content_subtitle'>
          <h4 class='membershiph4'>If you’re looking to attend multiple events and want to save money, why not become a True Dating Member? </h4> <h4 class='membershiph4'>Packages are purchased for a fixed term and don’t automatically renew (no need to remember to cancel).</h4>
        </Box>
        <Box id='content_price_container'>
          <Box id='info_container'>
            <Box class='content_row'>
              <Typography class='info_container_text'>
                *Savings based on attending all events in a calendar month
              </Typography>
            </Box>
            <Box class='content_row'>
              <Wc className='subscription_icons' />
              <Typography class='info_container_text'>
                Free & unlimited entry to any events
                <Typography class='info_container_sub_text'>
                  All events included.
                </Typography>
              </Typography>
            </Box>
            <Box class='content_row'>
              <Mail className='subscription_icons' />
              <Typography class='info_container_text'>
                Concierge booking service
                <Typography class='info_container_sub_text'>
                  No need to book on our site, email us directly.
                </Typography>
              </Typography>
            </Box>
            <Box class='content_row'>
              <OfflineBolt className='subscription_icons' />
              <Typography class='info_container_text'>
                Priority entry to events
                <Typography class='info_container_sub_text'>
                  Entry to any event, even if it’s sold out on website.
                </Typography>
              </Typography>
            </Box>
            <Box class='content_row noborder'>
              <Favorite className='subscription_icons' />
              <Typography class='info_container_text'>
                Personal matchmaking with other members
                <Typography class='info_container_sub_text'>
                  Subject to member compatibility.
                </Typography>
              </Typography>
            </Box>
          </Box>
          <Box class='months_container'>
            <Box className='content_row center white leftBorder'>
              <Typography class='months_container_title'>
                1 Month
                <Typography class='price_text'>{POUND_SYMBOL}50{renderSaving("(You save £134)")}</Typography>
              </Typography>
            </Box>
            {renderCheckbox()}
            {renderCheckbox()}
            {renderEmptyRow()}
            {renderEmptyRow('noborder')}
            {renderBuyButton(MEMBERSHIP_1_MONTH)}
          </Box>
          <Box class='months_container'>
            <Box className='content_row center white leftBorder'>
              <Typography class='months_container_title'>
                3 Months
                <Typography class='price_text'>{POUND_SYMBOL}100{renderSaving("(You save £302)")}</Typography>
              </Typography>
            </Box>
            {renderCheckbox()}
            {renderCheckbox()}
            {renderCheckbox()}
            {renderEmptyRow('noborder')}
            {renderBuyButton(MEMBERSHIP_3_MONTHS)}
          </Box>
          <Box class='months_container'>
            <Box className='content_row center white leftBorder'>
              <Typography class='months_container_title'>
                6 Months
                <Typography class='price_text'>{POUND_SYMBOL}150{renderSaving("(You save £654)")}</Typography>
              </Typography>
            </Box>
            {renderCheckbox()}
            {renderCheckbox()}
            {renderCheckbox()}
            {renderCheckbox('noborder')}
            {renderBuyButton(MEMBERSHIP_6_MONTHS)}
          </Box>
        </Box>
      </Box>
    </Elements>
  );
}