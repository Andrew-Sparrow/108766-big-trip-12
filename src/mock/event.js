import {ROUTE_POINT_TYPE, CITIES} from "../const";
import {getRandomIndexOfArray, getRandomDescriptions} from "../view/util/utils";

const generateDestination = () => {
  return CITIES[getRandomIndexOfArray(CITIES)];
};

const generateRoutPointType = () => {
  return ROUTE_POINT_TYPE[getRandomIndexOfArray(ROUTE_POINT_TYPE)];
};

export const generateEvent = () => {
  let randomDestination = generateDestination();
  return {
    destination: randomDestination,
    description: getRandomDescriptions(),
    routPointType: generateRoutPointType(),
  };
};
