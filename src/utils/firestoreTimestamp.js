import { serverTimestamp } from "firebase/firestore";

export const getServerTimestamp = () => serverTimestamp();
