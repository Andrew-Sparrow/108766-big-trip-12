import {
  ROUTE_POINT_TYPES,
  CITIES
} from "../const";

import {
  getRandomIndexOfArray,
  getRandomDescriptions,
  getRandomOffers,
  getRandomPhotosSrc,
  getRandomDate,
  getRandomInteger
} from "../view/util/utils";

const generateDestination = () => {
  return CITIES[getRandomIndexOfArray(CITIES)];
};

const generateRoutPointType = () => {
  return ROUTE_POINT_TYPES[getRandomIndexOfArray(ROUTE_POINT_TYPES)];
};

export const generateEvent = () => {
  const randomDestination = generateDestination();
  const dataStart = getRandomDate();
  const dataEnd = new Date();
  dataEnd.setDate(dataStart.getDate() + getRandomInteger(0, 2));
  dataEnd.setHours(dataStart.getHours() + getRandomInteger(0, 10));
  dataEnd.setMinutes(dataStart.getMinutes() + getRandomInteger(0, 60));

  return {
    destination: {
      city: randomDestination,
      description: getRandomDescriptions(),
      photos: getRandomPhotosSrc(),
    },
    routPointType: generateRoutPointType(),
    offers: getRandomOffers(),
    dataStart,
    dataEnd
  };
};
