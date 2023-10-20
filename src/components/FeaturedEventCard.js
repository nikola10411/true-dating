import { Button, Box, Card, CardActions, CardActionArea, CardMedia, Divider, Grid, Typography } from "@mui/material";
import Router from "next/router";
import Image from "next/image";

import DraftEditor from "./DraftEditor";

import { routes } from "../routes";
import { getEventUrlFromTitleDate, getFormattedDate } from "../utils/date";
import { getDescription } from "../utils/description";
import { getRemainingTicketsText } from '../utils/eventCard';

import { IMG_PLACEHOLDER, POUND_SYMBOL } from '../constants';

import femaleSVG from '../../public/images/female.svg';
import maleSVG from '../../public/images/male.svg';
import { ArrowRightAlt } from "@mui/icons-material";

export default function FeaturedEventCard({
  id,
  description,
  imgURL,
  title,
  dateTime,
  venue,
  ageRangeFrom,
  ageRangeTo,
  menAvailableTickets,
  womenAvailableTickets,
  ticketPrice,
}) {
  return (
    <Card sx={(theme) => ({
      padding: theme.spacing(1),
      backgroundColor: theme.palette.primary.main,
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      '& .MuiCardContent-root': {
        padding: 0,
        height: 'inherit',
      },
      '& .MuiCardActions-root': {
        display: 'initial',
        padding: 0,
      },
      '& .MuiCardActionArea-root': {
        height: '100%',
        [theme.breakpoints.down('sm')]: {
          height: 400,
        },
        [theme.breakpoints.down('xs')]: {
          height: 250,
        },
      },
    })}>
      <Grid container>
        <Grid item xs={12} sm={12} md>
          <CardActionArea onClick={() => Router.push(`${routes.events}/${getEventUrlFromTitleDate(title, dateTime)}`)}>
            <CardMedia image={imgURL || IMG_PLACEHOLDER} title={title} sx={(theme) => ({
              height: '100%',
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                backgroundImage: 'url(featured_banner.svg)',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right',
                width: 200,
                height: 250,
                [theme.breakpoints.down('sm')]: {
                  width: 160,
                  height: 200,
                },
                [theme.breakpoints.down('xs')]: {
                  width: 120,
                  height: 160,
                },
              },
            })} />
          </CardActionArea>
        </Grid>
        <Grid item xs={12} sm={12} md={5} lg={4}>
          <CardContent>
            <Grid container alignItems='center' sx={(theme) => ({
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              '& *': {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              },
            })}>
              <Box py={2} pl={2} maxWidth='100%'>
                <Typography variant='h5' component='div'>
                  <Box fontWeight='fontWeightBold'>{title}</Box>
                </Typography>
                <Typography variant='body1' component='div'>
                  <Box fontWeight='fontWeightMedium'>{venue}</Box>
                </Typography>
              </Box>
            </Grid>
            <Box bgcolor='#fff'>
              <Box px={2} sx={() => ({
                '& .DraftEditor-editorContainer': {
                  maxHeight: 200,
                },
              })}>
                {description.length > 0 && (
                  <DraftEditor
                    readOnly
                    toolbarHidden
                    description={getDescription(description)}
                  />
                )}
              </Box>
              <Box py={4}>
                <Grid container justifyContent='space-evenly'>
                  <Grid
                    item
                    container
                    xs={5}
                    alignItems='center'
                    justifyContent='center'
                    wrap='nowrap'
                  >
                    <Box maxWidth={24}>
                      <Image src={maleSVG} alt='Male Icon' style={{ width: '100%' }} />
                    </Box>
                    <Typography variant='body2' component='div'>
                      <Box ml={2} fontWeight='fontWeightBold'>
                        {getRemainingTicketsText(menAvailableTickets)}
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid>
                    <Divider sx={{ height: '100%', width: 1 }} />
                  </Grid>
                  <Grid
                    item
                    container
                    xs={5}
                    alignItems='center'
                    justifyContent='center'
                    wrap='nowrap'
                  >
                    <Box maxWidth={26}>
                      <Image src={femaleSVG} alt='Female Icon' style={{ width: '100%' }} />
                    </Box>
                    <Typography variant='body2' component='div'>
                      <Box ml={2} fontWeight='fontWeightBold'>
                        {getRemainingTicketsText(womenAvailableTickets)}
                      </Box>
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <Box pb={2} paddingLeft={2} paddingRight={2}>
                <Grid container>
                  <Grid item xs>
                    <Box textAlign='center'>
                      <Typography variant='body1' component='div'>
                        <Box fontWeight='fontWeightBold'>Date</Box>
                      </Typography>
                      <Typography variant='body2' component='p'>
                        {dateTime ? getFormattedDate(dateTime) : null}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid>
                    <Divider sx={{ height: '100%', width: 1 }} />
                  </Grid>
                  <Grid item xs>
                    <Box textAlign='center'>
                      <Typography variant='body1' component='div'>
                        <Box fontWeight='fontWeightBold'>Age Range</Box>
                      </Typography>
                      <Typography variant='h6'>
                        {ageRangeFrom}-{ageRangeTo}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid>
                    <Divider sx={{ height: '100%', width: 1 }} />
                  </Grid>
                  <Grid item xs>
                    <Box textAlign='center'>
                      <Typography variant='body1' component='div'>
                        <Box fontWeight='fontWeightBold'>Price</Box>
                      </Typography>
                      <Typography variant='h6'>
                        {POUND_SYMBOL}
                        {ticketPrice}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <CardActions>
                <Box p={2}>
                  <Button
                    fullWidth
                    variant='contained'
                    color='primary'
                    endIcon={<ArrowRightAlt />}
                    onClick={() => Router.push(`${routes.events}/${getEventUrlFromTitleDate(title, dateTime)}`)}
                  >
                    Book Now
                  </Button>
                </Box>
              </CardActions>
            </Box>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  )
}