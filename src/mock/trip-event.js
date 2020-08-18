import {
  getRandomDate,
  getRandomDestination,
  getRandomPropertyOfObject,
  getRandomDescriptions,
  getRandomPhotosSrc,
  getRandomInteger
} from "../view/util/utils";

import {
  ROUTE_POINT_TYPES,
} from "../const";

export const generateEvent = () => {
  const randomDestination = getRandomDestination();
  const dateStart = getRandomDate();
  const dateEnd = new Date();
  const routPointTypeGroupName = getRandomPropertyOfObject(ROUTE_POINT_TYPES);
  const routPointTypeKey = getRandomPropertyOfObject(ROUTE_POINT_TYPES[routPointTypeGroupName]);

  const travelEvent = {
    destination: randomDestination,
    routPointTypeGroupName,
    routPointType: ROUTE_POINT_TYPES[routPointTypeGroupName][routPointTypeKey],
    dateStart,
    dateEnd
  };
  // console.log(dateStart.toLocaleDateString());

  travelEvent.destination.description = getRandomDescriptions();
  travelEvent.destination.photos = getRandomPhotosSrc();

  travelEvent.dateEnd.setDate(dateStart.getDate() + getRandomInteger(0, 2));
  travelEvent.dateEnd.setHours(dateStart.getHours() + getRandomInteger(0, 10));
  travelEvent.dateEnd.setMinutes(dateStart.getMinutes() + getRandomInteger(0, 60));

  return travelEvent;
};
