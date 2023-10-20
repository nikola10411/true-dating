import Image from "next/image";
import Head from "next/head";
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
import gay_party_about_info from "../public/images/gay_party_about_info.jpg";
import {
  getEventsCardData,
  getLocations,
  getAges,
} from "../src/services/event";

export default function ChristianDating({ events, locations, ages }) {
  return (
    <div id="home-page">
      <Head>
        <title>Gay Dating Events | Gay Dating in the UK | True Dating</title>
        <meta
          name="description"
          content="True Dating provides a safe and welcoming space for gay singles in the UK to find true love. Join us today and start your journey to finding the one!"
        />
        <meta
          name="keywords"
          content="gay dating, gay dating sites, free gay dating sites, gay dating website"
        />
      </Head>
      <section id="home_banner" className={"home_banner_gay_dating"}>
        <Image
          src={
            "https://firebasestorage.googleapis.com/v0/b/true-dating-ff8ed.appspot.com/o/images%2FhomePage%2FGay%20Party%20new.jpg?alt=media&token=d4fad09c-903b-4a70-9d3c-abb405b71a1c"
          }
          fill
          alt="Home Banner"
          priority
        />
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
          <Typography color="white">Gay Dating</Typography>
        </Breadcrumbs>
        <div className="row">
          <div className="column">
            <div className="content">
              <h1>GAY DATING</h1>
              <h2>
                In the world of dating apps, dating in general can seem brutal,
                meaningless and very shallow. It’s why in many ways we decided
                to start True Dating. We were sick of the current dating culture
                and wanted to create an environment for people to meet face to
                face in a fun and safe setting.
                <br /> <br /> Although we started True Dating with exclusively
                heterosexual events, our plan was always to expand to gay dating
                events as we knew the LGBTQ+ community have exactly the same
                issues when it comes to dating.
                <br />
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
                src={gay_party_about_info}
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
              <h2>Discover a Diverse Community with Gay Dating</h2>
              <br />
              <Image src={gay_party_about_info} alt="Best Mature Dating" />
              <p className="servicePageMobilePadding">
                Our gay dating events plan to cover the same formats as our
                regular events. We aim to put on the best gay speed dating and
                singles parties London has to offer. Our hosts, venues and
                prices make our events the best dating events in London and
                since we formed in 2019 we have grown from strength to strength.
                With our gay dating events, we expect a very diverse group of
                people to join, as they do with our regular events. Successful,
                working professionals from all backgrounds looking for long
                lasting connections.
                <br />
                <br />
                <br />
                <h2>Find Your Perfect Match with Gay Dating</h2>
                <br />
                We have a motto at True Dating: give our members what they want.
                It’s a simple rule but one we have always tried to stick too.
                Over the years we’ve had many requests for us to start hosting
                gay dating and it was always our plan to do so. Hopefully with
                the experience we have gained hosting all types of other events
                we can now dip our toe into the gay dating world and offer
                something unique and far better than what’s currently out there.
                And yes, in case you’re wondering, dating events do actually
                work. We have a really high success rate at our events, and we
                expect our gay dating events to follow a similar pattern. Love
                is love after all.
                <br />
                <br />
                <h2>Experience Safe and Secure Gay Dating</h2>
                <br />
                Safety and security are of the utmost importance to us. We take
                all necessary measures to ensure the privacy and protection of
                our users. Our speed dating and{" "}
                <Link sx={{ color: "primary.main" }} href={routes.home}>
                  Single parties
                </Link>{" "}
                are designed to provide a secure and welcoming environment for
                the gay community to connect and find love. We also offer a team
                of experts to assist you with questions or concerns.
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
              <h2>Join the Gay Dating Revolution</h2>
              <Image src={singlesEventClampham} alt="Singles Events Clapham" />
              <br />
              <p>
                As the shift in dating is finally starting to move away from
                dating apps, we truly believe gay dating events will be the next
                big destination for people looking to find love in London. We
                hope our gay dating events are just as popular as our regular
                events and we plan to invest just as much love and care into
                these to ensure everyone is made to feel welcome and inclusive.
                Our aim is to gradually increase the amount of gay dating events
                we do and we’ll try our best to host events that are as
                inclusive as possible.
                <br />
                <br />
                <h2>Join True Dating and Ignite Your Love Life</h2>
                <br />
                Take advantage of the chance to ignite your love life with True
                Dating. We have got a list of events for you from gay dating to{" "}
                <Link sx={{ color: "primary.main" }} href={routes.events}>
                  Mature dating Uk
                </Link>
                . We host events all over London every week and since our
                inception we have tripled the number of events we host, which
                just shows the growing demand for dating events in London. If
                you’ve never tried a speed dating event or singles parties
                before then why not give it a go? Dating is all about taking
                risks, love is out there for you, you just have to go and find
                it!
                <br />
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
    showGayEvents: true,
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
