import React, { createContext, useContext, useEffect, useState } from 'react';
import firebaseApp from '../configs/firebase';
import { getUserDocument } from '../services/user';
import { initializeAuth, browserLocalPersistence, onAuthStateChanged } from "firebase/auth";
import PageSpinner from '../components/PageSpinner';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children, pathname }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    const auth = initializeAuth(firebaseApp, {
      persistence: browserLocalPersistence,
    })
    auth.useDeviceLanguage();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setUser(null);
      } else {
        setSyncing(true);
        const userDoc = await getUserDocument(user.uid);
        // console.log(userDoc);
        setUser(userDoc);
        setSyncing(false);
      }

      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, syncing, setUser }}>
      {
        pathname == '/' ? (
          <>{children}</>
        ) : (
          <>
          {loading ? <PageSpinner /> : children}
          </>
        )
      }
    </AuthContext.Provider>
  );
}
