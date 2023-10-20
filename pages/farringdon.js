import Head from "next/head";
import Image from "next/image";
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { routes } from "../src/routes";
import { ArrowRightAlt } from "@mui/icons-material";
import { COLORS } from "../src/theme";
import Reviews from "../src/components/Reviews";
import EventSearch from "../src/components/EventSearch";

import bestSpeedDatingClapham from "../public/images/best-speed-dating-clapham.jpg";
import singlesEventClampham from "../public/images/singles-events-clapham.jpg";

import speedDatingClapham from "../public/images/speed-dating-clapham.png";
import claphamSpeedDating from "../public/images/clapham-speed-dating.png";
import speedDatingEventsClapham from "../public/images/speed-dating-events-clapham.png";
import claphamSpeedDatingEvents from "../public/images/clapham-speed-dating-events.png";
import bestSpeedDatingClaphamPNG from "../public/images/best-speed-dating-clapham.png";
import homebanner from "../public/images/home_banner_optimized.jpg";
import {
  getEventsCardData,
  getLocations,
  getAges,
} from "../src/services/event";

export default function Farringdon({ events, locations, ages }) {
  return (
    <div id="home-page">
      <Head>
        <title>Speed Dating Farringdon | True Dating</title>
        <meta
          name="description"
          content="Connect with the right people with Speed Dating Farringdon! True Dating is your best help and guidance to find your love in a fun and relaxed environment."
        />
        <meta name="keywords" content="Speed Dating Farringdon" />
      </Head>
      <section id="home_banner">
        <Image src={homebanner} fill alt="Home Banner" priority />
        <Breadcrumbs
          sx={(theme) => ({
            color: "white",
            paddingTop: 12,
            paddingLeft: 38,
            position: "relative",
            zIndex: 1,
            "& a": {
              color: "#eee",
              textShadow: "0px 0.1px 2px grey",
            },
            [theme.breakpoints.down("sm")]: {
              paddingLeft: 26,
            },
          })}
          aria-label="breadcrumb"
        >
          <Link underline="hover" color="inherit" href={routes.home}>
            Home
          </Link>
          <Typography color="white">Farringdon</Typography>
        </Breadcrumbs>
        <div className="row">
          <div className="column">
            <div className="content ml-2">
              <h1>Speed Dating Farringdon</h1>
              <h2>
                Speed dating events have been popular for a while, but they seem
                to be making a comeback. In the past few years, speed dating has
                been popping up all over the US and UK. So if you want to take a
                break from swiping left or right on those dating apps, try speed
                dating!
              </h2>

              <Box pt={6}>
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<ArrowRightAlt />}
                  type="submit"
                  size="large"
                  onClick={() => history.push(routes.events)}
                >
                  Find out more
                </Button>
              </Box>
            </div>
          </div>
        </div>
      </section>
      <Box bgcolor={COLORS.lightGrey} py={3}>
        <Container>
          <Grid container spacing={4}>
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              sx={(theme) => ({
                "& img": {
                  maxWidth: "100%",
                  borderRadius: 15,
                  boxShadow: theme.shadows[2],
                  [theme.breakpoints.down("sm")]: {
                    display: "none",
                  },
                },
              })}
            >
              <Image
                src={bestSpeedDatingClapham}
                alt="Best Speed Dating Farringdon"
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              sx={(theme) => ({
                "& img": {
                  maxWidth: "100%",
                  borderRadius: 15,
                  boxShadow: theme.shadows[2],
                  display: "none",
                  [theme.breakpoints.down("sm")]: {
                    display: "block",
                    maxWidth: 500,
                    width: "100%",
                  },
                },
              })}
            >
              <h2>How to Find a Speed Dating Event Near You</h2>
              <br />
              <Image
                src={bestSpeedDatingClapham}
                alt="Best Speed Dating Farringdon"
              />
              <br />
              <p>
                Finding a speed dating event to attend is easy! Simply sign up
                with True Dating, and we handle the rest. We will send reminders
                to your email so you can be sure to attend. We provide the host
                and have staff on hand to assist all of our dating clients.
                <br />
                <br />
                For each speed-dating event, you will have a few minutes to
                “date” several people. This allows you to meet lots of new
                people without feeling pressured. We find that the few minutes
                you get with each person makes it a lot easier to strike up
                conversations.
                <br />
                <br />
                The next day, you simply log into your True Dating account to
                manage your dates. From there, you plug in who you liked and
                would want to go on a date with. We will then tally up all the
                results by 4 pm and show you who your matches are.
                <br />
                <br />
                You can then message each other and discuss going on an official
                date. At True Dating, we really do make it easy to find love in
                Farringdon and beyond.
              </p>
              <br />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box py={3}>
        <Container>
          <Grid container spacing={4}>
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              sx={(theme) => ({
                "& img": {
                  maxWidth: "100%",
                  borderRadius: 15,
                  boxShadow: theme.shadows[2],
                  display: "none",
                  [theme.breakpoints.down("sm")]: {
                    display: "block",
                    maxWidth: 500,
                    width: "100%",
                  },
                },
              })}
            >
              <h2>Tips for Successful Speed Dating</h2>
              <Image
                src={singlesEventClampham}
                alt="Singles Events Farringdon"
              />
              <br />
              <p>
                If you’re speed dating for the first time, here are a few tips
                and tricks to keep in mind:
                <br />
                <br />
                <strong>Be Yourself:</strong> This seems like a no-brainer, but
                it’s something that many people overlook. They try to play a
                role or be someone else in order to attract a partner. Remember
                that you want to connect with someone who is interested in you
                for who you are.
                <br />
                <br />
                <strong>Don’t Rush:</strong> The best thing about speed dating
                is that it allows you to get to know many prospects in one
                night. That doesn’t mean that you should rush through the
                process, though. Give yourself the time to truly get to know
                each person before moving on to the next one.
                <br />
                <br />
                <strong>Be Honest:</strong> It can be hard to figure out how
                much information about yourself to give away at first. The best
                thing you can do is be honest, but don’t overwhelm the other
                person with too much information. Give them just enough detail
                so that they are interested in finding out more about you.
                <br />
                <br />
                If you’re excited to be a part of the True Dating scene, sign up
                today and see what all the hype is about!
              </p>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              sx={(theme) => ({
                "& img": {
                  maxWidth: "100%",
                  borderRadius: 15,
                  boxShadow: theme.shadows[2],
                  [theme.breakpoints.down("sm")]: {
                    display: "none",
                  },
                },
              })}
            >
              <Image
                src={singlesEventClampham}
                alt="Singles Events Farringdon"
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Reviews bgColor={COLORS.lightGrey} limit={3} />

      <Box pb={1}>
        <EventSearch
          events={events}
          title="Upcoming Events"
          bgColor="#fff"
          locations={locations}
          ages={ages}
        />
      </Box>
      {events.length >= 8 && (
        <Box textAlign="center" py={4}>
          <Button
            variant="contained"
            color="primary"
            endIcon={<ArrowRightAlt />}
            type="submit"
            size="large"
            onClick={() => Router.push(routes.events)}
          >
            See More Events
          </Button>
        </Box>
      )}

      <Box>
        <section id="partners">
          <Box pb={6}>
            <h2>
              We've Been<span> Featured On:</span>
            </h2>
          </Box>
          <div className="row">
            <div>
              <Image src={speedDatingClapham} alt="Speed Dating Farringdon" />
            </div>
            <div>
              <Image src={claphamSpeedDating} alt="Farringdon Speed Dating" />
            </div>
            <div>
              <Image
                src={speedDatingEventsClapham}
                alt="Speed Dating Events Farringdon"
              />
            </div>
            <div>
              <Image
                src={claphamSpeedDatingEvents}
                alt="Farringdon Speed Dating Events"
              />
            </div>
            <div>
              <Image
                src={bestSpeedDatingClaphamPNG}
                alt="Best Speed Dating Farringdon"
              />
            </div>
          </div>
        </section>
      </Box>
    </div>
  );
}

export const getServerSideProps = async ({ query, req, res }) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=59"
  );

  let events = await getEventsCardData(8, query);
  let locations = await getLocations();
  let ages = await getAges();

  events = events.map((event) => ({
    ...event,
    dateTime: event.dateTime.toString(),
    createdAt: event.createdAt.toString(),
  }));

  return {
    props: {
      events,
      locations,
      ages,
    },
  };
};
