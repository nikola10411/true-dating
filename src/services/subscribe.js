import firebaseApp from '../configs/firebase';
import { getDateTime } from '../utils/date';
import { collection, addDoc, query, getDocs, orderBy, getFirestore } from 'firebase/firestore'

const SUBSCRIBE = 'subscribe';
const firestore = getFirestore(firebaseApp);

export const addSubscriber = (subscriber) => {
  const collectionRef = collection(firestore, SUBSCRIBE)
  addDoc(collectionRef, { createdAt: new Date(), ...subscriber })
}

export const getAllSubscribers = async () => {
  const q = query(collection(firestore, SUBSCRIBE, orderBy('createdAt', 'desc')))
  return (await getDocs(q)).docs.map((doc) => {
    const subscriberData = doc.data();
    return {
      ...subscriberData,
      id: doc.id,
      createdAt: getDateTime(subscriberData.createdAt),
    };
  });
}