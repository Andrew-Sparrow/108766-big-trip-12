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
  const dataStart = getRandomDate();
  const dataEnd = new Date();
  const routPointTypeGroupName = getRandomPropertyOfObject(ROUTE_POINT_TYPES);
  const routPointTypeKey = getRandomPropertyOfObject(ROUTE_POINT_TYPES[routPointTypeGroupName]);

  const travelEvent = {
    destination: randomDestination,
    routPointTypeGroupName,
    routPointType: ROUTE_POINT_TYPES[routPointTypeGroupName][routPointTypeKey],
    dataStart,
    dataEnd
  };
  // console.log(dataStart.toLocaleDateString());

  travelEvent.destination.description = getRandomDescriptions();
  travelEvent.destination.photos = getRandomPhotosSrc();

  travelEvent.dataEnd.setDate(dataStart.getDate() + getRandomInteger(0, 2));
  travelEvent.dataEnd.setHours(dataStart.getHours() + getRandomInteger(0, 10));
  travelEvent.dataEnd.setMinutes(dataStart.getMinutes() + getRandomInteger(0, 60));

  return travelEvent;
};
