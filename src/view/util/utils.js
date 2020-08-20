import {
  CITIES,
  DESCRIPTIONS,
  ADDITIONAL_OFFERS,
  ROUTE_POINT_TYPES
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

export const getRandomIndexOfList = (items) => {
  const start = 0;
  const end = items.length - 1;

  return getRandomInteger(start, end);
};

export const getRandomAmountOfItems = (items) => {
  const lengthOfListItems = items.length;
  const start = getRandomIndexOfList(items);
  const end = getRandomInteger(start, lengthOfListItems);

  return items.slice(start, end);
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
    sumStrings.push(DESCRIPTIONS[getRandomIndexOfList(DESCRIPTIONS)]);
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

export const getRandomCities = () => {
  return CITIES[getRandomIndexOfList(CITIES)];
};

// export const getRandomCities = (items) => {
//   return items[getRandomIndexOfList(items)];
// };

export const getRandomPropertyOfObject = (obj) => {
  const properties = Object.keys(obj);
  return properties[getRandomIndexOfList(properties)];
};

/**
 * This function groups events by day.
 * @param {Object[]} objects - The array of events.
 * @param {String} key - The key in the trip event.
 * @return {Object[]} Returns array of entries of events
 */
export const groupArrayOfObjects = (objects, key) => {
  const items = objects.reduce((receiver, current) => {
    receiver[current[key].toDateString()] = receiver[current[key].toDateString()] || [];
    receiver[current[key].toDateString()].push(current);

    return receiver;
  }, {});

  return Object.entries(items);
};

export const defaultSortEvents = (tripEvents) => {
  return new Array(...tripEvents).sort((first, second) => new Date(first[0]) - new Date(second[0]));
};

export const sortTravelEventsByDateEnd = (tripEvents) => {
  return new Array(...tripEvents).sort((first, second) => new Date(second[1][0].dateEnd) - new Date(first[1][0].dateEnd));
};

const getShortTitleMonth = (date) => {
  const options = {
    month: `short`,
    day: `2-digit`
  };

  return new Intl.DateTimeFormat(`en-US`, options).format(date);
};

export const getDateStringForHeader = (tripEvents) => {
  const sortedListByEndDate = sortTravelEventsByDateEnd(tripEvents);
  const dateOfFirstEventInSortedList = sortedListByEndDate[0][1][0].dateEnd;

  let dateStart = new Date(tripEvents[0][0]);
  let dateEnd = new Date(dateOfFirstEventInSortedList);

  dateStart = getShortTitleMonth(dateStart);
  dateEnd = getShortTitleMonth(dateEnd);

  return {
    startTrip: dateStart,
    endTrip: dateEnd
  };
};

export const getRandomOffers = () => {
  return getRandomAmountOfItems(ADDITIONAL_OFFERS);
};

export const generateOffersInRoutPoints = () => {
  const propertiesGroupsName = Object.keys(ROUTE_POINT_TYPES);

  for (const nameGroupProperties of propertiesGroupsName) {
    const properties = Object.keys(ROUTE_POINT_TYPES[nameGroupProperties]);
    properties.forEach((property) => {
      const generatedOffers = getRandomOffers();
      ROUTE_POINT_TYPES[nameGroupProperties][property].offers.push(...generatedOffers);
    });
  }
};

/**
 * This function adds new descriptions to city in list of cities.
 */
export const generateDescriptionsInCities = () => {
  CITIES.forEach((item) => {
    item.description = getRandomDescriptions();
  });
};

/**
 * This function adds new photos to city in list of cities.
 */
export const generatePhotosInCities = () => {
  CITIES.forEach((item) => {
    item.photos = getRandomPhotosSrc();
  });
};

export const calculateTotalPrice = (items) => {
  return items.reduce((total, currentItem) => {
    let sumOffersOfItem = 0;
    if (currentItem[1][0].routPointType.offers.length > 0) {
      sumOffersOfItem = currentItem[1][0].routPointType.offers.reduce((sum, current) => {
        return sum + current.price;
      }, 0);
    }
    return Math.ceil(total + currentItem[1][0].price + sumOffersOfItem);
  }, 0);
};
