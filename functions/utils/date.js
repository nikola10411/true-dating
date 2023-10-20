const moment = require('moment');

const getDateTime = (dateTime) => dateTime.toDate();

const getUKDateTime = (dateTime) => {
  if (!dateTime) {
    return '';
  }
  const date = getDateTime(dateTime);
  return `${moment(date).format('dddd, Do MMMM YYYY')} at ${moment(date).format('HH:mm')}`;
};

module.exports = {
  getUKDateTime,
  getDateTime,
};
