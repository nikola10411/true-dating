import { API_URL } from "../constants";

export const handleFormSubmit = ({ name, email, phone, message }) =>
  fetch(`${API_URL}/contactFormSubmit`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      phone,
      message,
    }),
  });
