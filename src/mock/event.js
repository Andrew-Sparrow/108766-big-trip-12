import {DESCRIPTIONS, ROUTE_POINT_TYPE, CITIES} from "../const";
import {getRandomIndexOfArray} from "../view/util/utils";

const generateDescription = () => {
  const randomIndex = getRandomIndexOfArray(DESCRIPTIONS);

  return DESCRIPTIONS[randomIndex];
};

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
    description: generateDescription(),
    routPointType: generateRoutPointType(),
  };
};
