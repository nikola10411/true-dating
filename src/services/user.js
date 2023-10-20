import firebaseApp from '../configs/firebase';
import { getDateTime } from '../utils/date';
import { getAdmins, isAdmin } from './admin';
import { getServerTimestamp } from '../utils/firestoreTimestamp';

import { collection, doc, getDoc, getDocs, getFirestore, limit, query, setDoc, updateDoc, where } from 'firebase/firestore';

const USERS = 'users';

const firestore = getFirestore(firebaseApp);

export const generateUserDocument = async (user) => {
  if (!user) return;
  const { uid } = user;
  const userRef = doc(firestore, 'users', uid)

  try {
    await setDoc(userRef, {
      createdAt: getServerTimestamp(),
      photoURL: null,
      phoneNumber: null,
      ...user,
    })
  } catch (error) {
    console.error('Error creating user document', error);
  }
};

export const getUserDocument = async (uid) => {
  if (!uid) return;
  const userRef = doc(firestore, 'users', uid)
  const snapshot = await getDoc(userRef);
  if (snapshot.exists()) {
    const userData = snapshot.data();
    return { ...userData, id: snapshot.id, isAdmin: await isAdmin(userData.email) };
  }

  return null;
};

export const getAllUsers = async () => {
  const admins = await getAdmins();
  const q = query(collection(firestore, USERS));
  return (await getDocs(q)).docs.map((doc) => {
    const userData = doc.data();
    return {
      ...userData,
      id: doc.id,
      createdAt: getDateTime(userData.createdAt),
      isAdmin: admins.includes(userData.email),
    };
  });
};

export const updateUserDocument = async ({ isAdmin, id, ...userData }) => {
  const userRef = doc(firestore, USERS, id)
  return updateDoc(userRef, userData)
}

export const getUserByEmail = async (email) => {
  const q = query(collection(firestore, USERS), where('email', '==', email), limit(1))
  const userData =  (await getDocs(q))
  if (userData.docs.length > 0) {
    return userData.docs[0].data()
  }
  return null
}

export const getUsersByEmail = async (emailsArray) => {
  const q = query(collection(firestore, USERS), where('email', 'in', emailsArray))
  const userData =  await getDocs(q)
  return userData.docs;
}
