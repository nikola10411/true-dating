import React, { useEffect, useMemo, useState } from 'react';

import {
  Box,
  Button,
  CircularProgress,
  Grid,
  RadioGroup,
  Radio,
  Tooltip,
  Typography,
  Alert,
  useMediaQuery,
  Link
} from "@mui/material";

import { useTheme } from '@mui/system';

import { Info, FavoriteBorder, Favorite, PeopleOutline, People, HighlightOff, Cancel, Timelapse, SentimentVerySatisfied, CancelPresentation, CheckCircle} from '@mui/icons-material';

import { getVoteDoc, submitVotes } from '../services/voting'
import { getEvent } from '../services/event';
import { getEventUrlFromTitleDate } from '../utils/date';
import { routes } from '../routes';
import { useAuth } from '../contexts/AuthProvider';
import { COLORS } from '../theme';

const hoursAfterEvent = 4 * 1000 * 60 * 60; // 4 hours after


const LOVE = 1;
const FRIEND = 2;
const NOT_MY_TYPE = 3;

export default React.memo(function MyEventCard({ event, users }) {
  const { user } = useAuth();
  const [votes, setVotes] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [checkingVote, setCheckingVote] = useState(false);
  const [alreadyVoted, setAlreadyVoted] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const eventPath = `${routes.events}/${getEventUrlFromTitleDate(event.title, event.dateTime)}`;
  const now = new Date().getTime();
  const timeOfEvent = new Date(event.dateTime).getTime();
  const timeDifference = now - timeOfEvent;

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const canVote =
    event.participants?.find((p) => p.email === user.email)?.attended &&
    !checkingVote &&
    !alreadyVoted &&
    timeDifference > hoursAfterEvent &&
    !event.votingPeriodEnded;

  const tooltipInfo = useMemo(() => {
    switch (true) {
      case timeDifference <= 0: {
        return {
          icon: (
            <Timelapse
              fontSize='large'
              style={{
                marginLeft: 16,
                fill: '#579eb5',
              }}
            />
          ),
          text: 'Coming soon',
        };
      }

      case timeDifference > 0 && event.votingPeriodEnded:
        return {
          icon: (
            <Info
              fontSize='large'
              color='disabled'
              style={{
                marginLeft: 16,
              }}
            />
          ),
          text: 'Matches are now live. Click on event to see who you matched with.',
        };

      case alreadyVoted: {
        return {
          icon: (
            <CheckCircle
              fontSize='large'
              style={{
                marginLeft: 16,
                fill: COLORS.green,
              }}
            />
          ),
          text: 'Please now wait until all attendees have submitted their matches. When the matching period closes check your *My Matches* page to see who you have matched with.',
        };
      }

      default: {
        return {
          icon: (
            <SentimentVerySatisfied
              fontSize='large'
              style={{
                marginLeft: 16,
                fill: COLORS.green,
              }}
            />
          ),
          text: 'You can vote now',
        };
      }
    }
  }, [alreadyVoted, event.votingPeriodEnded, timeDifference]);

  const availableUsersForVoting = useMemo(
    () =>
      users.filter(
        (u) =>
          !!event.participants.find(
            (p) => p.attended && p.email !== user.email && p.email === u.email && (event.isSameGender ? p.gender === user.gender : p.gender !== user.gender)
          )
      ),
    [event, user, users]
  );


  useEffect(() => {
    let isMounted = true;
    setCheckingVote(true);
    getVoteDoc(event.id, user.email)
      .then((res) => {
        if (!isMounted) return;
        if (res && res.length > 0) {
          setAlreadyVoted(true);
        }
        setCheckingVote(false);
      })
      .catch((e) => {
        setCheckingVote(false);
      });

    return () => {
      isMounted = false;
    };
  }, [event.id, user.email]);

  const handleSelection = (user, value) => {
    setVotes((prevState) => [...prevState.filter((v) => v.user !== user), { user, value }]);
  };

  const handleVotingSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const votingPeriodEnded = (await getEvent(event.id))?.votingPeriodEnded;
      if (votingPeriodEnded) {
        throw Error('You cannot vote after the voting period ended');
      }
      await submitVotes({ eventId: event.id, user: user.email, votes, createdAt: new Date() });
      setAlreadyVoted(true);
    } catch (error) {
      setSubmitError(error.message);
    }
    setSubmitting(false);
  };

  return (
    <Box sx={(theme) => ({
      backgroundColor: COLORS.lightGrey,
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: theme.shape.borderRadius,
      marginBottom: theme.spacing(2),
      padding: theme.spacing(2),
    })}>
      <Grid container alignItems={'center'}>
        <Button
          onClick={() => { if (event.votingPeriodEnded) { history.push(eventPath) }}}
          style={{ backgroundImage: `url(${event.imgURL})` }}
          sx={(theme) => ({
            margin: theme.spacing(0, 4, 0, 0),
            minWidth: theme.spacing(30),
            height: theme.spacing(15),
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            boxShadow: theme.shadows[2],
            borderRadius: theme.shape.borderRadius,
            [theme.breakpoints.down('xs')]: {
              minWidth: '100%',
              height: '50vw',
              margin: theme.spacing(0, 0, 2, 0),
            },
            [theme.breakpoints.down('sm')]: {
              margin: 0,
              width: '100%',
            },
          })}
        />
        <Box sx={(theme) => ({
            display: 'flex',
            alignItems: 'center',
            [theme.breakpoints.down('xs')]: {
              alignItems: 'flex-start',
              '& .MuiSvgIcon-root': {
                marginTop: theme.spacing(0.5),
              },
            },
            [theme.breakpoints.down('sm')]: {
              marginTop: 2,
            },
        })}>
          <Typography style={{'min-width': '100px'}} variant='h6'>
            { event.votingPeriodEnded && 
             <Link href={eventPath}>{event.title}</Link>
            }
            
            { !event.votingPeriodEnded && 
             <Link>{event.title}</Link>
            }
          </Typography>
          <Typography variant='h6'></Typography>
          {!isMobile && !checkingVote && <Tooltip title={tooltipInfo.text}>{tooltipInfo.icon}</Tooltip>}
          {isMobile  && !checkingVote && <Typography style={{'align-self': 'center', 'margin-left': '20px'}}>{tooltipInfo.text}</Typography>}
        </Box>
        {checkingVote && <CircularProgress style={{ marginLeft: 'auto' }} />}
      </Grid>

      {canVote && (
        <form onSubmit={handleVotingSubmit}>
          {availableUsersForVoting.map((p, i) => (
            <Box key={p.email} pt={4} sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Box
                sx={(theme) => ({
                  minWidth: 80,
                  width: 80,
                  height: 80,
                  borderRadius: 50,
                  boxShadow: theme.shadows[2],
                  marginRight: theme.spacing(2),
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                })}
                style={{
                  backgroundImage: `url(${
                    p.photoURL ||
                    (p.gender === 'M'
                      ? 'https://media.istockphoto.com/vectors/default-placeholder-man-vector-id844000458?'
                      : 'https://st3.depositphotos.com/9998432/13335/v/600/depositphotos_133351974-stock-illustration-default-placeholder-woman.jpg')
                  })`,
                }}
              />
              <Typography variant='h6' sx={(theme) => ({
                width: '100%',
                maxWidth: 200,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              })}>
                {p.firstName}
              </Typography>

              <RadioGroup
                sx={(theme) => ({
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: 200,
                  flexDirection: 'row',
                  [theme.breakpoints.down('xs')]: {
                    width: 'auto',
                    flexDirection: 'column',
                    minHeight: 140,
                  },
                })}
                name={`${p.email}_voting`}
                value={''}
              >
                <Tooltip title='Love'>
                  <Radio
                    required
                    checked={!!votes.find(({ user, value }) => user === p.email && value === LOVE)}
                    onChange={() => handleSelection(p.email, LOVE)}
                    value={LOVE}
                    color='primary'
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                  />
                </Tooltip>
                <Tooltip title='Friend'>
                  <Radio
                    required
                    checked={
                      !!votes.find(({ user, value }) => user === p.email && value === FRIEND)
                    }
                    onChange={() => handleSelection(p.email, FRIEND)}
                    value={FRIEND}
                    icon={<PeopleOutline />}
                    checkedIcon={<People style={{ fill: COLORS.green }} />}
                  />
                </Tooltip>
                <Tooltip title='No'>
                  <Radio
                    required
                    checked={
                      !!votes.find(({ user, value }) => user === p.email && value === NOT_MY_TYPE)
                    }
                    onChange={() => handleSelection(p.email, NOT_MY_TYPE)}
                    value={NOT_MY_TYPE}
                    icon={<HighlightOff />}
                    checkedIcon={<CancelPresentation />}
                    color='secondary'
                  />
                </Tooltip>
              </RadioGroup>
            </Box>
          ))}
          <Grid container justifyContent='center'>
            <Box py={4} textAlign='center'>
              {submitError && (
                <Box py={2}>
                  <Alert severity='error'>{submitError}</Alert>
                </Box>
              )}
              <Button
                type='submit'
                color='primary'
                variant='contained'
                disabled={submitting}
                endIcon={submitting ? <CircularProgress size={24} color='primary' /> : undefined}
              >
                Submit Matches
              </Button>
              
            </Box>
          </Grid>
        </form>
      )}
    </Box>
  );
});
