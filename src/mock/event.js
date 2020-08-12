import {
  ROUTE_POINT_TYPE,
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
  return ROUTE_POINT_TYPE[getRandomIndexOfArray(ROUTE_POINT_TYPE)];
};

export const generateEvent = () => {
  let randomDestination = generateDestination();
  let dataStart = getRandomDate();
  let dataEnd = new Date();
  dataEnd.setDate(dataStart.getDate() + getRandomInteger(0, 2));
  dataEnd.setHours(dataStart.getHours() + getRandomInteger(0, 10));
  dataEnd.setMinutes(dataStart.getMinutes() + getRandomInteger(0, 60));
  return {
    destination: randomDestination,
    description: getRandomDescriptions(),
    routPointType: generateRoutPointType(),
    offers: getRandomOffers(),
    photos: getRandomPhotosSrc(),
    dataStart,
    dataEnd
  };
};
