import {ROUTE_POINT_TYPE, DESCRIPTIONS} from "../../const";

export const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const getRandomInteger = (min = 0, max = 1) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomDescriptions = () => {
  let sumStrings = [];

  for (let i = 1; i < getRandomInteger(1, 5); i++) {
    sumStrings.push(getRandomIndexOfArray(DESCRIPTIONS));
  }

  return sumStrings.join(` `);
};

export const isTaskExpired = (dueDate) => {
  if (dueDate === null) {
    return false;
  }

  const currentDate = getCurrentDay();

  return currentDate.getTime() > dueDate.getTime();
};

export const isTaskRepeating = (repeating) => {
  return Object.values(repeating).some(Boolean);
};

export const humanizeTaskDueDate = (dueDate) => {
  return dueDate.toLocaleString(`en-US`, {day: `numeric`, month: `long`});
};

const getCurrentDay = () => {
  const currentDate = new Date();
  currentDate.setHours(23, 59, 59, 999);

  return new Date(currentDate);
};

export const isTaskExpiredToday = (dueDate) => {
  if (dueDate === null) {
    return false;
  }

  const currentDate = getCurrentDay();

  return currentDate.getTime() === dueDate.getTime();
};

export const getRandomBoolean = () => {
  return Boolean(getRandomInteger(0, 1));
};

export const getRandomIndexOfArray = (array) => {
  let start = 0;
  let end = array.length - 1;

  return getRandomInteger(start, end);
};

export const includesItem = (item) => {
  // get last three type of point destination
  const typePointDestination = ROUTE_POINT_TYPE.slice(-3);

  return typePointDestination.includes(item) ? `in` : `to`;
};
