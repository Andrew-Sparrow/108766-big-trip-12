import {
  getRandomDescriptions,
  getRandomOffers,
  getRandomPhotosSrc,
  getRandomDate,
  getRandomInteger,
  getRandomDestination,
  getRandomRoutPointType,
  getRandomPropertyOfObject,
} from "../view/util/utils";

import {ROUTE_POINT_TYPES} from "../const";

export const generateEvent = () => {
  const randomDestination = getRandomDestination();
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
    routPointType: getRandomPropertyOfObject(ROUTE_POINT_TYPES),
    offers: getRandomOffers(),
    dataStart,
    dataEnd
  };
};
