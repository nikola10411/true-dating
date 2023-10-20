import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js/pure";
import {
  Box,
  Breadcrumbs,
  IconButton,
  Button,
  Container,
  Divider,
  Grid,
  Link,
  MenuItem,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/system";
import Head from "next/head";

import { Favorite, People, Chat } from "@mui/icons-material";

import firebaseApp from "../../src/configs/firebase";
import { getDocs, query, collection, where, getFirestore } from "firebase/firestore/lite";
import { getVoteDoc } from "../../src/services/voting";
import { useAuth } from "../../src/contexts/AuthProvider";

import PageSpinner from "../../src/components/PageSpinner";

import { routes } from "../../src/routes";

import BuyTicketDialog from "../../src/components/BuyTicketDialog/BuyTicketDialog";
import { getTitleAndDateForEvent, getDateTime, getFormattedDate, getFullDate } from "../../src/utils/date";

import { IMG_PLACEHOLDER, POUND_SYMBOL } from "../../src/constants";
import { COLORS } from "../../src/theme";
import { ArrowRightAlt } from "@mui/icons-material";

import maleSVG from "../../public/images/male.svg";
import femaleSVG from "../../public/images/female.svg";
import Image from "next/image";
import DraftEditor from "../../src/components/DraftEditor";
import { getDescription } from "../../src/utils/description";
import { getRemainingTicketsText } from "../../src/utils/eventCard";
import { getUserByEmail } from "../../src/services/user";

let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK);
  }
  return stripePromise;
};

export default function EventDetails() {
  const router = useRouter();

  const slug = router.query.slug;

  const { user } = useAuth();
  const [event, setEvent] = useState({});
  const [syncing, setSyncing] = useState(true);
  const [votesSyncing, setVotesSyncing] = useState(true);
  const [open, setOpen] = useState(false);
  const [nrOfTickets, setNrOfTickets] = useState(1);
  const [alreadyVoted, setAlreadyVoted] = useState(false);
  const [votes, setVotes] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const fetchEvent = async () => {
    let isMounted = true;

    if (!slug) {
      return router.replace(routes.events);
    }

    const { date, title } = getTitleAndDateForEvent(slug);
    const firestore = getFirestore(firebaseApp)
    
    const q = query(
      collection(firestore, "events"),
      where("lowercaseTitle", "==", title)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length == 0) {
      console.error("Event does not exist!");
      router.replace(routes.events);
    }

    querySnapshot.docs.forEach((doc) => {
      const eventData = doc.data();
      const formattedDate = getFullDate(eventData.dateTime.toDate());
      if (date == formattedDate) {
        if (isMounted) {
          setEvent({
            ...eventData,
            dateTime: getDateTime(eventData.dateTime),
            id: doc.id,
          });
          setSyncing(false);
        }
      }
    });
  };

  useEffect(() => {
    fetchEvent();
  }, [slug]);

  const imageUrlForCard = useMemo(() => {
    if (isMobile && event.imgMobileUrl) {
      return event.imgMobileUrl;
    }

    if (event.imgURL) {
      return event.imgURL;
    }

    return IMG_PLACEHOLDER;
  }, [isMobile, event]);

  const nrOfAvailableTickets = useMemo(() => {
    const { menAvailableTickets = 0, womenAvailableTickets = 0 } = event;
    const totalNrOfTickets =
      Number(menAvailableTickets) + Number(womenAvailableTickets);
    if (user) {
      if (user.gender === "M") {
        return Math.min(Number(menAvailableTickets), 5);
      } else {
        return Math.min(Number(womenAvailableTickets), 5);
      }
    }

    // fallback
    if (totalNrOfTickets > 5) {
      return 5;
    }

    return totalNrOfTickets;
  }, [event, user]);

  const isVoteEnded = useMemo(() => {
    if (event.votingPeriodEnded) return true;
    if (alreadyVoted) return true;
    return false;
  }, [alreadyVoted, event]);

  const fetchVoting = async () => {
    setVotesSyncing(true);
    const voteDocs = await getVoteDoc(event.id, user.email);
    const voteData = [];
    if (voteDocs.length) {
      setAlreadyVoted(true);
      for (const voteDoc of voteDocs) {
        const votes = voteDoc.data().votes;
        for (const vote of votes) {
          if (vote.value == 1 || vote.value == 2) {
            const targetVoteDocs = await getVoteDoc(event.id, vote.user);
            for (const targetVoteDoc of targetVoteDocs) {
              const relVotes = targetVoteDoc.data().votes;
              const relToUser = relVotes.find(
                (vote) =>
                  vote.user === user.email &&
                  (vote.value === 1 || vote.value === 2)
              );

              if (relToUser) {
                const matchUser = await getUserByEmail(vote.user);
                voteData.push({
                  value: vote.value,
                  user: matchUser,
                });
                break;
              }
            }
          }
        }
      }
      setVotes(voteData);
    }
    setVotesSyncing(false);
  };

  useEffect(() => {
    if (event.id && user && user.email) {
      fetchVoting();
    }
  }, [event, user]);

  return syncing ? (
    <Box className={"emptyEventBody"}>
      <PageSpinner />
    </Box>
  ) : (
    <Elements stripe={getStripe()}>
      <Head>
        <title>{event.title} | True Dating</title>
      </Head>
      <Grid>
        <Container>
          <Breadcrumbs
            aria-label="breadcrumb"
            sx={{
              backgroundColor: COLORS.lightGrey,
              color: COLORS.shark,
              paddingTop: "12px",
              marginBottom: "-24px",
              "& a": {
                color: "grey",
              },
            }}
          >
            <Link underline="hover" color="inherit" href={routes.home}>
              Home
            </Link>
            <Link underline="hover" color="inherit" href={routes.events}>
              Events
            </Link>
            <Typography color="text.primary">{event.title}</Typography>
          </Breadcrumbs>
        </Container>
        <Box
          sx={(theme) => ({
            padding: theme.spacing(6, 0),
            backgroundColor: COLORS.lightGrey,
            minHeight: "100vh",
          })}
        >
          <Container>
            <Grid container spacing={4}>
              <Grid
                item
                xs={12}
                md={7}
                sx={{
                  position: "relative",
                  "& #event-img": {
                    position: "sticky",
                    top: "75px",
                  },
                }}
              >
                <Box
                  id="event-img"
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    maxHeight: 500,
                    minHeight: 400,
                    borderRadius: theme.shape.borderRadius,
                    boxShadow: theme.shadows[2],
                    [theme.breakpoints.down("xs")]: {
                      minHeight: 220,
                    },
                    [theme.breakpoints.down("sm")]: {
                      minHeight: 240,
                    },
                  }}
                >
                  <Image
                    style={{
                      borderRadius: theme.shape.borderRadius,
                      boxShadow: theme.shadows[2],
                      objectFit: "cover",
                      height: "100%",
                      width: "100%",
                    }}
                    fill
                    alt={"Venue Image"}
                    sizes="(max-width: 900px) 100vw, 50vw"
                    src={imageUrlForCard}
                    priority
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={5}>
                {event.showBanner && event.banner && (
                  <Box display="flex" justifyContent="flex-end">
                    <Box
                      sx={{
                        backgroundColor: COLORS.radicalRed,
                        borderTopLeftRadius: theme.shape.borderRadius,
                        borderTopRightRadius: theme.shape.borderRadius,
                        borderBottomLeftRadius: theme.shape.borderRadius,
                        padding: theme.spacing(1),
                        marginBottom: theme.spacing(1),
                        maxWidth: "20rem",
                        position: "relative",
                      }}
                    >
                      <Typography color={"white"}>{event.banner}</Typography>
                    </Box>
                  </Box>
                )}
                <Typography variant="h5" component="div">
                  <Box fontWeight="fontWeightBold">{event.title}</Box>
                </Typography>
                {!isVoteEnded ? (
                  <>
                    <Typography variant="h6" component="div">
                      <Box fontWeight="fontWeightMedium">{event.venue}</Box>
                    </Typography>
                    <Grid container alignItems="center" spacing={2}>
                      <Grid item>
                        <Button
                          disabled={
                            !nrOfAvailableTickets ||
                            event.archived ||
                            new Date(event.dateTime) < Date.now()
                          }
                          fullWidth
                          variant="contained"
                          color="primary"
                          endIcon={<ArrowRightAlt />}
                          onClick={(_) => {
                            if (!nrOfAvailableTickets) {
                              return;
                            }
                            return user
                              ? setOpen(true)
                              : router.push(
                                  {
                                    pathname: routes.login,
                                    query: { data: window.location.pathname },
                                  },
                                  routes.login
                                );
                          }}
                        >
                          {`Buy Ticket${nrOfTickets > 1 ? "s" : ""}`}
                        </Button>
                      </Grid>
                      <Grid item>
                        <TextField
                          disabled={
                            !nrOfAvailableTickets ||
                            new Date(event.dateTime) < Date.now()
                          }
                          select
                          value={nrOfAvailableTickets ? nrOfTickets : ""}
                          variant="outlined"
                          size="small"
                          onChange={({ target: { value } }) =>
                            setNrOfTickets(value)
                          }
                        >
                          {Array.from(Array(nrOfAvailableTickets).keys()).map(
                            (_, i) => (
                              <MenuItem key={`ticket_${i + 1}`} value={i + 1}>
                                {i + 1}
                              </MenuItem>
                            )
                          )}
                        </TextField>
                      </Grid>
                    </Grid>
                    <Box py={4} maxWidth={400}>
                      <Grid container>
                        <Grid
                          item
                          container
                          xs={6}
                          alignItems="center"
                          wrap="nowrap"
                        >
                          <Box maxWidth={24}>
                            <Image
                              src={maleSVG}
                              alt="Male Icon"
                              style={{ width: "100%" }}
                            />
                          </Box>
                          <Typography variant="body2" component="div">
                            <Box ml={2} fontWeight="fontWeightBold">
                              {getRemainingTicketsText(
                                event.menAvailableTickets
                              )}
                            </Box>
                          </Typography>
                        </Grid>
                        <Grid>
                          <Divider />
                        </Grid>
                        <Grid
                          item
                          container
                          xs={6}
                          alignItems="center"
                          wrap="nowrap"
                        >
                          <Box maxWidth={26}>
                            <Image
                              src={femaleSVG}
                              alt="Female Icon"
                              style={{ width: "100%" }}
                            />
                          </Box>
                          <Typography variant="body2" component="div">
                            <Box ml={2} fontWeight="fontWeightBold">
                              {getRemainingTicketsText(
                                event.womenAvailableTickets
                              )}
                            </Box>
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                    <Grid container alignItems="center">
                      <Grid item xs={8} md={6}>
                        <Box width={120}>
                          <strong>Age Range</strong>
                        </Box>
                        <Box>
                          {event.ageRangeFrom} - {event.ageRangeTo}
                        </Box>
                      </Grid>
                      <Grid item xs={4} md={6}>
                        <Box width={120}>
                          <strong>Price</strong>
                        </Box>
                        <Box>
                          {event.ticketPriceWithoutDiscount && (
                            <>
                              <Typography
                                sx={{
                                  color: "primary.main",
                                  textDecoration: "line-through",
                                  textDecorationThickness: "1px",
                                  marginRight: "4px",
                                }}
                              >
                                {POUND_SYMBOL}
                                {event.ticketPriceWithoutDiscount}
                              </Typography>
                            </>
                          )}
                          {POUND_SYMBOL}
                          {event.ticketPrice}
                        </Box>
                      </Grid>
                      <Box py={2} width="100%">
                        <Divider />
                      </Box>
                    </Grid>
                    <Grid container>
                      <Grid item xs={8} md={6}>
                        <Box width={50}>
                          <strong>Date</strong>
                        </Box>
                        <Box>
                          {event.dateTime
                            ? getFormattedDate(event.dateTime)
                            : "-"}
                        </Box>
                      </Grid>
                      <Grid item xs={4} md={6}>
                        <Box width={120}>
                          <strong>Time</strong>
                        </Box>
                        <Box>
                          {event.dateTime
                            ? new Date(event.dateTime).toLocaleTimeString(
                                "en-GB",
                                {
                                  timeStyle: "short",
                                  hour12: true,
                                }
                              )
                            : "-"}
                        </Box>
                      </Grid>
                      <Box py={2} width="100%">
                        <Divider />
                      </Box>
                    </Grid>
                    <Grid>
                      <Box width={120}>
                        <strong>Venue</strong>
                      </Box>
                      <Box color={COLORS.radicalRed}>{event.venue}</Box>
                      <Box py={2} width="100%">
                        <Divider />
                      </Box>
                    </Grid>
                    {event.venueAddress && (
                      <Grid>
                        <Box width={120}>
                          <strong>Venue Address</strong>
                        </Box>
                        <Box
                          sx={(theme) => ({
                            width: "calc(100% - 120px)",
                            [theme.breakpoints.down("sm")]: {
                              width: "auto",
                            },
                          })}
                        >
                          {event.venueAddress}
                        </Box>
                        <Box py={2} width="100%">
                          <Divider />
                        </Box>
                      </Grid>
                    )}
                    {event.venueDescription && (
                      <Grid>
                        <Box width={120}>
                          <strong>Venue Details</strong>
                        </Box>
                        <Box
                          sx={(theme) => ({
                            width: "calc(100% - 120px)",
                            [theme.breakpoints.down("sm")]: {
                              width: "auto",
                            },
                          })}
                        >
                          <DraftEditor
                            readOnly
                            toolbarHidden
                            description={getDescription(event.venueDescription)}
                          />
                        </Box>
                        <Box py={2} width="100%">
                          <Divider />
                        </Box>
                      </Grid>
                    )}
                    <Box pb={2}>
                      <DraftEditor
                        readOnly
                        toolbarHidden
                        description={getDescription(event.description)}
                      />
                    </Box>
                  </>
                ) : (
                  <>
                    {!votesSyncing && votes.length == 0 && (
                      <Typography variant="h7" component="div">
                        <Box
                          py={2}
                          style={{ color: "#DD0713", fontWeight: 500 }}
                        >
                          Unfortunately you do not have any matches from this
                          event.
                        </Box>
                      </Typography>
                    )}
                    {!votesSyncing &&
                      votes.map((vote) => (
                        <Box
                          mb={5}
                          display="flex"
                          alignItems="center"
                          key={vote.user.uid}
                          sx={(theme) => ({
                            backgroundColor: COLORS.lightGrey,
                            border: `1px solid ${theme.palette.divider}`,
                            borderRadius: theme.shape.borderRadius,
                            marginBottom: theme.spacing(2),
                            padding: theme.spacing(2),
                          })}
                        >
                          <Box
                            sx={(theme) => ({
                              minWidth: 80,
                              width: 80,
                              height: 80,
                              borderRadius: 50,
                              boxShadow: theme.shadows[2],
                              marginRight: theme.spacing(2),
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              backgroundRepeat: "no-repeat",
                              backgroundImage: `url(${
                                vote.user.photoURL ||
                                (vote.user.gender === "M"
                                  ? "https://media.istockphoto.com/vectors/default-placeholder-man-vector-id844000458?"
                                  : "https://st3.depositphotos.com/9998432/13335/v/600/depositphotos_133351974-stock-illustration-default-placeholder-woman.jpg")
                              })`,
                            })}
                          />
                          <Typography
                            variant="h6"
                            sx={{
                              width: "100%",
                              maxWidth: 200,
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {vote.user.firstName}
                          </Typography>
                          <Box>
                            {vote.value === 1 ? (
                              <Favorite color="primary" />
                            ) : (
                              <People style={{ fill: COLORS.green }} />
                            )}
                          </Box>
                          <Box ml="auto">
                            <IconButton
                              onClick={() =>
                                router.push(
                                  {
                                    pathname: routes.messages,
                                    query: { data: JSON.stringify(vote.user) },
                                  },
                                  routes.messages
                                )
                              }
                            >
                              <Chat color="primary" />
                            </IconButton>
                          </Box>
                        </Box>
                      ))}
                  </>
                )}
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Box>
          <Container>
            <Box textAlign="center" py={10}>
              <Typography variant="h4">How It Works</Typography>
            </Box>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6} md={4}>
                <Box
                  sx={(theme) => ({
                    width: "100%",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    height: "100%",
                    borderRadius: theme.shape.borderRadius,
                    boxShadow: theme.shadows[2],
                    [theme.breakpoints.down("xs")]: {
                      minHeight: 220,
                    },
                    maxHeight: 300,
                    minHeight: 250,
                    backgroundImage: `url(${
                      event.howItWorks?.col1?.imgURL || IMG_PLACEHOLDER
                    })`,
                  })}
                  alt="How it Works"
                />
                <Box pb={4}>
                  <DraftEditor
                    readOnly
                    toolbarHidden
                    description={getDescription(
                      event.howItWorks?.col1?.description
                    )}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Box
                  sx={(theme) => ({
                    width: "100%",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    height: "100%",
                    borderRadius: theme.shape.borderRadius,
                    boxShadow: theme.shadows[2],
                    [theme.breakpoints.down("xs")]: {
                      minHeight: 220,
                    },
                    maxHeight: 300,
                    minHeight: 250,
                    backgroundImage: `url(${
                      event.howItWorks?.col2?.imgURL || IMG_PLACEHOLDER
                    })`,
                  })}
                  alt="How it Works"
                />
                <Box pb={4}>
                  <DraftEditor
                    readOnly
                    toolbarHidden
                    description={getDescription(
                      event.howItWorks?.col2?.description
                    )}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box
                  sx={(theme) => ({
                    width: "100%",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    height: "100%",
                    borderRadius: theme.shape.borderRadius,
                    boxShadow: theme.shadows[2],
                    [theme.breakpoints.down("xs")]: {
                      minHeight: 220,
                    },
                    maxHeight: 300,
                    minHeight: 250,
                    backgroundImage: `url(${
                      event.howItWorks?.col3?.imgURL || IMG_PLACEHOLDER
                    })`,
                  })}
                  alt="How it Works"
                />
                <Box pb={4}>
                  <DraftEditor
                    readOnly
                    toolbarHidden
                    description={getDescription(
                      event.howItWorks?.col3?.description
                    )}
                  />
                </Box>
              </Grid>
              <Grid item container justifyContent="center" xs={12}>
                <Box py={4} maxWidth={800}>
                  <DraftEditor
                    readOnly
                    toolbarHidden
                    description={getDescription(event.howItWorks?.finalNotes)}
                  />
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
        {open && !event.designMyNightId && (
          <BuyTicketDialog
            open={true}
            onClose={() => setOpen(false)}
            nrOfTickets={nrOfTickets}
            event={event}
          />
        )}
      </Grid>
    </Elements>
  );
}
