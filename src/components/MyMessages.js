import { useEffect, useState } from "react";

import { useCollectionData } from "react-firebase-hooks/firestore";
import { MenuItem, Chip } from "@mui/material";

import { query, collection, where, getFirestore } from "firebase/firestore";

export default function MyMessages({user, handleClick}) {
  const [unreadMessages, setUnreadMessages] = useState(0);

  const q = query(collection(getFirestore(firebaseApp), 'messages'), where('to', '==', user.email), where('read', '==', false))
  const [messages = [], loading] = useCollectionData(q, { idField: 'id' });

  useEffect(() => {
    if (!loading) {
      setUnreadMessages(messages.length)
    }
  }, [loading, messages.length]);

  return (
    <MenuItem onClick={handleClick}>My Messages&nbsp;&nbsp;&nbsp; {
      unreadMessages > 0 && (
        <Chip label={unreadMessages} size='small' />
      )
    }</MenuItem>
  )
}