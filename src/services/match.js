import firebaseApp from '../configs/firebase';

import { where, getDocs, query, collection, getFirestore } from 'firebase/firestore';

const MATCHES = 'matches';
const firestore = getFirestore(firebaseApp);

export const getUserMatches = async (email) => {
  const q = query(collection(firestore, MATCHES), where('users', 'array-contains', email))
  const allDocs = (await getDocs(q)).docs.map((doc) => {
    const matchData = doc.data();
    return {
      ...matchData,
      id: doc.id,
    };
  });

  if (!allDocs.length) {
    return [];
  }

  return allDocs
};

export const unmatch = (matchId) => firestore.collection('matches').doc(matchId).delete();
