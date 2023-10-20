import firebaseApp from '../configs/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, signInWithRedirect, sendSignInLinkToEmail, getAuth } from 'firebase/auth';
import { EMAIL_FOR_SIGN_IN } from '../constants';
import { generateUserDocument } from './user';

const auth = getAuth(firebaseApp);

export const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password);

export const signUp = async ({ email, password, ...userData }) =>
  createUserWithEmailAndPassword(auth, email, password)
    .then((res) => generateUserDocument({ uid: res.user.uid, email, ...userData }));

export const signOutFirebase = () => {
  signOut(auth);
};

export const socialMediaSignIn = (provider) => signInWithRedirect(auth, provider);

export const sendSignInLink = (email) =>
  sendSignInLinkToEmail(auth, email, {
    url: window.location.origin,
    handleCodeInApp: true,
  }).then(() => localStorage.setItem(EMAIL_FOR_SIGN_IN, email));
