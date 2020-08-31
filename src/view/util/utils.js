import {
  CITIES,
  DESCRIPTIONS,
  ADDITIONAL_OFFERS,
  ROUTE_POINT_TYPES
} from "../../const.js";

import {
  getRandomInteger,
  getRandomIndexOfList,
  getRandomAmountOfItems,
} from "./common.js";

export const getRandomDescriptions = () => {
  const sumStrings = [];

  for (let i = 0; i < getRandomInteger(1, 5); i++) {
    sumStrings.push(DESCRIPTIONS[getRandomIndexOfList(DESCRIPTIONS)]);
  }

  return sumStrings.join(` `);
};

export const getRandomPhotosSrc = () => {
  const photos = [];

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
