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

  return differenceTimeB - differenceTimeA;
};

export const formatDate = (dateStart, dateEnd) => {
  const diff = dateEnd - dateStart; // разница в миллисекундах

  if (diff < 1000) { // меньше 1 секунды
    return `прямо сейчас`;
  }

  let sec = Math.floor(diff / 1000); // преобразовать разницу в секунды

  if (sec < 60) {
    return sec + ` сек. назад`;
  }

  let min = Math.floor(diff / 60000); // преобразовать разницу в минуты
  if (min < 60) {
    return min + ` мин. назад`;
  }

  // отформатировать дату
  // добавить ведущие нули к единственной цифре дню/месяцу/часам/минутам
  let d = dateStart;
  d = [
    `0` + d.getDate(),
    `0` + (d.getMonth() + 1),
    `` + d.getFullYear(),
    `0` + d.getHours(),
    `0` + d.getMinutes()
  ].map((component) => component.slice(-2)); // взять последние 2 цифры из каждой компоненты

  // соединить компоненты в дату
  return d.slice(0, 3).join(`.`) + ` ` + d.slice(3).join(`:`);
};
