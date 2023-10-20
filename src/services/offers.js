import firebaseApp from '../configs/firebase';
import { doc, getDocs, query, collection, updateDoc, getFirestore } from 'firebase/firestore';

const OFFERS = 'offers';
const TOP_BANNER = 'topBanner';
const firestore = getFirestore(firebaseApp);

export const updateTopBanner = (isEnabled) =>
  updateDoc(doc(firestore, OFFERS, TOP_BANNER), {'enabled': isEnabled})
 
export const getTopBanner = async () => {
  const offers = (await getDocs(query(collection(firestore, OFFERS)))).docs;
  for (let doc of offers) {
    if (doc.id == TOP_BANNER) {
        return doc.data();
    }
  }
  return undefined;   
};