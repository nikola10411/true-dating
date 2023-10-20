import Image from "next/image";
import { Box, Container, Link } from "@mui/material";

import { routes } from "../routes";

import discoverTheExcitingWorld from "../../public/images/AdobeStock_126874025-min.jpeg";
import datingEventsLondon from "../../public/images/over-40.jpg";
import speedSingleEvent from "../../public/images/Singles party 4.jpg";

export default function EventsSEO({ bgColor = "#fff" }) {
  return (
    <section id="how_speed" style={{ backgroundColor: bgColor }}>
      <Container>
        <div className="row">
          <div className="six-col column match_height">
            <div className="content">
              <Box pb={2}>
                <h2>Discover the Exciting World of Dating</h2>
              </Box>
              <p>
                Our Single Events London are not just about dating; they are a
                chance to explore new interests and make new friends. We get
                that going out on a limb to meet strangers can be
                nerve-wracking, but we ensure that our events are a safe and
                enjoyable way to meet other singles in London.
                <br />
                <br />
                Our events range from large{" "}
                <Link
                  href={routes.events}
                  sx={(theme) => ({
                    color: theme.palette.primary.main,
                  })}
                >
                  singles parties
                </Link>{" "}
                to smaller, more intimate speed dating events. Both types of
                dating events are a great opportunity to meet people outside
                your social circle. Not only will you have the chance to connect
                with potential matches, but you'll also have the chance to make
                new friends and expand your social network.
                <br />
                <br />
                Our <strong>Singles Event London</strong> represents our best
                efforts to foster a friendly and open community for all members.
                We hope you enjoy yourself here regardless of how long or short
                your dating history is.
              </p>
            </div>
          </div>
          <div className="six-col column section-bg match_height eventSEOContainer">
            <Image
              style={{ width: "100%" }}
              src={discoverTheExcitingWorld}
              width={640}
              alt="Discover the Exciting World of Dating"
            />
          </div>
        </div>
        <Box
          className="row"
          sx={(theme) => ({
            maxWidth: "auto",
            [theme.breakpoints.down("sm")]: {
              marginTop: `30px !important`,
              flexDirection: "column-reverse !important",
            },
          })}
        >
          <Box
            className="four-col column section-bg match_height"
            sx={(theme) => ({
              [theme.breakpoints.down("sm")]: {
                minHeight: "auto !important",
              },
              "& img": {
                maxWidth: "100%",
                maxHeight: 400,
                boxShadow: theme.shadows[2],
                [theme.breakpoints.down("sm")]: {
                  display: "block",
                  marginTop: 20,
                  width: "100%",
                },
              },
            })}
          >
            <Image
              style={{ marginTop: 10 }}
              src={datingEventsLondon}
              alt="Dating events london"
            />
          </Box>
          <div className="eight-col column match_height">
            <div className="content">
              <Box pb={2}>
                <h2>
                  Dating Events London
                  <span>
                    <strong>Find Your Perfect Match</strong>
                  </span>
                </h2>
              </Box>
              <p>
                Have you had enough of trying different dating apps without any
                success? At True Dating, meeting people in a social setting can
                often lead to more meaningful connections. Why not try our{" "}
                <Link
                  href={routes.events}
                  sx={(theme) => ({
                    color: theme.palette.primary.main,
                  })}
                >
                  singles parties
                </Link>
                ? Just as the name suggests, it's a party, fully of single
                people. We have our hosts on hand to make introductions, but
                it's left up to you to speak to whoever takes your fancy.
                There's no pressure and as most people come alone it's
                incredibly easy to make friends before the flirting begins.
              </p>
              <br />
            </div>
          </div>
        </Box>
        <div className="row">
          <div className="six-col column match_height">
            <div className="content">
              <Box pb={2}>
                <h2>Speed Dating Event Meet Multiple Singles in One Night</h2>
              </Box>
              <p>
                Are you looking for a fast-paced and efficient way to meet other
                singles in London? Look no further than our{" "}
                <strong>speed dating events</strong>. Our{" "}
                <Link sx={{ color: "primary.main" }} href={routes.home}>
                  speed dating London
                </Link>{" "}
                events offer the perfect opportunity to meet multiple singles in
                one night in a fun and relaxed atmosphere. With a variety of age
                groups and locations to choose from, you're sure to find an
                event that suits your preferences.
                <br />
                <br />
                Imagine meeting multiple potential matches in one night without
                the pressure of a one-on-one date. Speed dating events are a
                great way to meet lots of people quickly and efficiently,
                increasing your chances of finding a match.
                <br />
                <br />
                Why not give our Singles Events London a try? You never know who
                you might meet and the connections you may make. Keep an eye out
                on our events page for upcoming gatherings, and RSVP today!
              </p>
            </div>
          </div>
          <div className="six-col column section-bg match_height eventSEOContainer">
            <Image
              src={speedSingleEvent}
              style={{ width: "100%" }}
              width={"100%"}
              alt="Speed Dating Event Meet Multiple Singles in One Night"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
