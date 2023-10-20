import {
  Box,
  Container,
  Breadcrumbs,
  Link,
  Typography,
  Button,
} from "@mui/material";
import { COLORS } from "../../src/theme";
import { ArrowRightAlt } from "@mui/icons-material";
import EventSearch from "../../src/components/EventSearch";
import Reviews from "../../src/components/Reviews";
import EventsSEO from "../../src/components/EventSEO";

import Head from "next/head";
import {
  getEventsCardData,
  getLocations,
  getAges,
} from "../../src/services/event";

export default function Index({ events, locations, ages }) {
  return (
    <>
      <Head>
        <title>Speed Dating London | Speed Dating London | True Dating</title>
        <meta
          name="description"
          content="Interested in single events? Browse to find your best singles event in London with True Dating. Join singles events and enjoy a fun and electric environment."
        />
        <meta
          name="keywords"
          content="singles event london, dating Events London, singles Events, speed dating event, speed dating events london, dating events"
        />
      </Head>
      <Box bgcolor={COLORS.lightGrey} minHeight="inherit">
        <Container>
          <Box>
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
              <Link underline="hover" color="inherit" href="/">
                Home
              </Link>
              <Typography color="text.primary">Speed Dating</Typography>
            </Breadcrumbs>
          </Box>
        </Container>
      </Box>
      <EventSearch
        events={events}
        title="Upcoming Events"
        bgColor="#fff"
        locations={locations}
        ages={ages}
      />
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
      <EventsSEO />
      <Reviews bgColor={COLORS.lightGrey} />
    </>
  );
}

export const getServerSideProps = async ({ query, req, res }) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=59"
  );

  query = {
    ...query,
    showSpeedEvents: true,
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
