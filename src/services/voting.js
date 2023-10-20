import firebaseApp from '../configs/firebase';

import { addDoc, collection, where, query, getDocs, getFirestore } from 'firebase/firestore';
const firestore = getFirestore(firebaseApp);

export const submitVotes = async (votingData) => (await addDoc(collection(firestore, 'eventVotes'), votingData));

export const getVoteDoc = async (eventId, email) => (
  (await getDocs(query(collection(firestore, 'eventVotes'), where('eventId', '==', eventId), where('user', '==', email)))).docs
)
