import { useMemo } from "react";
import Image from "next/image";
import Router from "next/router";
import {
  Button,
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { useTheme } from "@mui/system";

import { routes } from "../routes";
import { getEventUrlFromTitleDate, getFormattedDate } from "../utils/date";
import { getRemainingTicketsText } from "../utils/eventCard";

import { POUND_SYMBOL, IMG_PLACEHOLDER } from "../constants";

import femaleSVG from "../../public/images/female.svg";
import maleSVG from "../../public/images/male.svg";
import { ArrowRightAlt } from "@mui/icons-material";

export default function EventCard({
  id,
  imgURL,
  imgMobileUrl,
  title,
  dateTime,
  venue,
  ageRangeFrom,
  ageRangeTo,
  menAvailableTickets,
  womenAvailableTickets,
  ticketPrice,
  ticketPriceWithoutDiscount,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const imageUrlForCard = useMemo(() => {
    if (isMobile && imgMobileUrl) {
      return imgMobileUrl;
    }

    if (imgURL) {
      return imgURL;
    }

    return IMG_PLACEHOLDER;
  }, [isMobile, imgURL]);

  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        "& .MuiCardContent-root": {
          padding: 0,
          height: "inherit",
        },
        "& .MuiCardActions-root": {
          display: "initial",
          padding: 0,
        },
      }}
    >
      <CardActionArea
        // as={Link}
        href={`${routes.events}/${getEventUrlFromTitleDate(title, dateTime)}`}
        sx={{ textDecoration: "none" }}
      >
        <Box
          sx={{
            position: "relative",
            height: 250,
            "& img": {
              objectFit: "cover",
            },
          }}
        >
          <Image
            src={imageUrlForCard}
            alt={title}
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
            placeholder="blur"
            blurDataURL="data:image/webp;base64,UklGRj4FAABXRUJQVlA4WAoAAAAgAAAANQMAxQEASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggUAMAALBjAJ0BKjYDxgE/OZzLXy8rKSUgCAHgJwlpbuF1URvz+gBPYB77ZOQ99snIe+2TkPfbJyHvtk5D3pREMiIiIhkREREMiIiIhkREREMiIiIhkRERNJERDIiIiIZERERDIiIiIZERERDIiIiIZERE4kRERDIiIiIZERERDIiIiIZERERDIiIiIZEUCRERERDIiIiIZERERDIiIiIZERERDIiIiIZSaIZERERDIiIiIZERERDIiIiIZERERDIiIiJbIiGREREQyIiIiGREREQyIiIiGREREQyIiImkiIhkREREMiIiIhkREREMiIiIhkREREMiIicSIiIhkREREMiIiIhkREREMiIiIhkREREMiKBIiIiIhkREREMiIiIhkREREMiIiIhkREREMpNEMiIiIhkREREMiIiIhkREREMiIiIhkREREtkRDIiIiIZERERDIiIiIZERERDIiIiIZERETSREQyIiIiGREREQyIiIiGREREQyIiIiGREROJEREQyIiIiGREREQyIiIiGREREQyIiIiGRFAkREREQyIiIiGREREQyIiIiGREREQyIiIiGUmiGREREQyIiIiGREREQyIiIiGREREQyIiIiWyIhkREREMiIiIhkREREMiIiIhkREREMiIiJpIiIZERERDIiIiIZERERDIiIiIZERERDIiInEiIiIZERERDIiIiIZERERDIiIiIZERERDIigSIiIiIZERERDIiIiIZERERDIiIiIZERERDKTRDIiIiIZERERDIiIiIZERERDIiIiIZERERLZEQyIiIiGREREQyIiIiGREREQyIiIiGRERE0kREMiIiIhkREREMiIiIhkREREMiIiIhkRETiREREMiIiIhkREREMiIiIhkREREMiIiIhkRQJEREREMiIiIhkREREMiIiIhkREREMiIiIhlJohkREREMiIiIhkREREMiIiIhkREREMiIiIlsiIZERERDIiIiIZERERDIiIiIZERERDIiIiaSIiGREREQyIiIiGREREQyIiIiGREREQyIiJxIiIiGREREQyIiIiGREREQyIiIiGREREQyIiAAP75NAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
          />
        </Box>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          sx={{
            backgroundColor: "primary.main",
            color: "primary.contrastText",
            "& *": {
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            },
          }}
        >
          <Box p={1} textAlign="center" maxWidth="100%">
            <Typography variant="h6">{title}</Typography>
            <Typography variant="body2" component="div">
              <Box fontWeight="fontWeightMedium">{venue}</Box>
            </Typography>
          </Box>
        </Grid>
      </CardActionArea>
      <CardContent>
        <Box py={2}>
          <Grid container justifyContent="space-evenly">
            <Grid
              item
              container
              xs={5}
              alignItems="center"
              justifyContent="center"
              wrap="nowrap"
            >
              <Box maxWidth={24}>
                <Image
                  src={maleSVG}
                  alt="Male Icon"
                  style={{ width: "100%" }}
                />
              </Box>
              <Typography variant="body2" component="div">
                <Box ml={2} fontWeight="fontWeightBold">
                  {getRemainingTicketsText(menAvailableTickets)}
                </Box>
              </Typography>
            </Grid>
            <Grid
              item
              xs={1}
              container
              alignItems="center"
              justifyContent="center"
            >
              <Divider
                sx={{
                  height: "100%",
                  width: "1px",
                  backgroundColor: "rgba(0, 0, 0, 0.12)",
                }}
              />
            </Grid>
            <Grid
              item
              container
              xs={5}
              alignItems="center"
              justifyContent="center"
              wrap="nowrap"
            >
              <Box maxWidth={26}>
                <Image
                  src={femaleSVG}
                  alt="Female Icon"
                  style={{ width: "100%" }}
                />
              </Box>
              <Typography variant="body2" component="div">
                <Box ml={2} fontWeight="fontWeightBold">
                  {getRemainingTicketsText(womenAvailableTickets)}
                </Box>
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box paddingLeft={2} paddingRight={2}>
          <Grid container>
            <Grid item xs>
              <Box textAlign="center">
                <Typography variant="body1" component="div">
                  <Box fontWeight="fontWeightBold">Date</Box>
                </Typography>
                <Typography variant="body2" component="p">
                  {dateTime
                    ? getFormattedDate(dateTime)
                    : null}
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={1}
              container
              alignItems="center"
              justifyContent="center"
            >
              <Divider
                sx={{
                  height: "100%",
                  width: "1px",
                  backgroundColor: "rgba(0, 0, 0, 0.12)",
                }}
              />
            </Grid>
            <Grid item xs>
              <Box textAlign="center">
                <Typography variant="body1" component="div">
                  <Box fontWeight="fontWeightBold">Age Range</Box>
                </Typography>
                <Typography variant="h6">
                  {ageRangeFrom}-{ageRangeTo}
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={1}
              container
              alignItems="center"
              justifyContent="center"
            >
              <Divider
                sx={{
                  height: "100%",
                  width: "1px",
                  backgroundColor: "rgba(0, 0, 0, 0.12)",
                }}
              />
            </Grid>
            <Grid item xs>
              <Box textAlign="center">
                <Typography variant="body1" component="div">
                  <Box fontWeight="fontWeightBold">Price</Box>
                </Typography>
                <Typography variant="h6">
                  {ticketPriceWithoutDiscount && (
                    <>
                      <Typography
                        sx={{
                          display: "inline",
                          color: "primary.main",
                          textDecoration: "line-through",
                          textDecorationThickness: "1px",
                          marginRight: "4px",
                        }}
                      >
                        {POUND_SYMBOL}
                        {ticketPriceWithoutDiscount}
                      </Typography>
                    </>
                  )}
                  {POUND_SYMBOL}
                  {ticketPrice}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
      <CardActions>
        <Box p={2}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            endIcon={<ArrowRightAlt />}
            onClick={() =>
              Router.push(
                `${routes.events}/${getEventUrlFromTitleDate(title, dateTime)}`
              )
            }
          >
            Book Now
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
}
