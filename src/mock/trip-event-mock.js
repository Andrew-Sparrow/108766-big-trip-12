import {
  CITIES,
  ROUTE_POINT_TYPES,
} from "../const.js";

import {
  getRandomDate,
  getRandomAmountOfItems,
  getRandomInteger,
  getRandomBoolean
} from "../utils/common-utils.js";

import {
  getRandomCities,
  getRandomPropertyOfObject
} from "../utils/utils.js";

// it's better to use more reliable for production,
// for example like that - https://github.com/ai/nanoid
// but here, i will use next one:
export const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

export const generateEvent = () => {
  const randomDestination = getRandomCities(CITIES);
  const dateStart = getRandomDate();
  const routPointTypeGroupName = getRandomPropertyOfObject(ROUTE_POINT_TYPES);
  const routPointTypeKey = getRandomPropertyOfObject(ROUTE_POINT_TYPES[routPointTypeGroupName]);
  const dateEnd = new Date();
  const routPointTypeOfEvent = Object.assign({}, ROUTE_POINT_TYPES[routPointTypeGroupName][routPointTypeKey]);
  routPointTypeOfEvent.offers = getRandomAmountOfItems(routPointTypeOfEvent.offers);
  routPointTypeOfEvent.type = routPointTypeKey;

  const travelEvent = {
    id: generateId(),
    destination: randomDestination,
    routPointTypeGroupName,
    routPointType: routPointTypeOfEvent,
    dateStart,
    dateEnd,
    price: getRandomInteger(10, 500),
    isFavorite: getRandomBoolean()
  };
  travelEvent.dateEnd.setMonth(dateStart.getMonth());
  travelEvent.dateEnd.setDate(dateStart.getDate() + getRandomInteger(0, 3));
  travelEvent.dateEnd.setHours(dateStart.getHours() + getRandomInteger(1, 10));
  travelEvent.dateEnd.setMinutes(dateStart.getMinutes() + getRandomInteger(1, 60));

  return travelEvent;
};
