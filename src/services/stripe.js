import { API_URL } from '../constants';

export const createPaymentIntent = async (nrOfTickets, eventId, discountCode, customerID) =>
  await fetch(`${API_URL}/createPaymentIntent`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nrOfTickets,
      eventId,
      discountCode,
      customerID
    }),
  }).then((res) => res.json());

export const createMembershipPaymentIntent = async (membershipType, customerID) =>
  await fetch(`${API_URL}/createMembershipPaymentIntent`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      membershipType,
      customerID
    }),
  }).then((res) => res.json());

export const getCurrentCust = async (user) =>
  await fetch(`${API_URL}/currentCust/${user.email}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

export const createStrCust = async (userEmail, firstName, paymentMethodID) =>
  await fetch(`${API_URL}/createStrCust`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      paymentMethodID,
      firstName,
      userEmail,
    }),
  }).then((res) => res.json());