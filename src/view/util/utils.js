import {
  CITIES,
  DESCRIPTIONS
} from "../../const.js";

export const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const humanizeTaskDueDate = (dueDate) => {
  return dueDate.toLocaleString(`en-US`, {
    day: `numeric`,
    month: `long`
  });
};

export const getRandomBoolean = () => {
  return Boolean(getRandomInteger(0, 1));
};

export const getRandomInteger = (min = 0, max = 1) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomIndexOfArray = (array) => {
  let start = 0;
  let end = array.length - 1;

  return getRandomInteger(start, end);
};

// get date randomly in past or in future or in present within period of two weeks
export const getRandomDate = () => {
  let randomInteger = getRandomInteger(-7, 7);
  let newDate = new Date();
  newDate.setDate(newDate.getDate() + randomInteger);
  newDate.setHours(newDate.getHours() + getRandomInteger(0, 24));
  newDate.setMinutes(newDate.getMinutes() + getRandomInteger(0, 60));

  return newDate;
};

export const getRandomDescriptions = () => {
  const sumStrings = [];

  for (let i = 0; i < getRandomInteger(1, 5); i++) {
    sumStrings.push(DESCRIPTIONS[getRandomIndexOfArray(DESCRIPTIONS)]);
  }

  return sumStrings.join(` `);
};

export const getRandomPhotosSrc = () => {
  let photos = [];

  for (let i = 0; i < getRandomInteger(1, 5); i++) {
    photos.push(`img/photos/${getRandomInteger(1, 5)}.jpg`);
  }

  return photos;
};

export const getRandomDestination = () => {
  return CITIES[getRandomIndexOfArray(CITIES)];
};

export const getRandomPropertyOfObject = (obj) => {
  const properties = Object.keys(obj);
  return properties[getRandomIndexOfArray(properties)];
};

/**
 * This function groups events by day.
 * @param {Object[]} list - The array of events.
 * @param {String} key - The key in the trip event.
 * @return {Object[]} Returns array of entries of events
 */
export const groupArrayOfObjects = (list, key) => {
  const items = list.reduce(function (receiver, current) {
    receiver[current[key].toDateString()] = receiver[current[key].toDateString()] || [];
    receiver[current[key].toDateString()].push(current);

    return receiver;
  }, {});

  return Object.entries(items);
};

export function defaultSortEvents(arr) {
  const items = new Array(...arr);
  return items.sort((first, second) => new Date(first[0]) - new Date(second[0]));
}

const getShortTitleMonth = (date) => {
  const options = {
    month: `short`,
    day: `2-digit`
  };

  return new Intl.DateTimeFormat(`en-US`, options).format(date);
};

export const getDateStringForHeader = (tripEvents) => {
  let dateStart = new Date(tripEvents[0][0]);
  let dateEnd = new Date(tripEvents[tripEvents.length - 1][0]);

  dateStart = getShortTitleMonth(dateStart);
  dateEnd = getShortTitleMonth(dateEnd);

  return {
    startTrip: dateStart,
    endTrip: dateEnd
  };
};
