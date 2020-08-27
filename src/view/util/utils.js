import {
  CITIES,
  DESCRIPTIONS,
  ADDITIONAL_OFFERS,
  ROUTE_POINT_TYPES,
  FIRST_ELEMENT,
  SECOND_ELEMENT
} from "../../const.js";

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
};

export const renderDOMElement = (container, element, position) => {
  switch (position) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
    case RenderPosition.AFTEREND:
      container.insertAdjacentElement(`afterend`, element);
      break;
  }
};

/**
 * create DOM Element.
 * @param {String} template - The template.
 * @return {ChildNode} DOM element - The place to put.
 */
export const createDOMElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

/**
 * renderTemplate.
 * @param {Object} container - The container to put.
 * @param {String} template - The template.
 * @param {InsertPosition} place - The place to put.
 */
export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const humanizeTaskDueDate = (dueDate) => {
  return dueDate.toLocaleString(`en-US`, {
    day: `numeric`,
    month: `long`
  });
};

export const getRandomBoolean = () => {
  return Boolean(getRandomInteger(0, 1));
};

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

export const getRandomDescriptions = () => {
  const sumStrings = [];

  for (let i = 0; i < getRandomInteger(1, 5); i++) {
    sumStrings.push(DESCRIPTIONS[getRandomIndexOfList(DESCRIPTIONS)]);
  }

  return sumStrings.join(` `);
};

export const getRandomPhotosSrc = () => {
  const photos = [];

  for (let i = 0; i < getRandomInteger(1, 5); i++) {
    photos.push(`img/photos/${getRandomInteger(1, 5)}.jpg`);
  }

  return photos;
};

export const getRandomCities = () => {
  return CITIES[getRandomIndexOfList(CITIES)];
};

// export const getRandomCities = (items) => {
//   return items[getRandomIndexOfList(items)];
// };

export const getRandomPropertyOfObject = (obj) => {
  const properties = Object.keys(obj);
  return properties[getRandomIndexOfList(properties)];
};

/**
 * This function groups events by day.
 * @param {Object[]} objects - The array of events.
 * @param {String} key - The key in the trip event.
 * @return {Object[]} Returns array of entries of events
 */
export const groupArrayOfObjects = (objects, key) => {
  const items = objects.reduce((receiver, current) => {
    receiver[current[key].toDateString()] = receiver[current[key].toDateString()] || [];
    receiver[current[key].toDateString()].push(current);

    return receiver;
  }, {});

  return Object.entries(items);
};

export const defaultSortEventsByGroupDays = (tripEvents) => {
  return new Array(...tripEvents).sort((first, second) => new Date(first[FIRST_ELEMENT]) - new Date(second[FIRST_ELEMENT]));
};

export const defaultSortEventsItems = (tripEvents) => {
  return new Array(...tripEvents).sort((first, second) => new Date(first.dateStart) - new Date(second.dateStart));
};

export const sortTravelEventsByDateEnd = (tripEvents) => {
  return new Array(...tripEvents).sort((first, second) => new Date(second[SECOND_ELEMENT][FIRST_ELEMENT].dateEnd) - new Date(first[SECOND_ELEMENT][FIRST_ELEMENT].dateEnd));
};

const getShortTitleMonth = (date) => {
  const options = {
    month: `short`,
    day: `2-digit`
  };

  return new Intl.DateTimeFormat(`en-US`, options).format(date);
};

export const getDateStringForHeader = (tripEvents) => {
  const sortedListByEndDate = sortTravelEventsByDateEnd(tripEvents);
  const dateOfFirstEventInSortedList = sortedListByEndDate[FIRST_ELEMENT][SECOND_ELEMENT][FIRST_ELEMENT].dateEnd;

  let dateStart = new Date(tripEvents[FIRST_ELEMENT][FIRST_ELEMENT]);
  let dateEnd = new Date(dateOfFirstEventInSortedList);

  dateStart = getShortTitleMonth(dateStart);
  dateEnd = getShortTitleMonth(dateEnd);

  return {
    startTrip: dateStart,
    endTrip: dateEnd
  };
};

export const getRandomOffers = () => {
  return getRandomAmountOfItems(ADDITIONAL_OFFERS);
};

export const generateOffersInRoutPoints = () => {
  const propertiesGroupsName = Object.keys(ROUTE_POINT_TYPES);

  for (const nameGroupProperties of propertiesGroupsName) {
    const properties = Object.keys(ROUTE_POINT_TYPES[nameGroupProperties]);
    properties.forEach((property) => {
      const generatedOffers = getRandomOffers();
      ROUTE_POINT_TYPES[nameGroupProperties][property].offers.push(...generatedOffers);
    });
  }
};

/**
 * This function adds new descriptions to city in list of cities.
 */
export const generateDescriptionsInCities = () => {
  CITIES.forEach((item) => {
    item.description = getRandomDescriptions();
  });
};

/**
 * This function adds new photos to city in list of cities.
 */
export const generatePhotosInCities = () => {
  CITIES.forEach((item) => {
    item.photos = getRandomPhotosSrc();
  });
};

export const calculateTotalPrice = (items) => {
  return items.reduce((total, currentItem) => {
    let sumOffersOfItem = 0;
    if (currentItem[SECOND_ELEMENT][FIRST_ELEMENT].routPointType.offers.length > 0) {
      sumOffersOfItem = currentItem[SECOND_ELEMENT][FIRST_ELEMENT].routPointType.offers.reduce((sum, current) => {
        return sum + current.price;
      }, 0);
    }
    return Math.ceil(total + currentItem[SECOND_ELEMENT][FIRST_ELEMENT].price + sumOffersOfItem);
  }, 0);
};
