import firebaseApp from '../configs/firebase';

import {doc, getDoc, collection, query, getDocs, getFirestore } from 'firebase/firestore'

const ADMINS = 'admins';

const firestore = getFirestore(firebaseApp)

export const isAdmin = async (email) => {
  if (!email) return;
  const userRef = doc(firestore, ADMINS, email);
  const snapshot = await getDoc(userRef);
  return snapshot.exists();
};

export const getAdmins = async () => {
  const q = query(collection(firestore, ADMINS));
  const admins = (await getDocs(q)).docs.map((doc) => doc.id);

  return admins
}
