import dynamic from "next/dynamic";
import {
  Box,
  Container,
  Grid,
  Typography,
} from "@mui/material";


import { COLORS } from "../theme";

const FeaturedEventCard = dynamic(() => import('./FeaturedEventCard'), {
  ssr: false,
});

const EventCard = dynamic(() => import('./EventCard'), {
  ssr: false,
});

const EventSearchForm = dynamic(() => import('./EventSearchForm'), {
  ssr: false,
});

export default function EventSearch({
  events,
  title,
  bgColor,
  limitCards = 0,
  locations = [],
  ages = [],
}) {
  return (
    <Box bgcolor={bgColor || COLORS.lightGrey} minHeight="inherit">
      <Container>
        <Box>
          {events.length > 0 ? (
            <Typography
              variant={title ? "h4" : "h1"}
              sx={(theme) => ({
                textTransform: "capitalize",
                textAlign: "center",
                fontSize: "32px",
                paddingTop: theme.spacing(4),
                "& .event-span": {
                  color: theme.palette.primary.main,
                },
                [theme.breakpoints.down("xs")]: {
                  fontSize: 30,
                },
              })}
            >
              {title || (
                <>
                  <strong>Find your</strong> Perfect Dating Events in London
                </>
              )}
            </Typography>
          ) : (
            <Box textAlign="center" pt={10}>
              <Typography variant="h6">
                We currently have no events available...
              </Typography>
            </Box>
          )}
          <Box my={4}>
            <EventSearchForm locations={locations} ages={ages} title={title} />
          </Box>
          <Grid container spacing={2}>
            {events.length > 0 &&
              events.filter((_, index) => limitCards > 0 ? index < limitCards : true).map((event, index) =>
                event.featured ? (
                  <Grid item container key={`event_${index}`}>
                    <FeaturedEventCard {...event} />
                  </Grid>
                ) : (
                  <Grid item key={`event_${index}`} xs={12} sm={6} md={4}>
                    <EventCard {...event} />
                  </Grid>
                )
              )}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
