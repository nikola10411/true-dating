import { createContext, useCallback, useContext, useState } from 'react';
import { getActiveEvents, getAllEvents } from '../services/event';

const EventsContext = createContext();
export const useEvents = () => useContext(EventsContext);

export default function EventsProvider({ children }) {

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [eventsLoaded, setEventsLoaded] = useState(false);

  const loadEvents = useCallback(async () => {
    console.log('called events all')
    setLoading(true);
    try {
      const events = await getAllEvents();
      if (events.length) {
        setEvents(events);
      }
      setEventsLoaded(true);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, []);

  const loadDefaultEvents = useCallback(async () => {
    console.log('called events active')
    setLoading(true);
    try {
      const events = await getActiveEvents();
      if (events.length) {
        setEvents(events);
      }
      setEventsLoaded(true);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, []);

  return (
    <EventsContext.Provider value={{ events, loading, setEvents, eventsLoaded, loadEvents, loadDefaultEvents }}>
      {children}
    </EventsContext.Provider>
  );
}
