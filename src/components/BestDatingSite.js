import React from 'react';
import { Box, Container, Link } from '@mui/material';
import { routes } from '../routes';

import howSpeed from '../../public/images/179aebc3-8f95-864c-0327-1e69ba500433-min.jpg'
import Image from 'next/image';


export default function BestDatingSite({ bgColor = '#fff' }) {
  return (
    <section id='how_speed' style={{ backgroundColor: bgColor }}>
      <Container>
        <div className='row'>
          <div className='six-col column match_height'>
            <div className='content'>
              <Box pb={2}>
                <h2>
                  Best Dating Site in London               
                </h2>
              </Box>
              <p>
                Take full advantage of the chance to ignite your love life at True Dating. Check out our upcoming <Link sx={(theme) => ({
                    color: theme.palette.primary.main,
                })} href={routes.londonBridge} underline='none'>speed dating London Bridge</Link> events or different locations across London and reserve your spot today! We have hosted hundreds of events since we formed in 2019 and matched 1000's of couples at our events. We pride ourselves on knowing how to host the perfect singles event that translates into genuine, long-lasting connections. 
              </p>
            </div>
          </div>
          <div className='six-col column section-bg match_height eventSEOContainer'>
            <Image style={{width: '100%'}} src={howSpeed} alt="How Speed" placeholder="blur" sizes="(max-width: 1150px) 100vw, 50vw"/>
          </div>
        </div> 
      </Container>
     
    </section>
  );
}
