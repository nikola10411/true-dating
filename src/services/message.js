import firebaseApp from '../configs/firebase';

import { updateDoc, doc, getFirestore } from 'firebase/firestore';

const MESSAGES = 'messages';
const firestore = getFirestore(firebaseApp);

export const updateMessage = ({ id, ...messageDetails }) => {
  const docRef = doc(firestore, MESSAGES, id);
  updateDoc(docRef, messageDetails)
}

export const readMessages = (messages, user) => {
  if (!messages) return;
  if (!user) return;

  messages.forEach((message) => {
    if (message.read) return;
    if (message.to !== user.email) return;
    message.read = true;
    updateMessage({ id: message.id, ...message })
  });
};