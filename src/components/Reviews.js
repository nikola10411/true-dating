import Image from "next/image";
import { Box, Container, Link } from "@mui/material";

import { routes } from "../routes";

import Jeremiath from "../../public/images/jeremiah.jpg";
import David from "../../public/images/david.jpg";
import Edward from "../../public/images/edward.jpg";
import Monica from "../../public/images/monica.jpg";
import Amy from "../../public/images/amy.jpg";
import Annie from "../../public/images/annie.jpg";

export default function Reviews({ bgColor = "#fff" }) {
  return (
    <Box py={10} id="lreviews" bgcolor={bgColor}>
      <Container>
        <div className="header">
          <h2>
            Our <span style={{ fontWeight: 500 }}>Reviews</span>
          </h2>
        </div>
        <div className="grid-cont">
          <div className="grid-items">
            <div className="grid-items-inner">
              <div className="img-cont">
                <Image src={Jeremiath} alt="Jeremiah - Reviews" placeholder="blur" />
              </div>
              <p>
                I had been hesitant to attend{" "}
                <Link
                  href={routes.events}
                  sx={(theme) => ({
                    color: theme.palette.primary.main,
                  })}
                >
                  speed dating events
                </Link>
                , but I'm so glad I did! I met some great people and even ended
                up dating one of them. Thank you, True Dating, for hosting such
                fun and inclusive events!
              </p>
              <Box pt={2}>
                <h4>Jeremiah</h4>
              </Box>
            </div>
          </div>
          <div className="grid-items">
            <div className="grid-items-inner">
              <div className="img-cont">
                <Image src={Monica} alt="Monica - Reviews" placeholder="blur" />
              </div>
              <p>
                I've always been nervous about attending{" "}
                <Link
                  href={routes.events}
                  sx={(theme) => ({
                    color: theme.palette.primary.main,
                  })}
                >
                  singles event London
                </Link>{" "}
                alone, but True Dating's events made me feel comfortable and
                welcome. I ended up making some great friends and would try
                again.
              </p>
              <Box pt={2}>
                <h4>Monica</h4>
              </Box>
            </div>
          </div>
          <div className="grid-items">
            <div className="grid-items-inner">
              <div className="img-cont">
                <Image src={Annie} alt="Annie - Reviews" placeholder="blur" />
              </div>
              <p>
                I'm not a big fan of dating apps and was looking for a different
                way to meet people. I met some great people at{" "}
                <Link
                  href={routes.shoreditch}
                  sx={(theme) => ({
                    color: theme.palette.primary.main,
                  })}
                >
                  speed dating Shoreditch
                </Link>{" "}
                and even had a few dates. I highly recommend their events to
                anyone looking to expand their social circle and meet new
                people.
              </p>
              <Box pt={2}>
                <h4>Annie</h4>
              </Box>
            </div>
          </div>
          <div className="grid-items">
            <div className="grid-items-inner">
              <div className="img-cont">
                <Image src={Edward} alt="Edward - Reviews" placeholder="blur" />
              </div>
              <p>
                Attended singles party in Marylebone and met some lovely ladies
                so will definitely go again to your events.
              </p>
              <Box pt={2}>
                <h4>Edward</h4>
              </Box>
            </div>
          </div>
          <div className="grid-items">
            <div className="grid-items-inner">
              <div className="img-cont">
                <Image src={Amy} alt="Amy - Reviews" placeholder="blur" />
              </div>
              <p>
                Not as scary as I thought! Loved the host Lucy and event had a
                very chilled vibe.
              </p>
              <Box pt={2}>
                <h4>Amy</h4>
              </Box>
            </div>
          </div>
          <div className="grid-items">
            <div className="grid-items-inner">
              <div className="img-cont">
                <Image src={David} alt="David - Reviews" placeholder="blur" />
              </div>
              <p>
                So much better than dating apps. Nice to meet people in real
                life and actually see quickly if you like them or not. Didn’t
                meet anyone I liked but want to keep trying it out.
              </p>
              <Box pt={2}>
                <h4>David</h4>
              </Box>
            </div>
          </div>
        </div>
      </Container>
    </Box>
  );
}
