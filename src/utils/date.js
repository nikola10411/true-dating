const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const full_months = ['January', 'Febrary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octobor', 'November', 'December'];
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const getDateTime = (dateTimeObj) => {
  if (!dateTimeObj) return null;
  return dateTimeObj.toDate();
};

export const getUKDateTime = (dateTime) =>
  (dateTime &&
    new Intl.DateTimeFormat('en-GB', { dateStyle: 'short', timeStyle: 'short' }).format(
      dateTime
    )) ||
  null;


// speed dating bank, 10/02/23 => speed-dating-bank-2-feb-2023
export const getEventUrlFromTitleDate = (title, date) => {
  const formattedTitle = title.toLowerCase().split(' ').join('-');
  const dateObj = new Date(date)
  const day = dateObj.getDate();
  const month = months[dateObj.getMonth()];
  const year = dateObj.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;
  return `${formattedTitle}-${formattedDate}`
}


// speed-dating-bank-2-feb-2023 => speed dating bank, 10/02/23
export const getTitleAndDateForEvent = (eventTitleAndDate) => {
  let IndividualElementsArray = eventTitleAndDate.split('-')
  const date = IndividualElementsArray.slice(IndividualElementsArray.length - 3, IndividualElementsArray.length).join(' ')
  const title = IndividualElementsArray.slice(0, IndividualElementsArray.length - 3).join(' ')
  return { date, title }
}

// 2023-09-06 => Wednesday, 6th September 2023
export const getFormattedDate = (date) => {
  const dateObj = new Date(date)
  const weekday = weekdays[dateObj.getDay()];
  let day = dateObj.getDate();
  if (day == 1 || (day > 11 && day % 10 == 1)) {
    day = `${day}st`
  } else if (day == 2 || (day > 12 && day % 10 == 2)) {
    day = `${day}nd`
  } else {
    day = `${day}th`
  }

  const month = full_months[dateObj.getMonth()];
  const year = dateObj.getFullYear();

  return `${weekday}, ${day} ${month} ${year}`
}

export const getFullDate = (date) => {
  const dateObj = new Date(date)
  const day = dateObj.getDate();
  const month = months[dateObj.getMonth()];
  const year = dateObj.getFullYear();
  return `${day} ${month} ${year}`;
}