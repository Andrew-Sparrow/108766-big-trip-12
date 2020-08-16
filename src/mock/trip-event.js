import {
  getRandomDate,
  getRandomDestination,
  getRandomPropertyOfObject,
} from "../view/util/utils";

import {
  ROUTE_POINT_TYPES,
  getRandomInteger,
} from "../const";

export const generateEvent = () => {
  const randomDestination = getRandomDestination();
  const dataStart = getRandomDate();
  const dataEnd = new Date();
  const routPointTypeGroupName = getRandomPropertyOfObject(ROUTE_POINT_TYPES);
  const routPointTypeKey = getRandomPropertyOfObject(ROUTE_POINT_TYPES[routPointTypeGroupName]);
  dataEnd.setDate(dataStart.getDate() + getRandomInteger(0, 2));
  dataEnd.setHours(dataStart.getHours() + getRandomInteger(0, 10));
  dataEnd.setMinutes(dataStart.getMinutes() + getRandomInteger(0, 60));

  return {
    destination: randomDestination,
    routPointTypeGroupName,
    routPointType: ROUTE_POINT_TYPES[routPointTypeGroupName][routPointTypeKey],
    dataStart,
    dataEnd
  };
};
