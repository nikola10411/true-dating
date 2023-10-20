import React, { useEffect, useMemo } from 'react';
import { Box, Button, Container, Typography } from "@mui/material";

import { useAuth } from '../src/contexts/AuthProvider';

import PageSpinner from "../src/components/PageSpinner";

import MyEventCard from '../src/components/MyEventCard.js';
import { useRouter } from "next/router";
import { useUsers } from '../src/contexts/UsersProvider';
import { COLORS } from '../src/theme';
import { routes } from '../src/routes';
import { getAllEvents } from '../src/services/event';

export default function PersonalMatchmaking({ events }) {
  
  const router = useRouter();
  const { user } = useAuth();
  const { users, usersLoaded, loading: loadingUsers, loadUsers } = useUsers();
  useEffect(() => {
    if (!usersLoaded && !loadingUsers) {
      loadUsers();
    }
  }, [loadUsers, loadingUsers, usersLoaded]);

  const myEvents = useMemo(
    () => events.filter((e) => e.participants.find((p) => p.email === user.email)),
    [events, user.email]
  );

  return loadingUsers ? (
    <PageSpinner />
  ) : (
    <Box py={8}>
      <Container>
        <Box textAlign='center' pb={8}>
          <Typography variant='h4'>
            <strong>Find Your</strong> Perfect Match
          </Typography>
        </Box>
        {myEvents.length ? (
          myEvents.map((e, i) => <MyEventCard event={e} users={users} key={`myEvent_${i}`} />)
        ) : (
          <Box textAlign='center'>
            <Typography variant='h6'>
              <strong style={{ color: COLORS.radicalRed }}>Sorry!</strong>
              <br />
              It looks like you haven’t purchased a ticket to an event yet.
              <br />
              Once you have signed up to an event you will be able to enter your matches here.
            </Typography>
            <Box py={4}>
              <Button
                variant='contained'
                color='primary'
                onClick={() => router.push(routes.events)}
              >
                Buy your first ticket
              </Button>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
}


export const getServerSideProps = async ({ req, res }) => {
  // res.setHeader(
  //   'Cache-Control',
  //   'public, s-maxage=10, stale-while-revalidate=10'
  // )
  
  let events = await getAllEvents();
  
  events = events.map((event) => ({
    ...event,
    dateTime: event.dateTime.toString(),
    createdAt: event.createdAt.toString(),
  }))

  return {
    props: {
      events
    }
  }
}