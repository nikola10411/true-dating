export const INVALID_EMAIL = 'Invalid email! Please provide a valid email address!';
export const INVALID_PASSWORD = 'Password should be at least 6 characters';
export const PASSWORDS_DO_NOT_MATCH = 'Passwords do not match';
export const ACCOUNT_EXISTS_WITH_DIFFERENT_CREDENTIAL =
  'auth/account-exists-with-different-credential';
export const WRONG_PASSWORD = 'auth/wrong-password';
export const USER_NOT_FOUND = 'auth/user-not-found';
export const PENDING_CREDENTIAL = 'pendingCreds';
export const EMAIL_FOR_SIGN_IN = 'emailForSignIn';
export const EMAIL_LINK_PROVIDER = 'emailLink';
export const MEMBERSHIP_1_MONTH = 'MEMBERSHIP_1_MONTH';
export const MEMBERSHIP_3_MONTHS = 'MEMBERSHIP_3_MONTHS';
export const MEMBERSHIP_6_MONTHS = 'MEMBERSHIP_6_MONTHS';
export const POUND_SYMBOL = '£';
export const PENDING = 'pending';
export const SENT = 'sent';
export const API_URL =
  process.env.NODE_ENV === 'development'
    ? 'https://us-central1-true-dating-dev.cloudfunctions.net/api'
    : 'https://us-central1-true-dating-ff8ed.cloudfunctions.net/api';
export const IMG_PLACEHOLDER = 'https://i.stack.imgur.com/y9DpT.jpg';
export const EVENTS_IMAGES_PATH = 'images/events';
export const BLOGS_IMAGES_PATH = 'images/blogs';
export const HOW_IT_WORKS_IMAGES_PATH = 'images/howItWorks';
export const USERS_IMAGES_PATH = 'images/users';
export const TRUE_DATING_VIDEO_URL =
  'https://firebasestorage.googleapis.com/v0/b/true-dating-ff8ed.appspot.com/o/True%20Dating%20Final.mp4?alt=media&token=e17514a5-893f-44d1-aecc-9f86ac00bdde';
