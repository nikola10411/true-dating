import firebaseApp from '../configs/firebase';
import { addDoc, collection, getFirestore } from 'firebase/firestore';

const firestore = getFirestore(firebaseApp);
export const createOrder = async (orderDetails) => (await addDoc(collection(firestore, 'orders'), orderDetails));
