import React, { useEffect, useState } from 'react';
import { Box, Container } from "@mui/material";
import { routes } from '../src/routes';
import { useRouter } from 'next/router';


export default function Thankyou() {

  //const { id } = useParams(); // use for google analytic

  useEffect(() => {
    /*
    if (!id) {
      return history.replace(routes.thankyou);
    }

    const snapshot = await firestore.collection('orders')
      .where('id', '==', id)
      .get();

    if (snapshot.empty) {
      console.error('order does not exist!');
      history.replace(routes.thankyou);
    }
    else {
      const order = snapshot.docs[0].data()
      window.gtag('event', 'purchase', {
        "transaction_id": id,
        "value": order.amount/1000,
        "currency": order.currency,
        "eventId": order.eventId,
        "nrOfTickets": order.nrOfTickets,
        "isLivePayment" : order.livemode      
      });  
      
      window.gtag('event', 'user_purchase', {
        "transaction_id": id,
        "value": order.amount/1000,
        "currency": order.currency,
        "eventId": order.eventId,
        "nrOfTickets": order.nrOfTickets,
        "isLivePayment" : order.livemode      
      });  
    }
    */
  }, []);
    //}, [id]);

  return (
    <>
      <section style={{ backgroundColor: '#DD0713', color: 'whitesmoke' }}>
        <Box py={10}>
          <Box textAlign='center'>
            <h2>- BOOKING CONFIRMATION -</h2>
          </Box>
        </Box>
      </section>
      <Container>
        <Box py={10}>
          <Box textAlign='center'>
            <h3>We can confirm that your booking has been successful.</h3>
            <br />
            <br />
            <h3>A confirmation email will be sent to you shortly.</h3>
            <br />
            <br />
            <h3>If you have any issues, please contact us using the details below.</h3>
          </Box>
        </Box>
      </Container>
      <Container style={{ paddingTop: '4rem' }}>
        <Box sx={(theme) => ({
             display: 'flex',
             justifyContent: 'space-evenly',
             alignItems: 'flex-start',
             flexWrap: 'wrap',
             rowGap: '15px',
        })}>
          <Box sx={(theme) => ({
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
          })}>
            <div>Email</div>
            <div>contact@truedating.co.uk</div>
          </Box>
          <Box sx={(theme) => ({
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
          })}>
            <div>Phone Number</div>
            <div>07543662855</div>
          </Box>
          <Box sx={(theme) => ({
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
          })}>
            <div>Office Hours</div>
            <div>Monday - Saturday</div>
            <div> 9am - 7pm</div>
          </Box>
        </Box>
      </Container>
    </>
  );
}