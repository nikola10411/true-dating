import { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { getUserMatches, unmatch } from '../src/services/match';
import { useAuth } from '../src/contexts/AuthProvider';
import { getUsersByEmail } from '../src/services/user';
import PageSpinner from "../src/components/PageSpinner";
import { COLORS } from "../src/theme";
import { routes } from "../src/routes";

import { Send, DeleteForever, Favorite, People } from '@mui/icons-material';

export default function Matches() {
  const router = useRouter();

  const { user } = useAuth();
  const [matches, setMatches] = useState([]);
  const [userDocs, setUserDocs] = useState([]);
  const [loadingMatches, setLoadingMatches] = useState(true);

  useEffect(() => {
    const loadMatches = async () => {
      const matchDocs = await getUserMatches(user.email);
      console.log('maches ', matchDocs);
      if (!matchDocs.length) {
        return;
      }
      setMatches(matchDocs);
      const currentUserEmail = user.email;
      const usersFromMatches = matchDocs
        .map(({ users }) => users)
        .flat()
        .filter((u) => u !== currentUserEmail);

      const matchedUsers = await getUsersByEmail(usersFromMatches);

      if (matchedUsers.length) {
        const users = matchedUsers.map((userDoc) => ({ id: userDoc.id, ...userDoc.data() }));
        setUserDocs(users);
      }
    };
    loadMatches()
      .then(() => setLoadingMatches(false))
      .catch((error) => {
        console.error(error);
        setLoadingMatches(false);
      });
  }, [user.email]);

  const mappedMatches = useMemo(() => {
    return matches?.length
      ? matches.map(({ matchType, users, id, seenBy }) => {
          const user = userDocs.find((u) => users.includes(u.email));
          return { ...user, matchType, matchId: id, seenBy };
        })
      : [];
  }, [matches, userDocs]);

  return loadingMatches ? (
    <PageSpinner />
  ) : (
    <Box py={6} bgcolor={COLORS.lightGrey} minHeight='inherit'>
      <Container>
        <Box textAlign='center' pb={8}>
          <Typography variant='h4'>
            <strong>Your</strong> Matches
          </Typography>
        </Box>
        {mappedMatches.length ? (
          <Grid container spacing={4}>
            {mappedMatches.map((m) => (
              <Grid item key={m.id} sx={(theme) => ({
                [theme.breakpoints.down('xs')]: {
                    width: '100%',
                },
              })}>
                <Card sx={(theme) => ({
                       '& .MuiCardContent-root': {
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      },
                })}>
                  <CardContent>
                    <Box>
                      <Tooltip title={`${m.matchType === 1 ? 'Romantical' : 'Friendship'} Match`}>
                        {m.matchType === 1 ? (
                          <Favorite color='primary' />
                        ) : (
                          <People style={{ fill: COLORS.green }} />
                        )}
                      </Tooltip>
                    </Box>
                    <Box
                      style={{
                        backgroundImage: `url(${
                          m.photoURL ||
                          (m.gender === 'M'
                            ? 'https://media.istockphoto.com/vectors/default-placeholder-man-vector-id844000458?'
                            : 'https://st3.depositphotos.com/9998432/13335/v/600/depositphotos_133351974-stock-illustration-default-placeholder-woman.jpg')
                        })`,
                      }}
                      sx={(theme) => ({
                        width: theme.spacing(20),
                        height: theme.spacing(20),
                        borderRadius: theme.spacing(10),
                        boxShadow: theme.shadows[2],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                      })}
                    />

                    <Typography variant='h6'>
                      <strong>{m.firstName}</strong>
                    </Typography>
                    <Box pt={2}>
                      <Button
                        fullWidth
                        variant='contained'
                        color='primary'
                        endIcon={<Send />}
                        onClick={() => router.push(routes.messages, m)}
                      >
                        Send a Message
                      </Button>
                      <Box py={1} />
                      <Button
                        fullWidth
                        variant='outlined'
                        color='primary'
                        endIcon={<DeleteForever />}
                        onClick={() => {
                          unmatch(m.matchId);
                          setMatches((matches) =>
                            matches.filter((match) => match.id !== m.matchId)
                          );
                        }}
                      >
                        Unmatch
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box textAlign='center'>
            <Typography variant='h6'>
              <strong style={{ color: COLORS.radicalRed }}>Oops!</strong>
              <br />
              It looks like you haven't attended an event yet.
              <br />
              To enter matches, please first purchase a ticket to an upcoming event.
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