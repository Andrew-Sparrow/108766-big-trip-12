export const getRandomInteger = (min = 0, max = 1) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomIndexOfList = (items) => {
  const start = 0;
  const end = items.length - 1;

  return getRandomInteger(start, end);
};

export const getRandomAmountOfItems = (items) => {
  const lengthOfListItems = items.length;
  const start = getRandomIndexOfList(items);
  const end = getRandomInteger(start, lengthOfListItems);

  return items.slice(start, end);
};

// get date randomly in past or in future or in present within period of two weeks
export const getRandomDate = () => {
  const randomInteger = getRandomInteger(-7, 7);
  const newDate = new Date();
  newDate.setDate(newDate.getDate() + randomInteger);
  newDate.setHours(newDate.getHours() + getRandomInteger(0, 24));
  newDate.setMinutes(newDate.getMinutes() + getRandomInteger(0, 60));

  return newDate;
};

export const updateItems = (items, updatedItem) => {
  const index = items.findIndex((item) => item.id === updatedItem.id);
  let newItems;
  console.log(index);
  if (index === -1) {
    return items;
  }

  newItems = [
    ...items.slice(0, index),
    updatedItem,
    ...items.slice(index + 1)
  ];

  return newItems;
};

export const getRandomBoolean = () => {
  return Boolean(getRandomInteger(0, 1));
};
