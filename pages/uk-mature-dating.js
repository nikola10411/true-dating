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
import Head from "next/head";
import {
  getEventsCardData,
  getLocations,
  getAges,
} from "../src/services/event";

export default function MatureDating({ events, locations, ages }) {
  return (
    <div id="home-page">
      <Head>
        <title>UK Mature Dating | Mature Date in London | True Dating</title>
        <meta
          name="description"
          content="True Dating is the UK's leading mature dating service for singles over 50 looking for love and companionship. Sign up today to make meaningful connections."
        />
        <meta
          name="keywords"
          content="uk mature dating, mature dating sites in uk, mature dating london"
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
          <Typography color="white">Mature Dating</Typography>
        </Breadcrumbs>
        <div className="row">
          <div className="column">
            <div className="content">
              <h1>UK Mature Dating</h1>
              <h2>
                Welcome to True Dating, the premier destination for mature
                singles looking for love and companionship. We are dedicated to
                connecting mature individuals in London, helping them find
                partners who truly understand and appreciate them.
                <br />
                <br />
                Uk Mature Dating, also known as Senior Dating, is a dating event
                for individuals over a certain age, typically 40 or 50 and
                above. Mature Dating can differ from traditional Dating as it
                often involves different priorities and expectations. You've
                come to the right place if you are looking for{" "}
                <strong>mature dating sites in UK</strong>. Let us tell you why:
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
              <h2>Light Up Your Love Life with London Mature Dating:</h2>
              <br />
              <Image src={bestSpeedDatingClapham} alt="Best Mature Dating" />
              <p className="servicePageMobilePadding">
                <br />
                At True Dating, we understand that{" "}
                <Link sx={{ color: "primary.main" }} href={routes.home}>
                  Dating In London
                </Link>{" "}
                can be a daunting experience, especially for mature individuals.
                That's why we've created a platform that allows you to meet
                like-minded individuals and find your perfect match. Whether
                you're looking for a casual date or a serious relationship, our
                events are designed to help you find the right partner.
              </p>
              <br />
              <br />
              <h2>Discover the Best of City with Mature Dating London: </h2>
              <br />
              <p>
                London is a vibrant and exciting city, and there's no better
                place to find love and companionship than in the heart of the
                UK. Our <strong>Mature Dating London</strong> events and
                activities are tailored to bring together like-minded
                individuals in a fun and relaxed atmosphere. Whether interested
                in culture and history or simply taking in the sights, our
                events are designed to help you experience the best of London
                with someone special.
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
              <h2>Connect with Mature Singles Across London:</h2>
              <Image src={singlesEventClampham} alt="Singles Events Clapham" />
              <br />
              <p>
                True Dating is not just limited to one place. We host events and
                activities across London so you can connect with mature singles
                in your area. Our Services are designed to help you find the
                right partner for you, no matter where you live. We, Truedating,
                are the best of all mature dating sites in UK.
                <br />
                <br />
                <h2>Join True Dating Today and Ignite Your Love Life:</h2>
                <br />
                Take advantage of the chance to light up your love life with our
                UK Mature Dating. Check out our upcoming{" "}
                <Link sx={{ color: "primary.main" }} href={routes.events}>
                  Singles Events
                </Link>{" "}
                and activities and reserve your spot today! Our team is always
                available to assist you with any questions or concerns and
                provide you with the best possible experience. We are committed
                to helping you find the partner that will make your heart race,
                and we wish you all the best on your dating journey.
                <br />
                <br />
                Mature Dating can also be more challenging as it may involve
                overcoming past experiences and emotional baggage. However, the
                right mindset and approach can also be a rewarding and
                fulfilling experience. Joining a mature dating community like
                True Dating can provide a supportive and understanding
                environment for individuals to navigate the dating scene and
                find meaningful connections
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
