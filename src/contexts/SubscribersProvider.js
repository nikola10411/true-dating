import { createContext, useCallback, useContext, useState } from 'react';
import { getAllSubscribers } from '../services/subscribe';

const SubscribersContext = createContext();
export const useSubscribers = () => useContext(SubscribersContext);

export default function SubscribersProvider({ children }) {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [subscribersLoaded, setSubscribersLoaded] = useState(false);

  const loadSubscribers = useCallback(async () => {
    console.log('called subscriber')
    setLoading(true);
    try {
      const subscribers = await getAllSubscribers();
      if (subscribers.length) {
        setSubscribers(subscribers);
      }
      setSubscribersLoaded(true);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, []);

  return (
    <SubscribersContext.Provider value={{ subscribers, loading, subscribersLoaded, loadSubscribers, setSubscribers }}>
      {children}
    </SubscribersContext.Provider>
  );
}
