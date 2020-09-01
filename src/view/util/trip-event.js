import {
  FIRST_DAY,
  DATE_OF_GROUP_EVENTS,
  DESTINATIONS_IN_DAY,
  FIRST_DESTINATION_IN_DAY
} from "../../const.js";

const getShortTitleMonth = (date) => {
  const options = {
    month: `short`,
    day: `2-digit`
  };

  return new Intl.DateTimeFormat(`en-US`, options).format(date);
};

export const defaultSortEventsByGroupDays = (tripEvents) => {
  return new Array(...tripEvents).sort((first, second) => new Date(first[DATE_OF_GROUP_EVENTS]) - new Date(second[DATE_OF_GROUP_EVENTS]));
};

export const defaultSortEventsItems = (tripEvents) => {
  return new Array(...tripEvents).sort((first, second) => new Date(first.dateStart) - new Date(second.dateStart));
};

export const sortTravelEventsByDateEnd = (tripEvents) => {
  return new Array(...tripEvents).sort((first, second) => new Date(second[DESTINATIONS_IN_DAY][FIRST_DESTINATION_IN_DAY].dateEnd) - new Date(first[DESTINATIONS_IN_DAY][FIRST_DESTINATION_IN_DAY].dateEnd));
};

export const calculateTotalPrice = (items) => {
  return items.reduce((total, currentItem) => {
    let sumOffersOfItem = 0;
    if (currentItem[DESTINATIONS_IN_DAY][FIRST_DESTINATION_IN_DAY].routPointType.offers.length > 0) {
      sumOffersOfItem = currentItem[DESTINATIONS_IN_DAY][FIRST_DESTINATION_IN_DAY].routPointType.offers.reduce((sum, current) => {
        return sum + current.price;
      }, 0);
    }
    return Math.ceil(total + currentItem[DESTINATIONS_IN_DAY][FIRST_DESTINATION_IN_DAY].price + sumOffersOfItem);
  }, 0);
};


export const getDateStringForHeader = (tripEvents) => {
  const sortedListByEndDate = sortTravelEventsByDateEnd(tripEvents);
  const dateOfFirstEventInSortedList = sortedListByEndDate[FIRST_DAY][DESTINATIONS_IN_DAY][FIRST_DESTINATION_IN_DAY].dateEnd;

  let dateStart = new Date(tripEvents[FIRST_DAY][DATE_OF_GROUP_EVENTS]);
  let dateEnd = new Date(dateOfFirstEventInSortedList);

  dateStart = getShortTitleMonth(dateStart);
  dateEnd = getShortTitleMonth(dateEnd);

  return {
    startTrip: dateStart,
    endTrip: dateEnd
  };
};

export const sortPriceDown = (eventA, eventB) => {
  return eventB.price - eventA.price;
};

export const sortDateDown = (eventA, eventB) => {
  const differenceTimeA = eventA.dateStart.getTime() - eventA.dateEnd.getTime();
  const differenceTimeB = eventB.dateStart.getTime() - eventB.dateEnd.getTime();

  return differenceTimeA - differenceTimeB;
};

const getDigitFormat = (digit, letter) => {
  if (digit === 0) {
    digit = ``;
    return digit;
  } else if (digit < 10) {
    digit = `0` + digit;
  }
  return digit + letter;
};

export const getFormattedDate = (dateStart, dateEnd) => {
  const diffTime = dateEnd - dateStart; // разница в миллисекундах

  const secondsInDay = 24 * 60 * 60 * 1000;
  const hoursInDay = 60 * 60 * 1000;
  const minutesInDay = 60 * 1000;

  const daysInTime = Math.floor(diffTime / secondsInDay); // days
  const remainderOfHoursInTime = Math.floor((diffTime - (daysInTime * secondsInDay)) / hoursInDay);
  const remainderOfMinutesInTime = Math.floor((diffTime - (daysInTime * secondsInDay) - (remainderOfHoursInTime * hoursInDay)) / minutesInDay);

  return getDigitFormat(daysInTime, `D`) + ` ` + getDigitFormat(remainderOfHoursInTime, `H`) + ` ` + getDigitFormat(remainderOfMinutesInTime, `M`);
};
