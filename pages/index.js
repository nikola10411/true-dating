import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
import Router from "next/router";
import {
  Box,
  Button,
  Container,
  useMediaQuery,
} from "@mui/material";

import { useTheme } from "@mui/system";

import { ArrowRightAlt } from "@mui/icons-material";

import homebanner from "../public/images/home_banner_optimized.jpg";
import homebannerMobile from "../public/images/homebanner_mobile.jpg";



import {
  getEventsCardData,
  getLocations,
  getAges,
} from "../src/services/event";
import { getTopBanner } from "../src/services/offers";

import { routes } from "../src/routes";
import { COLORS } from "../src/theme";

const BestDatingSite = dynamic(() => import('../src/components/BestDatingSite'), {
  ssr: false,
});

const Reviews = dynamic(() => import('../src/components/Reviews'), {
  ssr: false,
});

const TopBanner = dynamic(() => import('../src/components/TopBanner'), {
  ssr: false,
});

const EventSearch = dynamic(() => import('../src/components/EventSearch'), {
  ssr: false,
});

const HowItWorksSection = dynamic(() => import('../src/components/HowItWorksSection'), {
  ssr: false,
});


import asianNetwork from "../public/images/partners/asian_network.png";
import eveningStandard from "../public/images/partners/evening_standard.png";
import itv from "../public/images/partners/itv.png";
import lbc from "../public/images/partners/lbc.png";
import metro from "../public/images/partners/metro.png";
import handShake from "../public/images/handshake.svg";
import bigBen from "../public/images/big-ben.svg";
import refund from "../public/images/Group 67.png";
import creditCard from "../public/images/credit-card.svg";
import care from "../public/images/care.svg";
import safety from "../public/images/surface1.svg";

import mintleaf from "../public/images/mintleaf.jpg";
import folly from "../public/images/folly.jpg";
import riverside from "../public/images/riverside.jpg";

export default function Index({ events, locations, ages, isTopBannerEnabled }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      <Head>
        <title>Speed Dating London | Singles Parties | True Dating</title>
        <meta
          name="description"
          content="Explore London's best speed dating with the leading dating site in London. Join our platform to enjoy fantastic London venues for speed Dating London."
        />
        <meta
          name="keywords"
          content="speed Dating, speed Dating London, dating in London, dating site in london, online speed dating, single Parties"
        />
      </Head>
      {
        isTopBannerEnabled && (
          <TopBanner />
        )
      }
      <div id="home-page">
        <section id="home_banner">
          {isMobile ? (
            <Image src={homebannerMobile} fill alt="Home Banner" priority placeholder="blur" />
          ) : (
            <Image src={homebanner} fill alt="Home Banner" priority placeholder="blur" />
          )}
          <div className="row">
            <div className="six-col off-six column">
              <div className="content">
                <h1>
                  Stop Swiping.
                  <br />
                  <span>
                    Start Dating.
                    <br />
                  </span>
                  <span className="subHeading">
                    Speed Dating London & Singles Parties.
                    <br />
                    <span className="desktopLineBreak" />
                    Better prices, venues and hosts than anywhere else.
                  </span>
                </h1>
                <Box pt={3}>
                  <Button
                    variant="contained"
                    color="primary"
                    endIcon={<ArrowRightAlt />}
                    type="submit"
                    size="large"
                    onClick={() => Router.push(routes.events)}
                  >
                    Book Now
                  </Button>
                </Box>
              </div>
            </div>
          </div>
        </section>

        <Box pb={4} className="home_upcoming">
          <EventSearch
            events={events}
            title={
              <Box>
                <strong>Upcoming</strong> Events
              </Box>
            }
            limitCards={isMobile ? 6 : 6}
            bgColor="#fff"
            locations={locations}
            ages={ages}
          />

          {events.length > 0 && (
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
        </Box>

        <HowItWorksSection bgColor={COLORS.lightGrey} />
        <Container>
          <section id="partners">
            <Box pt={4} pb={6}>
              <h2>
                We've Been<span> Featured On:</span>
              </h2>
            </Box>
            <div className="row">
              <div>
                <Image src={asianNetwork} alt="Asian Network" placeholder="blur"  />
              </div>
              <div>
                <Image src={eveningStandard} alt="Evening Standart" placeholder="blur" />
              </div>
              <div>
                <Image src={itv} alt="True Dating has Been Featured On:" placeholder="blur" />
              </div>
              <div>
                <Image src={lbc} alt="True Dating has Been Featured On:" placeholder="blur" />
              </div>
              <div>
                <Image src={metro} alt="True Dating has Been Featured On:" placeholder="blur" />
              </div>
            </div>
          </section>

          <section id="whychoose">
            <h2>
              Why Choose <span>True Dating</span>
            </h2>
            <div className="grid-cont">
              <div>
                <div className="img-cont">
                  <Image src={handShake} alt="Brilliant Hosts | True Dating" />
                </div>
                <div className="text-cont">
                  <Box py={2}>
                    <h3>Brilliant Speed Dating Hosts</h3>
                  </Box>
                  <p>
                    You will be welcomed by a host (or two) to keep
                    conversations, drinks and the good times flowing.
                  </p>
                </div>
              </div>
              <div>
                <div className="img-cont">
                  <Image
                    src={bigBen}
                    alt="Fantastic London Venues | True Dating"
                  />
                </div>
                <div className="text-cont">
                  <Box py={2}>
                    <h3>Fantastic Speed Dating London Venues</h3>
                  </Box>
                  <p>
                    You will only find us in the top venues across London –
                    lively, safe and easy to access.
                  </p>
                </div>
              </div>
              <div>
                <div className="img-cont">
                  <Image src={refund} alt="Refund Policy | True Dating" />
                </div>
                <div className="text-cont">
                  <Box py={2}>
                    <h3>Refund Policy</h3>
                  </Box>
                  <p>
                    We are the only company that offer full refunds or will
                    change your ticket to any other upcoming event, as long as
                    you cancel your ticket up to 72 hours before your event.
                  </p>
                </div>
              </div>
              <div>
                <div className="img-cont">
                  <Image
                    src={creditCard}
                    alt="Easy Payment Method | True Dating"
                  />
                </div>
                <div className="text-cont">
                  <Box py={2}>
                    <h3>Easy Payment Method</h3>
                  </Box>
                  <p>
                    Purchasing a ticket is smooth and secure. Store your payment
                    card for quick check-out.
                  </p>
                </div>
              </div>
              <div>
                <div className="img-cont">
                  <Image
                    src={care}
                    alt="Excellent Customer Care | True Dating"
                  />
                </div>
                <div className="text-cont">
                  <Box py={2}>
                    <h3>Excellent Customer Care</h3>
                  </Box>
                  <p>
                    Our team is always on-hand to answer any questions you have
                    and work hard to ensure you have the best experience with
                    us.
                  </p>
                </div>
              </div>
              <div>
                <div className="img-cont">
                  <Image src={safety} alt="Safety Guaranteed | True Dating" />
                </div>
                <div className="text-cont">
                  <Box py={2}>
                    <h3>100% Safety Guaranteed</h3>
                  </Box>
                  <p>
                    We operate a zero tolerance policy for any sort of unwanted
                    behaviour at all of our events – keep it classy!
                  </p>
                </div>
              </div>
            </div>
          </section>

        </Container>

        <BestDatingSite bgColor={COLORS.lightGrey} />
        <Reviews bgColor={COLORS.lightGrey} />
      </div>
    </>
  );
}

export const getServerSideProps = async ({ query, req, res }) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=59"
  );

  let [events, locations, ages, topBanner] = await Promise.all([getEventsCardData(12, query), getLocations(), getAges(), getTopBanner()]);


  events = events.map((event) => ({
    ...event,
    dateTime: event.dateTime.toString(),
    createdAt: event.createdAt.toString(),
  }));

  return {
    props: {
      events,
      ages,
      locations,
      isTopBannerEnabled: topBanner.enabled,
    },
  };
};
