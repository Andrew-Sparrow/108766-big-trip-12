import {
  CITIES,
  ROUTE_POINT_TYPES,
} from "../const";

import {
  getRandomDate,
  getRandomCities,
  getRandomPropertyOfObject,
  getRandomInteger,
  generateOffersInRoutPoints,
  generateDescriptionsInCities,
  generatePhotosInCities,
  getRandomAmountOfItems
} from "../view/util/utils";

generateOffersInRoutPoints();
generateDescriptionsInCities();
generatePhotosInCities();

export const generateEvent = () => {
  const randomDestination = getRandomCities(CITIES);
  const dateStart = getRandomDate();
  const routPointTypeGroupName = getRandomPropertyOfObject(ROUTE_POINT_TYPES);
  const routPointTypeKey = getRandomPropertyOfObject(ROUTE_POINT_TYPES[routPointTypeGroupName]);
  const dateEnd = new Date();
  const routPointTypeOfEvent = ROUTE_POINT_TYPES[routPointTypeGroupName][routPointTypeKey];
  routPointTypeOfEvent.offers = getRandomAmountOfItems(routPointTypeOfEvent.offers);

  const travelEvent = {
    destination: randomDestination,
    routPointTypeGroupName,
    routPointType: routPointTypeOfEvent,
    dateStart,
    dateEnd,
    price: getRandomInteger(10, 500)
  };

  travelEvent.dateEnd.setDate(dateStart.getDate() + getRandomInteger(0, 2));
  travelEvent.dateEnd.setHours(dateStart.getHours() + getRandomInteger(0, 10));
  travelEvent.dateEnd.setMinutes(dateStart.getMinutes() + getRandomInteger(0, 60));

  return travelEvent;
};
