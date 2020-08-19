import {
  getRandomDate,
  getRandomDestination,
  getRandomPropertyOfObject,
  getRandomDescriptions,
  getRandomPhotosSrc,
  getRandomInteger,
  getRandomOffers
} from "../view/util/utils";

import {
  ROUTE_POINT_TYPES,
} from "../const";

const generateOffersInRoutPoints = () => {
  const propertiesGroupsName = Object.keys(ROUTE_POINT_TYPES);
  // console.log(propertiesGroupsName);

  for (const nameGroupProperties of propertiesGroupsName) {
    const properties = Object.keys(ROUTE_POINT_TYPES[nameGroupProperties]);
    properties.forEach((property) => {
      const generatedOffers = getRandomOffers();
      ROUTE_POINT_TYPES[nameGroupProperties][property].offers.push(...generatedOffers);
    });
  }
};

generateOffersInRoutPoints();

export const generateEvent = () => {
  const randomDestination = getRandomDestination();
  const dateStart = getRandomDate();
  const routPointTypeGroupName = getRandomPropertyOfObject(ROUTE_POINT_TYPES);
  const routPointTypeKey = getRandomPropertyOfObject(ROUTE_POINT_TYPES[routPointTypeGroupName]);
  const dateEnd = new Date();

  const travelEvent = {
    destination: randomDestination,
    routPointTypeGroupName,
    routPointType: ROUTE_POINT_TYPES[routPointTypeGroupName][routPointTypeKey],
    dateStart,
    dateEnd,
    price: getRandomInteger(10, 500)
  };
  // console.log(dateStart.toLocaleDateString());

  travelEvent.destination.description = getRandomDescriptions();
  travelEvent.destination.photos = getRandomPhotosSrc();

  travelEvent.dateEnd.setDate(dateStart.getDate() + getRandomInteger(0, 2));
  travelEvent.dateEnd.setHours(dateStart.getHours() + getRandomInteger(0, 10));
  travelEvent.dateEnd.setMinutes(dateStart.getMinutes() + getRandomInteger(0, 60));

  return travelEvent;
};
