import { Box, Container, Link } from "@mui/material";
import Head from "next/head";

export default function TermsOfService() {
  return (
    <Container>
      <Head>
        <title>Booking Terms and Conditions | True Dating</title>
        <meta name="description" content="Check out the terms of service and booking at True Dating. Want to book an event? Get a detailed understanding of cancellations, non-refundable purchases, etc.!" />
        <meta name='keywords' content='Terms and Conditions' />
      </Head>
      <Box py={10} sx={{
        '& li': {
          listStylePosition: 'inside',
        },
      }}>
        <Box textAlign={'center'}>
          <h1>Booking Terms and Conditions</h1>
        </Box>
        <br />
        <p>
          If you decide to book a True Dating event, you are registering your acceptance of our
          terms & conditions and privacy policy (which can find on your website)
        </p>
        <br />
        <p>
          By entering into this agreement you are agreeing to abide by all of the terms & conditions
          set out by True Dating as well as their rules and procedures during the events.
        </p>
        <br />
        <p>
          If you fail to attend an event at the published start time or leave an event early, this
          will result in the forfeiture of your tickets. Each events start time will be clearly
          stated on our website and subsequent confirmation emails will be sent to each attendee.
          Please be on time in consideration to the other attendees and to avoid potentially missing
          the event.
        </p>
        <br />
        <p>Ticket purchases, including advance ticket credit purchases are non-refundable.</p>
        <br />
        <ul>
          <li>
            Cancellations or booking change requests must be received at least 72 hours prior to the event start time. Within this window we are able to offer you a credit to attend another available event of the same value as your original booking. We can only accept one change request per booking
          </li>
          <br />
          <li>
            Booking name changes and direct substitutions can be made up to 5 pm on the day of the
            event by contacting us by email:{' '}
            <Link href='mailto:contact@truedating.co.uk'>contact@truedating.co.uk</Link>.
          </li>
          <br />
          <li>
            Under extremely exceptional circumstances, venues are subject to change or cancellation
            at any time prior to the event start time on the day of the event.
          </li>
          <br />
          <li>
            Our free event guarantee only applies after your first speed dating or singles party event. If you do not claim this free event after this time the offer will be invalid. Discounted tickets and special offers are excluded from this offer.
          </li>
          <br />
          <li>
            Should we have to cancel an event for any reason outside of our control tickets will not
            be refunded. Instead, a credit for the same monetary value will be issued. Credits can
            be redeemed against any standard speed dating events on our rolling programme as listed
            on our website. There is a six month time limit for redeeming these credits.
          </li>
          <br />
          <li>
            Unfortunately True Dating can’t guarantee you will meet a specific number of attendees
            at a given event or that there will be an equal number of male and female guests
            attending or that attendees will meet specific age criteria. However we will always try
            to make sure the male to female ratio is equal and if there is a lop sided event we will
            offer a free credit for a future event.
          </li>
          <br />
          <li>
            True Dating hosts it's events at venues that are independently owned and run. Therefore
            for any damages suffered, physical or otherwise, you agree that True Dating and its
            associates cannot be held responsible or liable.
          </li>
          <br />
          <li>
            By purchasing tickets and or participating in a True Dating event you agree that neither
            True Dating or it's staff or associates is liable for any damages, direct or indirect,
            that may arise from partaking in True Dating services. This includes any damages,
            without limitation, arising out of communicating with other participants registered with
            True Dating. Such damages include, without limitation, physical damages, bodily injury
            and or emotional distress and discomfort.
          </li>
          <br />
          <li>
            True Dating can take no responsibility for the safety and security of your personal
            belongings whilst attending an event.
          </li>
          <br />
          <li>
            True Dating cannot verify the identity or background of any participant at our events.
            We ask you to approach any meeting with any participant of an True Dating event with the
            same caution that you would exercise in any other situation.
          </li>
          <br />
        </ul>
        <br />
        <h2>Website and mobile applications</h2>
        <br />
        <ul>
          <li>
            The material in this website is provided for your general information only. True Dating
            accepts no responsibility for loss occasioned as a result of reliance placed on any
            parts of the contents of this website and makes no warranty as to the accuracy of any
            such information or content. Your use of the True Dating website is governed by the
            conditions outlined and by progressing beyond any entry page you are deemed to accept
            those conditions.
          </li>
        </ul>
        <br />
        <br />
        <h2>Copyright and Reproduction Notices</h2>
        <br />
        <ul>
          <li>
            This website may contain other proprietary notices (such as moral rights and trade mark
            notices) and copyright information, the terms of which must be observed and followed.
          </li>
          <br />
          <li>
            Unless otherwise stated, all of the content of this website is copyright of True Dating.
          </li>
          <br />
          <li>
            You may download to a local hard disk and print extracts from this website only for
            personal use and information. You may duplicate downloaded extracts from this website to
            others for their personal use only. In particular, none of the content of this website
            may be copied or in any way incorporated into any other website, database, publication
            or other work in any form whatsoever.
          </li>
          <br />
        </ul>
        <br />
        <h2>Disclaimers</h2>
        <br />
        <ul>
          <li>
            True Dating makes no representations or warranties whatsoever about any of the content
            of this website or about the content of any other website which you may access by
            hypertext link through this website. When you access any other website by means of a
            link from this website you should understand that your access to that other website is
            independent of the True Dating and True Dating has no control over the content of the
            web site, nor does True Dating in any way endorse or approve the content of that
            website. In no event will True Dating be liable to you or any other person for loss or
            damage (whether direct, indirect, special or other) for any use of this website or of
            any site linked to it by means of hypertext or otherwise.
          </li>
        </ul>

        <br />
        <br />
        <h2>Legal Disclaimer</h2>
        <br />
        <p>
          True Dating is solely a dating events company. We are not a dating website or dating
          service. We work alongside a bespoke matchmaking service, for more information please
          contact us.
        </p>
        <br />
        <p>
          Our events and online messaging systems is designed to provide a safe and easy way to meet
          and communicate with people. We pride ourselves on hosting well organised, fun and
          reasonably priced events which are proactive in helping our clients find potential
          matches.
        </p>
      </Box>
    </Container>
  )
}
