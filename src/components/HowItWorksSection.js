import Image from 'next/image';
import React, { useState } from 'react';
import { Box, Container, Link } from '@mui/material';
import { alpha } from '@mui/system';
import ReactPlayer from 'react-player/lazy';

import { TRUE_DATING_VIDEO_URL } from '../constants';
import { FaPlay } from 'react-icons/fa';

import theme from '../theme';

import howItWorksBg from '../../public/images/how_speed_image_optimized.jpg';
import findPerfectMatch from '../../public/images/17ce6ea7-e8ff-89be-17dc-0932cbae0543-min.jpg';
import { routes } from '../routes';


export default function HowItWorksSection({ bgColor = '#fff' }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id='how_speed' style={{ backgroundColor: bgColor }}>
      <Container>
        <div className='row'>
          <div className='six-col column match_height'>
            <div className='content'>
              <Box pb={2}>
                <h2>
                  How Speed
                  <span>
                    <strong>Dating Works</strong>
                  </span>
                </h2>
              </Box>
              <p>
                <strong>Speed Dating London</strong> quite simply gives you the chance to meet up to 15 dates, each lasting around five minutes, plenty of time to see if there's a spark. Girls stay at the same table and guys rotate. Working, successful professionals, make up most of our attendees at Speed Dating London. People who are sick of swiping and looking for something long term. The following day you'll be able to enter your matches and hopefully arrange date #2 via our secure messaging service.
                <br /><br />Check out our video here to learn more about how <Link href={routes.events} sx={(theme) => ({
                  color: theme.palette.primary.main,
                })}>speed dating events</Link> work.
              </p>
            </div>
          </div>
          <div className='six-col column section-bg match_height'>
            <Box sx={(theme) => ({
              width: '100%',
              height: '100%',
              maxHeight: 400,
              borderRadius: theme.shape.borderRadius,
              [theme.breakpoints.down('lg')]: {
                height: isPlaying ? '100%': theme.spacing(100),
              },
              '& .react-player__preview': {
                backgroundColor: 'red',
                borderRadius: theme.shape.borderRadius,
                boxShadow: theme.shadows[2],
                overflow: 'hidden',
                position: 'relative'
              }
            })}>
              <ReactPlayer
                playing={isPlaying}
                url={TRUE_DATING_VIDEO_URL}
                light={<Image
                  src={howItWorksBg}
                  alt='How it works'
                  fill
                  style={{objectFit: "cover"}}	
                  placeholder='blur'
                  sizes="(max-width: 1112px) 100vw, 50vw"
                />}
                width='100%'
                height='100%'
                controls={true}
                playIcon={
                  <FaPlay onClick={() => setIsPlaying(true)} style={{
                    fontSize: 90,
                    color: alpha(theme.palette.primary.main, 0.9),
                    textShadow: theme.shadows[4],
                    '&:hover': {
                      transform: 'scale(0.9)',
                    },
                    transition: theme.transitions.create(['transform']),
                    position: 'absolute'
                  }} />
                }
                config={{
                  file: {
                    attributes: {
                      controlsList: 'nodownload',
                    },
                  },
                }}
                // Disable right click
                onContextMenu={(e) => e.preventDefault()}
              />
            </Box>
          </div>
        </div>
        <Box className="row" sx={(theme) => ({
          maxWidth: 'auto',
          [theme.breakpoints.down('sm')]: {
            marginTop: `30px !important`,
            flexDirection: 'column-reverse !important',
          },
        })}>
          <Box className="four-col column section-bg match_height" sx={(theme) => ({
            [theme.breakpoints.down('sm')]: {
              minHeight: 'auto !important',
            },
            '& img': {
              maxWidth: '100%',
              width: 'auto',
              maxHeight: 400,
              boxShadow: theme.shadows[2],
              [theme.breakpoints.down('sm')]: {
                display: 'block',
                maxWidth: 500,
                marginTop: 20,
                width: '100%',
              },
            }
          })}>
            <Image style={{marginTop: 10}} src={findPerfectMatch} alt='Find Perfect Match' />
          </Box>
          <div className='eight-col column match_height'>
            <div className='content howItWorks'>
              <Box pb={2}>
                <h2>
                  Find Your Perfect <br /> Match at
                  <span>
                    <strong>Speed Dating</strong>
                  </span>
                </h2>
              </Box>
              <p>
                Welcome to True Dating, the ultimate destination for London singletons looking for love!
              </p>
              <br />
              <p>
                Has looking for love in London been a struggle? Endless swiping and a multitude of pointless dates can leave you wanting to throw in the dating towel. Which is why our site is specifically tailored to the unique dating needs of Londoners, focusing on connecting singles in the city who are yearning for meaningful relationships.
              </p>
              <br />
              <p>
                Our easy-to-use platform makes it quick and effortless to search for your desired <Link href={routes.events} sx={(theme) => ({
                  color: theme.palette.primary.main,
                })}>speed dating events</Link>, whether you're looking for a specific age range or location.
              </p>
              <br />
              <p>
                With a wide range of features and events, including <strong>single parties</strong> and <strong>speed dating in London</strong>, True Dating gives you the perfect place to help you find your perfect match.
              </p>

              <br />
            </div>
          </div>

        </Box>

      </Container>

    </section>
  );
}
