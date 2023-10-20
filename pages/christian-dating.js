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

export default function ChristianDating({ events, locations, ages }) {
  return (
    <div id="home-page">
      <Head>
        <title>Christian Dating Events | Christian Singles | True Dating</title>
        <meta
          name="description"
          content="Our events provide a safe and relaxed atmosphere to meet other Christians from your area. Find the perfect match and start making meaningful relationships!"
        />
        <meta
          name="keywords"
          content="christian dating site, christian dating for free, free christian dating sites, christian singles"
        />
      </Head>
      <section id="home_banner">
        <Image src={homebanner} fill alt="Home Banner" priority />
        <Breadcrumbs
          sx={(theme) => ({
            color: "white",
            paddingTop: 2,
            paddingLeft: 12,
            position: "relative",
            zIndex: 1,
            "& a": {
              color: "#eee",
              textShadow: "0px 0.1px 2px grey",
            },
            [theme.breakpoints.down("sm")]: {
              paddingLeft: 2,
            },
          })}
          aria-label="breadcrumb"
        >
          <Link underline="hover" color="inherit" href={routes.home}>
            Home
          </Link>
          <Typography color="white">Christian Dating</Typography>
        </Breadcrumbs>
        <div className="row">
          <div className="column">
            <div className="content ml-2">
              <h1>Christian Dating Events</h1>
              <h2>
                As the dating scene becomes ever more niche, at True Dating we
                host <strong>Christian Dating Events</strong> to help you meet
                like-minded Individuals who share the same faith as you.
                <br />
                <br />
                Finding someone who shares your core principles in today's world
                might be challenging. <strong>Christian singles</strong> can
                find a welcoming community at these{" "}
                <strong>Christian Dating</strong> events. They provide a great
                way to meet other like-minded singles in a safe, fun, and
                friendly environment. If you're looking to date fellow
                Christians, then our <strong>Christian dating</strong> events
                provide the perfect opportunity to connect with fellow
                Christians.
                <br />
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
                  borderRadius: 4,
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
              <h2>What makes Christian Dating different</h2>
              <br />
              <Image src={bestSpeedDatingClapham} alt="Best Mature Dating" />
              <p className="servicePageMobilePadding">
                At True Dating, we understand that shared values and beliefs are
                essential to any relationship. That's why we're excited to offer
                a variety of <strong>Christian Dating</strong> events for our
                members to attend and connect with other like-minded individuals
                who share their faith.
                <br />
                <br />
                Our dating events range from social mixers to more formal
                get-togethers and are made to be warm and inclusive for all
                members. Whether you're new to the Dating scene or have been out
                there for a while, we want you to feel comfortable and have a
                great time. Meet other <strong>Christian singles</strong> who
                share your interests and passions in a fun and relaxed
                atmosphere.
                <br />
                <br />
                Our most popular Christian events are Christian Speed Dating
                events. You'll have the opportunity to go on up to 15 dates,
                each lasting about 4 minutes—plenty of time to find out whether
                chemistry is present. The women sit at the same table each time,
                but the men switch seats. The following day, you can submit your
                matches and hopefully begin planning date number two.
                <br />
                <br />
                <h2>Find Your Match with Christian Dating for Free</h2>
                <br />
                Discover your soulmate at Christian dating events with True
                Dating and allow us to do all the hard work. Take the first step
                toward establishing lasting connections by getting to know other{" "}
                <strong>Christian singles</strong> who are actively seeking
                relationships. We find most of our attendees at Christian speed
                dating tend to be successful, working professionals who just
                don’t have the time to be sifting through the dating pool of
                apps and definitely don’t want to meet someone in a bar.
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
              <h2>Join Our Safe, Fun, and Friendly Christian Dating</h2>
              <Image src={singlesEventClampham} alt="Singles Events Clapham" />
              <br />
              <p>
                And what better place to meet other singles than at a Christian{" "}
                <Link sx={{ color: "primary.main" }} href={routes.home}>
                  speed dating London
                </Link>{" "}
                event where everyone there is actively looking for a
                relationship? Just because you have a faith you follow doesn’t
                mean dating has to be any harder than it needs to be. When
                you’re in an environment where everyone else is single and of a
                fellow persuasion, your chances of meeting your soul mate
                dramatically increases.
                <br />
                <br />
                <h2>
                  Expand Your Circle with Our Range of Christian Dating Events
                </h2>
                <br />
                <br />
                <br />
                So, make sure to attend our upcoming{" "}
                <Link sx={{ color: "primary.main" }} href={routes.events}>
                  dating events London
                </Link>{" "}
                today and take the first step towards creating meaningful
                connections and finding your perfect match! Most people tend to
                come on their own but whether it’s your soul mate or just a new
                friend, 90% of people who attend our events meet at least one
                person they would like to see again.
              </p>
              <br />
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

  query = {
    ...query,
    showChristianEvents: true,
  };

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
