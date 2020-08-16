import {
  ADDITIONAL_OFFERS,
  CITIES
} from "../../const.js";

import {
  getRandomInteger,
  getRandomIndexOfArray
} from "../../const.js";

export const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const humanizeTaskDueDate = (dueDate) => {
  return dueDate.toLocaleString(`en-US`, {day: `numeric`, month: `long`});
};

export const getRandomBoolean = () => {
  return Boolean(getRandomInteger(0, 1));
};

// get date randomly in past or in future or in present within period of two weeks
export const getRandomDate = () => {
  let randomInteger = getRandomInteger(-7, 7);
  let newDate = new Date();
  newDate.setDate(newDate.getDate() + randomInteger);
  newDate.setHours(newDate.getHours() + getRandomInteger(0, 24));
  newDate.setMinutes(newDate.getMinutes() + getRandomInteger(0, 60));

  return newDate;
};

export const getRandomDestination = () => {
  return CITIES[getRandomIndexOfArray(CITIES)];
};

export const getRandomPropertyOfObject = (obj) => {
  const properties = Object.keys(obj);
  return properties[getRandomIndexOfArray(properties)];
};
