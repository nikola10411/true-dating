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

export default function Clapham({ events, locations, ages }) {
  return (
    <div id="home-page">
      <Head>
        <title>Speed Dating Clapham | True Dating</title>
        <meta
          name="description"
          content="Connect with the right people with Speed Dating Clapham! True Dating is your best help and guidance to find your love in a fun and relaxed environment."
        />
        <meta name="keywords" content="Speed Dating Clapham" />
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
          <Typography color="white">Clapham</Typography>
        </Breadcrumbs>
        <div className="row">
          <div className="column">
            <div className="content ml-2">
              <h1>Speed Dating Clapham</h1>
              <h2>
                It’s not easy to find a partner at the age of 32, right? Thus,
                it can be hard to find someone that will want to know more about
                you and get into a relationship. That is why speed dating is
                such a great solution for single people who need to find love.
                <br />
                <br />
                Speed dating allows you to meet up with multiple people in just
                one night, but with just four minutes per person. It’s a great
                way for singles of any age and background to connect and get
                back on the dating scene quickly and efficiently.
                <br />
                <br />
                At True Dating, we are passionate about helping you find
                passion. With our speed dating events in Clapham, you have the
                perfect opportunity to meet new people and possibly spark
                romance.
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
                alt="Best Speed Dating Clapham"
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
                alt="Best Speed Dating Clapham"
              />
              <br />
              <p>
                Speed dating is a dating event in which the participants briefly
                meet a large number of people. In a typical speed-dating event,
                participants will have the opportunity to speak with a member of
                the opposite sex for four minutes each.
                <br />
                <br />
                Speed dating is a great way for singles of all ages and
                backgrounds to dip their toes back into the dating waters. It’s
                a way to meet people with similar interests in a short period of
                time, and that often helps break the ice for more comfortable
                conversation.
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
              <h2>How Does It Work?</h2>
              <Image src={singlesEventClampham} alt="Singles Events Clapham" />
              <br />
              <p>
                Speed dating is where singles sit down with a bunch of other
                single people and talk to them for a few minutes. However, it’s
                a little easier to get the details out of somebody when you’re
                only talking to them for four minutes instead of an hour.
                <br />
                <br />
                At a typical speed-dating event, you sit down at a table with
                your name card, and your table partner sits with you. You
                introduce yourself and ask questions until the timer on your
                table goes off.
                <br />
                <br />
                In these four minutes, you’ll want to get to know your table
                partner and decide if you want to exchange contact information
                and go on a date with them. If the person at your table doesn’t
                seem interesting or there just isn’t any chemistry, then you’ll
                move on to the next person. It’s that easy.
              </p>
              <br />
              <h2>Join True Dating Today</h2>
              <br />
              <p>
                When you join True Dating, you can access your matches via your
                personal account and manage your potential dates. We make it
                easy to find romance in Clapham, so get on board today and
                discover a new way to date.
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
              <Image src={singlesEventClampham} alt="Singles Events Clapham" />
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
              <Image src={speedDatingClapham} alt="Speed Dating Clapham" />
            </div>
            <div>
              <Image src={claphamSpeedDating} alt="Clapham Speed Dating" />
            </div>
            <div>
              <Image
                src={speedDatingEventsClapham}
                alt="Speed Dating Events Clapham"
              />
            </div>
            <div>
              <Image
                src={claphamSpeedDatingEvents}
                alt="Clapham Speed Dating Events"
              />
            </div>
            <div>
              <Image
                src={bestSpeedDatingClaphamPNG}
                alt="Best Speed Dating Clapham"
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
