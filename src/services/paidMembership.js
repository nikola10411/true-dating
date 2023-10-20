import firebaseApp from '../configs/firebase';

import { getFirestore } from 'firebase/firestore';

const firestore = getFirestore(firebaseApp);
export const createPaidMembership = (membershipDetail) => firestore.collection('paidMembership').add(membershipDetail);