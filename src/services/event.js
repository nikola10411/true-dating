import firebaseApp from "../configs/firebase";
import {
  getDoc,
  getDocs,
  collection,
  orderBy,
  query,
  doc,
  where,
  updateDoc,
  addDoc,
  writeBatch,
  limit,
  getFirestore,
} from "firebase/firestore/lite";
import { API_URL } from "../constants";
import { getDateTime } from "../utils/date";
import { deleteFileFromURL } from "./storage";

const EVENTS = "events";

const firestore = getFirestore(firebaseApp)

export const addEvent = (event) =>
  addDoc(collection(firestore, EVENTS), {
    createdAt: new Date(),
    ...event,
  });

export const getEvent = async (id) => {
  if (!id) return;
  const docRef = doc(firestore, EVENTS, id);
  const eventData = (await getDoc(docRef)).data();
  return eventData
    ? {
        ...eventData,
        dateTime: getDateTime(eventData.dateTime),
        createdAt: getDateTime(eventData.createdAt),
      }
    : eventData;
};

export const getAllEvents = async () => {
  try {
    const q = query(collection(firestore, EVENTS), orderBy("dateTime", "asc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => {
      const eventData = doc.data();
      return {
        ...eventData,
        id: doc.id,
        dateTime: getDateTime(eventData.dateTime),
        createdAt: getDateTime(eventData.createdAt),
      };
    });
  } catch (e) {
    return ["something"];
  }
};

export const getLocations = async () => {
  const q = query(
    collection(firestore, EVENTS),
    where("archived", "in", [false, null])
  );
  const querySnapshot = await getDocs(q);
  const result = querySnapshot.docs.map((doc) => {
    const eventData = doc.data();
    return eventData.venue;
  });

  return [...new Set(result)];
};

export const getAges = async () => {
  const q = query(
    collection(firestore, EVENTS),
    where("archived", "in", [false, null])
  );
  const querySnapshot = await getDocs(q);
  const result = querySnapshot.docs.map((doc) => {
    const eventData = doc.data();
    return `${eventData.ageRangeFrom} - ${eventData.ageRangeTo}`;
  });

  return [...new Set(result)].sort();
};

export const getEventsCardData = async (limitAmount, queries = {}) => {
  let q = query(
    collection(firestore, EVENTS),
    where("archived", "in", [false, null]),
    orderBy("dateTime", "asc")
  );

  if (Object.keys(queries).length == 0 && limitAmount > 0) {
    q = query(q, limit(limitAmount));
  }

  const querySnapshot = await getDocs(q);
  let results = querySnapshot.docs.map((doc) => {
    const eventData = doc.data();
    return {
      imgURL: eventData.imgURL,
      title: eventData.title,
      venue: eventData.venue,
      ageRangeFrom: eventData.ageRangeFrom,
      ageRangeTo: eventData.ageRangeTo,
      menAvailableTickets: eventData.menAvailableTickets,
      womenAvailableTickets: eventData.womenAvailableTickets,
      ticketPrice: eventData.ticketPrice,
      featured: eventData.featured,
      isSameGender: eventData?.isSameGender ?? false,
      id: doc.id,
      dateTime: getDateTime(eventData.dateTime),
      createdAt: getDateTime(eventData.createdAt),
    };
  });

  if (Object.keys(queries).length > 0) {
    results = results.filter((event) => {
      const filterResults = [];
      if (queries.ageFrom) {
        filterResults.push(event.ageRangeFrom >= queries.ageFrom);
      }
      if (queries.ageTo) {
        filterResults.push(event.ageRangeTo <= queries.ageTo);
      }
      if (queries.type) {
        if (queries.type === "Gay") {
          filterResults.push(event.isSameGender);
        } else {
          filterResults.push(event.title.indexOf(queries.type) > -1);
        }
      }
      if (queries.date) {
        filterResults.push(
          new Date(event.dateTime).toLocaleDateString() ===
            new Date(queries.date).toLocaleDateString()
        );
      }
      if (queries.location) {
        filterResults.push(
          event.venue.toLowerCase().includes(queries.location.toLowerCase())
        );
      }
      if (queries.showGayEvents) {
        filterResults.push(event.isSameGender);
      }
      if (queries.showChristianEvents) {
        filterResults.push(event.title.indexOf("Christian") > -1);
      }
      if (queries.showSpeedEvents) {
        filterResults.push(event.title.indexOf("Speed") > -1);
      }
      return filterResults.every((result) => result);
    });
  }

  results.sort((a, b) => {
    return a.featured === b.featured ? 0 : a.featured ? -1 : 1;
  });

  return limitAmount ? results.slice(0, limitAmount) : results;
};

export const getActiveEvents = async () => {
  const q = query(
    collection(firestore, EVENTS),
    where("archived", "in", [false, null]),
    orderBy("dateTime", "asc")
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => {
    const eventData = doc.data();
    return {
      ...eventData,
      id: doc.id,
      dateTime: getDateTime(eventData.dateTime),
      createdAt: getDateTime(eventData.createdAt),
    };
  });
};

export const updateEvent = ({ id, ...eventDetails }) =>
  updateDoc(doc(firestore, EVENTS, id), eventDetails);

export const deleteEvents = (events) => {
  if (!events) return;

  const batch = writeBatch(firestore);
  events.forEach((event) => {
    const { id, imgUrl } = event;
    const eventRef = doc(firestore, EVENTS, id);
    if (eventRef) {
      batch.delete(eventRef);
      if (imgUrl) {
        deleteFileFromURL(imgUrl);
      }
    }
  });
  return batch.commit();
};

export const archiveEvents = (events) => {
  if (!events) return;

  events.forEach((event) => {
    event.archived = true;
    updateEvent({ id: event.id, ...event });
  });
};

export const unarchiveEvents = (events) => {
  if (!events) return;

  events.forEach((event) => {
    event.archived = false;
    updateEvent({ id: event.id, ...event });
  });
};

export const addUsersToEvent = (users, eventId) =>
  Promise.all(
    users.map((user) =>
      fetch(`${API_URL}/inviteUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user,
          eventId,
        }),
      })
    )
  ).catch((err) => console.log(err));
