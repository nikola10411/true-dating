require('dotenv').config();

const cors = require('cors');
const express = require('express');
const app = express();
const DEV_MODE = process.env.ENV === 'dev';

// Automatically allow cross-origin requests in dev
// change/delete ENV variable when going to production
app.use(cors({ origin: DEV_MODE ? true : process.env.ORIGIN }));
app.use(express.json());

const functions = require('firebase-functions');
const admin = require('firebase-admin');
// change the secret key when going live
const stripe = require('stripe')(DEV_MODE ? process.env.STRIPE_SK_DEV : process.env.STRIPE_SK);

const MEMBERSHIP_1_MONTH = 'MEMBERSHIP_1_MONTH';
const MEMBERSHIP_3_MONTHS = 'MEMBERSHIP_3_MONTHS';
const MEMBERSHIP_6_MONTHS = 'MEMBERSHIP_6_MONTHS';

const serviceAccount = require(__dirname +
  (DEV_MODE
    ? '/true-dating-dev-firebase-adminsdk-elm9v-1fd2782fc8.json'
    : '/true-dating-ff8ed-firebase-adminsdk-ohqs7-f8af3ac4df.json'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firestore = admin.firestore();
const nodemailer = require('nodemailer');

const SUPPORT_ACCOUNT = {
  user: process.env.SUPPORT_ACCOUNT_EMAIL,
  pass: process.env.SUPPORT_ACCOUNT_PASSWORD,
};

// const SUPPORT_ACCOUNT = {
//   user: 'apikey',
//   pass: process.env.SENDGRID_API_KEY,
// };

//// create and config transporter
// this transporter used sendgrid but was dropping messaged due to DMCA config error.. domain different than original
/*
const transporter = nodemailer.createTransport({
  service: 'smtp', //'gmail' 
  host: 'smtp.sendgrid.net', //'smtp.gmail.com',
  port: 587, // 187
  secure: false, // true for 465, false for other ports
  auth: SUPPORT_ACCOUNT,
});
*/

// app password gmail node mailer

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'contact@truedating.co.uk',
    pass: 'jrwkxqrslnhbqaqm',
  },
});


const icons = `
    <span>
      <a href="https://www.facebook.com/londondateevents">
        <img src="https://img.icons8.com/ios-glyphs/24/000000/facebook-new.png" />
      </a>
      <a href="https://twitter.com/TrueDating1">
        <img src="https://img.icons8.com/material-rounded/24/000000/twitter.png" />
      </a>
      <a href="https://www.instagram.com/true.dating/">
        <img src="https://img.icons8.com/material-rounded/24/000000/instagram-new.png" />
      </a>
    </span>
  `;

// verify connection configuration
// transporter.verify(function (error, success) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Server is ready to take our messages');
//   }
// });

const { inviteExistingUser } = require('./templates/inviteExistingUser');
const { inviteNewUser } = require('./templates/inviteNewUser');
const { log } = require('firebase-functions/lib/logger');
const { confirmation } = require('./templates/confirmation');
const { afterEventTemplate } = require('./templates/afterEvent');
const { eventReminder } = require('./templates/eventReminder');
const { enterMatchesReminder } = require('./templates/enterMatchesReminder');
const { matchesAreLiveTemplate } = require('./templates/matchesAreLiveTemplate');
const { membershipConfirmation } = require('./templates/membershipConfirmation');
const { unreadMessageTemplate } = require('./templates/unreadMessageTemplate');
const { subscribeTemplate } = require('./templates/subscribeTemplate');
const { contactForm } = require('./templates/contactForm');
const { getFullName } = require('./utils/fullName');
const { getDateTime } = require('./utils/date');

const getUserByEmail = (email) =>
  firestore
    .collection('users')
    .where('email', '==', email)
    .limit(1)
    .get()
    .then(({ docs }) => (docs.length ? docs[0].data() : null));

const updateEventDoc = async (eventId, invitedUser) => {
  const { email } = invitedUser;
  const eventRef = firestore.collection('events').doc(eventId);
  await firestore.runTransaction(async (transaction) => {
    const eventDoc = await transaction.get(eventRef);
    if (eventDoc.exists) {
      const { participants = [], menAvailableTickets, womenAvailableTickets } = eventDoc.data();
      transaction.update(eventRef, {
        participants: [
          ...participants.filter((p) => p.email !== email),
          { ...invitedUser, invitation: 'sent' },
        ],
        menAvailableTickets:
          invitedUser.gender === 'M' ? menAvailableTickets - 1 : menAvailableTickets,
        womenAvailableTickets:
          invitedUser.gender === 'F' ? womenAvailableTickets - 1 : womenAvailableTickets,
      });
    }
  });
};

// test endpoint
app.get('/', (req, res) => {
  res.status(200).send();
});


// migration to add lowercase title for event search
// app.get('/event-update', async (req, res) => {
//   const eventRef = await firestore.collection('events').get()   

//   eventRef.docs.forEach((doc) => {
//     firestore.collection('events').doc(doc.id).update({
//       lowercaseTitle: doc.data().title.toLowerCase()
//     })
//   }) 
     
//   res.status(200).send();
// });



/**
 * Send email to user once become a paid membership
 */
exports.sendMembershipConfirmEmail = functions.firestore
  .document('paidMembership/{membershipOrder}')
  .onCreate(async (snapshot, context) => {
    const {
      billing_details: { email, name },
      membershipType,
      amount,
    } = snapshot.data();


    let membershipTitle = ''
    switch(membershipType) {
      case MEMBERSHIP_1_MONTH: {
        membershipTitle = 'One Month';
        break;
      }
      case MEMBERSHIP_3_MONTHS: {
        membershipTitle = '3 Months';
        break;
      }
      case MEMBERSHIP_6_MONTHS: {
        membershipTitle = '6 Months';
        break;
      }
      default: {
      }
    }


    try {     
      const mailOptions = {
        from: `True Dating <noreply.${SUPPORT_ACCOUNT.user}>`,
        to: email,
        subject: 'Your Membership Booking Confirmation',
        html: membershipConfirmation({
          displayName: name,
          email,
          membershipTitle,
          amount: amount,
          icons: icons,
        }),
        attachments: [
          {
            filename: 'logo.jpg',
            path: __dirname + '/images/logo.jpg',
            cid: 'logo', //same cid value as in the html img src
          },
        ],
        replyTo: `noreply.${SUPPORT_ACCOUNT.user}`,
      };

      return transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
          functions.logger.log(`Error in getting customer1 ${error}`)
          return log(`Error in getting customer1 ${error}`);
        }

        functions.logger.log(`Successfully sent to ${email}`);
        return log(`Successfully sent to ${email}`);        
      });
    }
    catch (error) {
        functions.logger.log(`Error in getting customer ${error}`)
        return log(`Error in getting customer ${error}` );
    }
})


/**
 * Get current customer on stripe
 * Need to get prev payment id for card
 */
 app.get('/currentCust/:userEmail', async (req, res) => {
  try {
    const email = req.params.userEmail
    const customers = await stripe.customers.list({
      limit: 1,
      email
    });
    if (customers.data.length > 0) {
      const paymentMethods = await stripe.paymentMethods.list({
        'customer': customers.data[0].id,
        type: 'card'
      });

      let card = null
      if (paymentMethods.data.length > 0 ) {
        card = { id: paymentMethods.data[0].id,  last4: paymentMethods.data[0].card.last4, brand: paymentMethods.data[0].card.brand }
      }
      res.status(200).send({customerExist: true, customerID: customers.data[0].id, card });
    } else {
      res.status(200).send({ customerExist: false });
    }
  }
  catch (error) {
    return res.set(500).send({ message: `Error in getting customer` });

//    return res.set(500).send({ message: error.message });
  }
})

/**
 * Createt customer on stripe
 * Pass payment id
 * @body {userEmail, firstName, paymentMethodID }
 */
 app.post('/createStrCust', async (req, res) => {
  try {
    const currentUserEmail = req.body.userEmail;
    const currentUserName = req.body.firstName;
    const paymentMethodID = req.body.paymentMethodID;
    const customer = await stripe.customers.create({
      email: currentUserEmail,
      name: currentUserName,
      payment_method: paymentMethodID
    });
    res.status(200).send(customer);
  }
  catch {
    return res.set(500).send({ message: `Error in creating customer` });
  }
})

/**
 * @inviteUser controller
 * @body {email, firstName, lastName, gender, phoneNumber }
 */
app.post('/inviteUser', async (req, res) => {
  const invitedUser = req.body.user;
  const eventId = req.body.eventId;

  if (!eventId || !invitedUser) {
    return res.set(404).send({ message: 'No event or user provided' });
  }

  const eventRef = firestore.collection('events').doc(eventId);
  const eventSnaphot = await eventRef.get();
  if (!eventSnaphot.exists) {
    return res.set(400).send({ message: 'This event does not exist!' });
  }

  const eventData = eventSnaphot.data();
  const { participants = [] } = eventData;
  const participant = participants.find((p) => p.email === invitedUser.email);
  if (participant && participant.invitation === 'sent') {
    return res.set(400).send({ message: `${invitedUser.email} is already invited to this event` });
  }

  let user = null;

  try {
    user = await getUserByEmail(invitedUser.email);
  } catch (error) {
    console.log(error.message);
  }

  if (user) {
    // invite only
    try {
      const { firstName, lastName, email } = user;

      const mailOptions = {
        from: `True Dating <noreply.${SUPPORT_ACCOUNT.user}>`,
        to: email,
        subject: "You've Been Invited!",
        html: inviteExistingUser(getFullName(firstName, lastName), email, eventData, icons),
        attachments: [
          {
            filename: 'logo.jpg',
            path: __dirname + '/images/logo.jpg',
            cid: 'logo', //same cid value as in the html img src
          },
        ],
        replyTo: `noreply.${SUPPORT_ACCOUNT.user}`,
      };

      return transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
          return res.status(500).send({
            message: error.toString(),
          });
        }

        await updateEventDoc(eventId, invitedUser);

        return res.status(200).send({
          message: `Successfully invited ${email}`,
        });
      });
    } catch (error) {
      console.log('Could not invite user: ', error.message);
      return res.set(500).send({ message: error.message });
    }
  } else {
    // create and invite
    try {
      const { email, firstName, lastName, gender, phoneNumber = null } = invitedUser;
      const password = '123Dating';

      const uid = (
        await admin.auth().createUser({
          email,
          password,
        })
      ).uid;

      // create user document
      await firestore.collection('users').doc(uid).set({
        email,
        firstName,
        lastName,
        gender,
        phoneNumber,
        photoURL: null,
        createdAt: new Date(),
      });

      const mailOptions = {
        from: `True Dating <noreply.${SUPPORT_ACCOUNT.user}>`,
        to: email,
        subject: "You've been invited!",
        html: inviteNewUser(getFullName(firstName, lastName), email, password, eventData, icons),
        attachments: [
          {
            filename: 'logo.jpg',
            path: __dirname + '/images/logo.jpg',
            cid: 'logo', // same cid value as in the html img src
          },
        ],
        replyTo: `noreply.${SUPPORT_ACCOUNT.user}`,
      };

      return transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
          return res.status(500).send({
            message: error.toString(),
          });
        }

        await updateEventDoc(eventId, invitedUser);

        return res.status(200).send({
          message: `Successfully created and invited ${email}`,
        });
      });
    } catch (error) {
      return res.set(500).send({ message: `Could not invite user:  ${invitedUser.email}` });
    }
  }
});

const calculateOrderAmount = (nrOfTickets, ticketPrice, discountPercent) => {
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  // price * 100 because amount is in the lowest denomination

  return nrOfTickets * (ticketPrice * 100) * (100 - discountPercent) / 100;
};

app.post('/createPaymentIntent', async (req, res) => {
  const { nrOfTickets, eventId, discountCode, customerID} = req.body;

  if (!nrOfTickets || !eventId) {
    return res.status(400).send({ error: 'Missing nrOfTickets or eventId' });
  }

  const event = (await firestore.collection('events').doc(eventId).get()).data();
  if (!event) {
    return res.status(404).send({ error: 'Event not found!' });
  }

  let discountPercent = 0;

  if (event.discountCodes && discountCode) {
    const discount = event.discountCodes.find((eventDiscountCode => eventDiscountCode.code === discountCode))
    if (discount) {
      discountPercent = discount.percent
    }
  }

  
  try {
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(nrOfTickets, event.ticketPrice, discountPercent),
      currency: 'GBP',
      customer: customerID
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.post('/contactFormSubmit', async (req, res) => {
  const { name, email, phone = '', message } = req.body;
  if (!name || !email) {
    return res.set(400).send('Missing name or email');
  }

  const mailOptions = {
    from: `True Dating <${SUPPORT_ACCOUNT.user}>`,
    to: SUPPORT_ACCOUNT.user,
    subject: 'New Message from True Dating contact form',
    html: contactForm({ name, email, phone, message }),
    attachments: [
      {
        filename: 'logo.jpg',
        path: __dirname + '/images/logo.jpg',
        cid: 'logo', //same cid value as in the html img src
      },
    ],
    replyTo: `${email}`,
  };

  return transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
      log(error.message);
      return res.set(500).send(error);
    }

    const successMessage = `Successfully notified ${SUPPORT_ACCOUNT.user}`;
    log(successMessage);
    return res.set(200).send(successMessage);
  });
});

app.post('/createMembershipPaymentIntent', async (req, res) => {
  const { customerID, membershipType } = req.body;

  let orderAmount = 0
  switch(membershipType) {
    case MEMBERSHIP_1_MONTH: {
      orderAmount = 5000;
      break;
    }
    case MEMBERSHIP_3_MONTHS: {
      orderAmount = 10000;
      break;
    }
    case MEMBERSHIP_6_MONTHS: {
      orderAmount = 15000;
      break;
    }
    default: {
      return res.status(400).send({ error: 'Sub not found' });
    }
  } 

  try {
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: orderAmount,
      currency: 'GBP',
      customer: customerID
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Listen for new orders
exports.sendConfirmationEmail = functions.firestore
  .document('orders/{orderId}')
  .onCreate(async (snapshot, context) => {
    const {
      eventId,
      billing_details: { email, name },
      amount,
      nrOfTickets,
    } = snapshot.data();

    const event = (await firestore.collection('events').doc(eventId).get()).data();

    if (!event) {
      return log('Event not found');
    }

    const mailOptions = {
      from: `True Dating <noreply.${SUPPORT_ACCOUNT.user}>`,
      to: email,
      subject: 'Your True Dating Order Confirmation',
      html: confirmation({
        displayName: name,
        email,
        event,
        amount: amount / 100,
        nrOfTickets,
        icons: icons,
      }),
      attachments: [
        {
          filename: 'logo.jpg',
          path: __dirname + '/images/logo.jpg',
          cid: 'logo', //same cid value as in the html img src
        },
      ],
      replyTo: `noreply.${SUPPORT_ACCOUNT.user}`,
    };

    return transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        return log(error.message);
      }
      
      return log(`Successfully sent to ${email}`);
    });
  });

const createMatch = (user1, user2, matchType) =>
  firestore.collection('matches').add({
    users: [user1, user2],
    matchType,
    seenBy: [],
    createdAt: new Date(),
  });

const updateMatch = (matchId, matchType) =>
  firestore.collection('matches').doc(matchId).update({ matchType });

const checkMatching = async (user1, user2, matchType) => {
  const docs = (await firestore.collection('matches').get()).docs;

  if (docs.length) {
    const allMatches = docs.map((d) => ({ id: d.id, ...d.data() }));
    const currentMatch = allMatches.find((m) => {
      const users = m.users;
      return users.includes(user1) && users.includes(user2);
    });

    if (currentMatch) {
      if (currentMatch.matchType !== matchType) {
        await updateMatch(currentMatch.id, matchType);
        log('UPDATING EXISTING MATCH');
        return;
      } else {
        // the matching remains unchanged
        return;
      }
    }
  }

  // is new match
  await createMatch(user1, user2, matchType);
  log('NEW MATCH CREATED');
};

// Listen for new votes
exports.checkForMatches = functions.firestore
  .document('eventVotes/{eventVoteId}')
  .onCreate(async (snapshot, context) => {
    const { eventId, user, votes: myVotes } = snapshot.data();

    // get all votes beside mine for this eventId
    const otherPeopleVotes = (
      await firestore
        .collection('eventVotes')
        .where('eventId', '==', eventId)
        .where('user', '!=', user)
        .get()
    ).docs.map((doc) => doc.data());

    if (!otherPeopleVotes.length) {
      return;
    }

    // check if someone voted me
    otherPeopleVotes.forEach(async (voteDoc) => {
      const votedMe = voteDoc.votes.find((v) => v.user === user);

      if (votedMe) {
        // check if I voted them
        const myVote = myVotes.find((v) => v.user === voteDoc.user);

        // check if it is a match
        if (myVote) {
          const ROMANTIC = 1;
          const FRIEND = 2;
          const NOT_MY_TYPE = 3;
          const voteValues = [votedMe.value, myVote.value];

          switch (true) {
            case voteValues.every((v) => v === ROMANTIC): {
              // check/create/update this romantic match
              await checkMatching(user, voteDoc.user, 1);
              log('ROMANTIC MATCH');
              return;
            }

            case (voteValues.includes(ROMANTIC) && voteValues.includes(FRIEND)) ||
              voteValues.every((v) => v === FRIEND): {
              // check/create/update this friendship match
              await checkMatching(user, voteDoc.user, 2);
              log('FRIEND MATCH');
              return;
            }

            case voteValues.includes(NOT_MY_TYPE): {
              /**
               * @TODO - need clarification here
               * if we need to unmatch an existing match
               */
              return;
            }

            default: {
              // do nothing
              return;
            }
          }
        }
      }
    });

    // check if this is the last vote
    // send notification emails
    // add votingPeriodEnded flag
    const eventRef = firestore.collection('events').doc(eventId);
    const { participants } = (await eventRef.get()).data();
    const allAttenders = participants.filter((p) => p.attended).map(({ email }) => email);
    const allHaveVoted = allAttenders.every((u) =>
      [...otherPeopleVotes.map((v) => v.user), user].includes(u)
    );

    if (allHaveVoted) {
      // set votingPeriodEnded flag
      log('VOTING PERIOD ENDED FOR EVENT ' + eventId);
      eventRef.update({ votingPeriodEnded: true, notifiedUsers: false });
    }
  });

const sendAfterEventNotification = async (user) => {
  const mailOptions = {
    from: `True Dating <noreply.${SUPPORT_ACCOUNT.user}>`,
    to: user.email,
    subject: 'Your Matches Are Live!',
    html: afterEventTemplate(user, icons),
    attachments: [
      {
        filename: 'logo.jpg',
        path: __dirname + '/images/logo.jpg',
        cid: 'logo', //same cid value as in the html img src
      },
    ],
    replyTo: `noreply.${SUPPORT_ACCOUNT.user}`,
  };

  return transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
      log(error.message);
      return;
    }

    log(`Successfully notified ${user.email}`);
  });
};

exports.onVotingPeriodEnd = functions.firestore
  .document('events/{eventId}')
  .onUpdate(async (snapshot, context) => {
    const { votingPeriodEnded, notifiedUsers, participants } = snapshot.after.data();
    if (votingPeriodEnded && !notifiedUsers) {
      const attenders = participants.filter((p) => p.attended);
      if (attenders.length) {
        attenders.forEach((user) => {
          sendAfterEventNotification(user);
        });
        snapshot.after.ref.update({ notifiedUsers: true });
        log(
          'Sending notifications to: ',
          attenders.map((a) => a.email)
        );
      }
    }
  });

// clean up user data
exports.onUserDelete = functions.auth
  .user()
  .onDelete((user) => firestore.collection('users').doc(user.uid).delete());

// this will check everyday at 4pm UK time
// if there was an event on the previous day
// and it will set the flag *votingPeriodEnded to true
// for that particular event
// *this will trigger notifications via email
exports.scheduledVotingPeriodEnd = functions.pubsub
  .schedule('0 9 * * *')
  .timeZone(process.env.TZ)
  .onRun(async (context) => {
    log(process.env.TZ);

    const eventDocs = (await firestore.collection('events').get()).docs;

    if (!eventDocs.length) {
      // do nothing
      return;
    }

    // check for events that occured one day before
    const yesterdayEvents = eventDocs.filter((e) => {
      const { dateTime } = e.data();
      const eventDateTime = getDateTime(dateTime);
      eventDateTime.setUTCHours(0, 0, 0, 0);

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      yesterday.setUTCHours(0, 0, 0, 0);

      return yesterday.getTime() === eventDateTime.getTime();
    });

    // update yesterday events { votingPeriodEnded: true, notifiedUsers: false }
    // this will trigger onVotingPeriodEnd function
    if (yesterdayEvents.length) {
      yesterdayEvents.forEach((e) => {
        firestore
          .collection('events')
          .doc(e.id)
          .update({ votingPeriodEnded: true, notifiedUsers: false });
        log('VOTING PERIOD ENDED FOR ', e.data().title);
      });
    }
  });

exports.unreadMessagesEmail = functions.firestore
  .document('messages/{messageId}')
  .onCreate(async (snapshot, context) => {
    const { to, toName } = snapshot.data();
    const mailOptions = {
      from: `True Dating <noreply.${SUPPORT_ACCOUNT.user}>`,
      to: to,
      subject: 'Unread Message',
      html: unreadMessageTemplate(toName, icons),
      attachments: [
        {
          filename: 'logo.jpg',
          path: __dirname + '/images/logo.jpg',
          cid: 'logo', //same cid value as in the html img src
        },
      ],
      replyTo: `noreply.${SUPPORT_ACCOUNT.user}`,
    };

    return transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        return log(error.message);
      }

      return log(`Successfully sent unread message reminder to ${to}`);
    });
  });

exports.subscribeEmail = functions.firestore
  .document('subscribe/{subscriberId}')
  .onCreate(async (snapshot, context) => {
    const { email } = snapshot.data();
    const mailOptions = {
      from: `True Dating <noreply.${SUPPORT_ACCOUNT.user}>`,
      to: email,
      subject: 'Welcome to True Dating!',
      html: subscribeTemplate(icons),
      attachments: [
        {
          filename: 'logo.jpg',
          path: __dirname + '/images/logo.jpg',
          cid: 'logo', //same cid value as in the html img src
        },
      ],
      replyTo: `noreply.${SUPPORT_ACCOUNT.user}`,
    };

    return transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        return log(error.message);
      }

      return log(`Successfully sent subscribe reminder to ${email}`);
    });
  });

// exports.sendMatchesAreLiveEmail = functions.pubsub
//   .schedule('0 16 * * *')
//   .timeZone(process.env.TZ)
//   .onRun(async (context) => {
//     const sendMatchesAreLiveEmail = async (attendee) => {
//       const mailOptions = {
//         from: `True Dating <noreply.${SUPPORT_ACCOUNT.user}>`,
//         to: attendee.email,
//         subject: 'Matches Are Live',
//         html: matchesAreLiveTemplate(attendee.firstName, icons),
//         attachments: [
//           {
//             filename: 'logo.jpg',
//             path: __dirname + '/images/logo.jpg',
//             cid: 'logo',
//           },
//         ],
//         replyTo: `noreply.${SUPPORT_ACCOUNT.user}`,
//       };

//       log('Sending matches are live email...')
//       return transporter.sendMail(mailOptions, async (error, info) => {
//         if (error) {
//           log(error);
//           return;
//         }

//         log(`Matches are live email successfully sent to attendee ${attendee.email} ` + info.response);
//       });
//     };

//     const startDate = new Date();
//     startDate.setDate(startDate.getDate() - 1);
//     startDate.setUTCHours(0, 0, 0, 0);

//     const endDate = new Date();
//     endDate.setDate(endDate.getDate() - 1);
//     endDate.setUTCHours(23,59,59,59);

//     const collection = firestore.collection('events')
//     .where("dateTime", ">", startDate)
//     .where("dateTime", "<", endDate);

//     const snapShot = await collection.get();
//     if (!snapShot.empty) {
//       snapShot.docs.forEach((doc) => {
//         const participants = doc.data().participants;
//         participants.forEach((participant) => {
//           sendMatchesAreLiveEmail(participant)
//         });
//       });
//     } else {
//       log('No events yesterday to send match reminders');
//     }
// });

exports.enterMatchesReminder = functions.pubsub
  .schedule('0 5 * * *')
  .timeZone(process.env.TZ)
  .onRun(async () => {
    const sendEnterMatchesReminder = async (attendee) => {
      const mailOptions = {
        from: `True Dating <noreply.${SUPPORT_ACCOUNT.user}>`,
        to: attendee.email,
        subject: 'Enter Your Matches Reminder',
        html: enterMatchesReminder(attendee, icons),
        attachments: [
          {
            filename: 'logo.jpg',
            path: __dirname + '/images/logo.jpg',
            cid: 'logo',
          },
        ],
        replyTo: `noreply.${SUPPORT_ACCOUNT.user}`,
      };

      log('Sending enter matches reminder...');
      return transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
          log(error);
          return;
        }

        log(`Matches reminder attendee successfully notified ${attendee.email} ` + info.response);
      });
    };

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 1);
    startDate.setUTCHours(0, 0, 0, 0);
    
    const endDate = new Date();
    endDate.setDate(endDate.getDate() - 1);
    endDate.setUTCHours(22, 59, 59, 59);
    
    const collection = firestore
      .collection('events')
      .where('dateTime', '>', startDate)
      .where('dateTime', '<', endDate);

    const snapShot = await collection.get();

    if (!snapShot.empty) {
      snapShot.docs.forEach((doc) => {
        const participants = doc.data().participants;
        participants.forEach((participant) => {
          sendEnterMatchesReminder(participant);
        });
      });
    } else {
      log('No events yesterday');
    }
  });

exports.eventReminder = functions.pubsub
  .schedule('0 5 * * *')
  .timeZone(process.env.TZ)
  .onRun(async () => {
     const sendEventReminder = async (event, attendee) => {
      const mailOptions = {
        from: `True Dating <noreply.${SUPPORT_ACCOUNT.user}>`,
        to: attendee.email,
        subject: 'Event Reminder',
        html: eventReminder(event, attendee, icons),
        attachments: [
          {
            filename: 'logo.jpg',
            path: __dirname + '/images/logo.jpg',
            cid: 'logo',
          },
        ],
        replyTo: `noreply.${SUPPORT_ACCOUNT.user}`,
      };

      log('Sending event reminder...');
      return transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
          log(error);
          return;
        } else {
          log(`Attendee successfully notified ${attendee.email} ` + info.response);
        }
      });
    };

    let startDate = new Date();
    startDate.setDate(startDate.getDate());
    startDate.setUTCHours(10, 59, 0, 0);

    let endDate = new Date();
    endDate.setDate(endDate.getDate());
    endDate.setUTCHours(22, 59, 59, 59);

    const collection = firestore
      .collection('events')
      .where('dateTime', '>', startDate)
      .where('dateTime', '<', endDate);

    const snapShot = await collection.get();

    if (!snapShot.empty) {      
      snapShot.docs.forEach((doc) => {
        const event = doc.data();
        if (event) {
          const participants = doc.data().participants;
          participants.forEach((participant) => {
            sendEventReminder(event, participant);
          });
        }
      });
    } else {
      log('No reminders to send');
    }
  });

exports.api = functions.https.onRequest(app);
