import moment from "moment";
import "moment-duration-format";

import {groupOfTripEventsTransfer} from "../const.js";

import {
  FIRST_DAY,
  DATE_OF_GROUP_EVENTS,
  DESTINATIONS_IN_DAY,
  FIRST_DESTINATION_IN_DAY
} from "../const.js";

const CHECK_IN = `check-in`;
const CHECKIN = `checkin`;

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

export const getTimeDuration = (dateStart, dateEnd) => {
  const momentStart = moment(dateStart).clone().second(0).millisecond(0);
  const momentEnd = moment(dateEnd).clone().second(0).millisecond(0);
  const momentDuration = moment.duration(momentEnd.diff(momentStart));

  return momentDuration;
};

export const getTimeDurationInHours = (dateStart, dateEnd) => {

  const momentStart = moment(dateStart).clone().second(0).millisecond(0);
  const momentEnd = moment(dateEnd).clone().second(0).millisecond(0);

  const momentDuration = momentEnd.diff(momentStart, `hours`);

  return momentDuration;
};

export const getFormattedDate = (dateStart, dateEnd) => {

  return getTimeDuration(dateStart, dateEnd).format(`dd[D] hh[H] mm[M]`);
};

export const updateTripEventRoutPointTypeName = (routPointTypeName) => {
  let tripEventRoutPointTypeName = routPointTypeName.toLowerCase();

  if (tripEventRoutPointTypeName === CHECK_IN) {
    tripEventRoutPointTypeName = CHECKIN;
  }

  return tripEventRoutPointTypeName;
};

export const getCurrentDate = () => {
  const currentDate = new Date();
  currentDate.setHours(23, 59, 59, 999);

  return new Date(currentDate);
};

export const isTripEventPassed = (dateEndOfTripEvent) => {
  if (dateEndOfTripEvent === null) {
    throw new Error(`Sorry man, but there is not date end`);
  }

  const currentDate = getCurrentDate();

  return moment(currentDate).isAfter(dateEndOfTripEvent, `day`);
};

export const isTripEventFuture = (dateStartOfTripEvent) => {
  if (dateStartOfTripEvent === null) {
    throw new Error(`Sorry man, but there is not date start`);
  }

  const currentDate = getCurrentDate();

  return moment(currentDate).isBefore(dateStartOfTripEvent, `day`);
};

export const getUniqueTypesOfTripEvents = (tripEvents) => {
  const transferTypes = tripEvents.reduce((collector, tripEvent) => {
    collector.push(tripEvent.routPointType.type);
    return collector;
  }, []);
  return [...new Set(transferTypes)];
};

export const getGroupOfTripEventType = (tripEventType) => {
  return groupOfTripEventsTransfer.includes(tripEventType) ? `transfer` : `activity`;
};
