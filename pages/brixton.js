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

export default function Brixton({ events, locations, ages }) {
  return (
    <div id="home-page">
      <Head>
        <title>Speed Dating Brixton | True Dating</title>
        <meta
          name="description"
          content="Find someone that shares the same interests as you with Speed Dating Brixton. Find out more about how to find the love of your life in Brixton with True Dating."
        />
        <meta name="keywords" content="Speed Dating Brixton" />
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
          <Typography color="white">Brixton</Typography>
        </Breadcrumbs>
        <div className="row">
          <div className="column">
            <div className="content ml-2">
              <h1>Speed Dating Brixton</h1>
              <h2>
                Dating can be difficult. Between Tinder, Bumble, and Match.com,
                it can be hard to find someone compatible with your personality
                and lifestyle. Speed dating is the perfect solution for people
                who are looking for love or just want to meet some new friends.
                <br />
                <br />
                You’ll get about four minutes of intense matchmaking with each
                person you speed-date, which means you’ll meet several people in
                one night! Best of all, it’s easy to find speed dating events
                when you sign up with True Dating.
                <br />
                <br />
                So if you want to make some new friends or find the love of your
                life in Brixton, read on and learn why speed dating is the
                preferred choice for many singles.
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
                alt="Best Speed Dating Brixton"
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
              <h2>What Is Speed Dating?</h2>
              <br />
              <Image
                src={bestSpeedDatingClapham}
                alt="Best Speed Dating Brixton"
              />
              <br />
              <p>
                Speed dating is a popular dating technique that works. It’s a
                face-to-face event where participants, usually singles, attend
                to find a potential mate. What’s more, speed dating allows
                participants to meet and talk to lots of potential mates in a
                short period of time.
                <br />
                <br />
                Participants usually have the opportunity to speak with each
                person for a few minutes before moving on. This could be a
                perfect way to meet someone if you’re looking for friendship,
                romance, or even just single people to hang out with.
                <br />
                <br />
                Speed dating is a great way to meet people because it’s simple
                and quick. You don’t have to worry about coming off as too
                forward or not being able to find someone you like because
                you’ll leave knowing you had an opportunity to meet everyone in
                attendance.
                <br />
                <br />
                The whole event takes place over the course of around an hour or
                two, which is much less time than it would take to go on a
                series of bad first dates. After the speed-dating event, you can
                log into your True Dating account and manage your dates.
                <br />
                <br />
                We then match up your results with your dates and show you who
                you’re compatible with. You can then message one another and
                arrange future dates. It’s that’s easy!
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
              <h2>Why You Should Try It</h2>
              <Image src={singlesEventClampham} alt="Singles Events Brixton" />
              <br />
              <p>
                Dating is a challenge. In this day and age, it can be hard to
                find someone to match your personality and lifestyle. But if
                you’re tired of swiping left or right on those dating apps, you
                should try speed dating. Speed dating events are a great way to
                make new friends or find the love of your life.
                <br />
                <br />
                The best part about speed dating is that there are lots of
                events to choose from. Just sign up with True Dating, and we
                take care of the rest!
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
              <Image src={singlesEventClampham} alt="Singles Events Brixton" />
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
              <Image src={speedDatingClapham} alt="Speed Dating Brixton" />
            </div>
            <div>
              <Image src={claphamSpeedDating} alt="Brixton Speed Dating" />
            </div>
            <div>
              <Image
                src={speedDatingEventsClapham}
                alt="Speed Dating Events Brixton"
              />
            </div>
            <div>
              <Image
                src={claphamSpeedDatingEvents}
                alt="Brixton Speed Dating Events"
              />
            </div>
            <div>
              <Image
                src={bestSpeedDatingClaphamPNG}
                alt="Best Speed Dating Brixton"
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
