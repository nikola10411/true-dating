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

export default function Chelsea({ events, locations, ages }) {
  return (
    <div id="home-page">
      <Head>
        <title>Speed Dating Chelsea | True Dating</title>
        <meta
          name="description"
          content="Connect with the right people with Speed Dating Chelsea! True Dating is your best help and guidance to find your love in a fun and relaxed environment."
        />
        <meta name="keywords" content="Speed Dating Chelsea" />
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
          <Typography color="white">Chelsea</Typography>
        </Breadcrumbs>
        <div className="row">
          <div className="column">
            <div className="content ml-2">
              <h1>Speed Dating Chelsea</h1>
              <h2>
                Dating in the digital age is hard. It’s no different than dating
                in the physical world, but it can feel more lonely, with less of
                a chance to connect with others. Thankfully, there are many ways
                you can get out of your comfort zone and meet someone new.
                <br />
                <br />
                Speed dating events are one way to meet your future partner. By
                offering a set time frame for meeting people, it’s easier to get
                past first impressions and make meaningful connections with
                people who share similar interests.
                <br />
                <br />
                Speed dating is also uniquely suited for the modern singles
                scene because it’s not always easy to make new friends or meet
                potential partners at work or through your social circle. Speed
                dating offers a fun way to expand your horizons while meeting
                someone special.
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
                alt="Best Speed Dating Chelsea"
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
              <h2>Fun Speed Dating in Chelsea: How Does It Work?</h2>
              <br />
              <Image
                src={bestSpeedDatingClapham}
                alt="Best Speed Dating Chelsea"
              />
              <br />
              <p>
                Speed dating is an event where singles spend four minutes with
                each person they are interested in meeting. You will have your
                own table with your name on it and will take turns meeting
                people. We provide all the materials you need including name
                tags and icebreakers, to help you feel more comfortable.
                <br />
                <br />
                Chelsea is the perfect location for speed dating events because
                it’s a hub for creativity, entrepreneurs, and people with
                alternative lifestyles. So if you’re ready to experience a fun
                and exciting way to date, join True Dating today.
                <br />
                <br />
                After the event, you can sign in to your True Dating account and
                manage your dates. You list who you connected with, and we will
                tally up the results. You will then get notified of your
                matches, and you can then start messaging one another to set up
                a second date.
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
              <h2>Benefits of Speed Dating</h2>
              <Image src={singlesEventClampham} alt="Singles Events Chelsea" />
              <br />
              <p>
                Speed dating offers a variety of benefits. Our speed dating
                events are more than just an opportunity to meet new people.
                They can be an opportunity to meet someone you might not have
                otherwise had the chance to meet.
                <br />
                <br />
                They also allow you to quickly get over first impressions and
                make a connection with the people you meet. And for those who
                are shy, speed dating offers a way to step out of your comfort
                zone and meet new people.
                <br />
                <br />
                It’s also a great way to expand your horizons and meet someone
                who might not be in your social circle. Some people might meet
                their future spouse or partner through a speed dating event, and
                True Dating makes it all possible.
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
              <Image src={singlesEventClampham} alt="Singles Events Chelsea" />
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
              <Image src={speedDatingClapham} alt="Speed Dating Chelsea" />
            </div>
            <div>
              <Image src={claphamSpeedDating} alt="Chelsea Speed Dating" />
            </div>
            <div>
              <Image
                src={speedDatingEventsClapham}
                alt="Speed Dating Events Chelsea"
              />
            </div>
            <div>
              <Image
                src={claphamSpeedDatingEvents}
                alt="Chelsea Speed Dating Events"
              />
            </div>
            <div>
              <Image
                src={bestSpeedDatingClaphamPNG}
                alt="Best Speed Dating Chelsea"
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
