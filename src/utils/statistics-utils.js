import moment from "moment";
import {LabelsStatistics} from "../const.js";

import {
  getTimeDuration,
} from "./trip-event-utils.js";

export const getTypesForLabels = (types) => {
  let typesWithIcons = [];
  types.forEach((item) => typesWithIcons.push(LabelsStatistics[item]));
  return typesWithIcons;
};

export const calculateMoneyForTypes = (tripEvents) => {
  const typesToMoneys = new Map();

  tripEvents.forEach(
      (tripEvent) => {
        return typesToMoneys.get(tripEvent.routPointType.type) === undefined ?
          typesToMoneys.set(tripEvent.routPointType.type, tripEvent.price) :
          typesToMoneys.set(tripEvent.routPointType.type, typesToMoneys.get(tripEvent.routPointType.type) + tripEvent.price);
      }
  );

  const entriesTypesToMoney = Object.fromEntries(typesToMoneys);
  const typesOfTripEvents = Object.keys(entriesTypesToMoney);
  const totalSumsForEachTripEvents = Object.values(entriesTypesToMoney);

  const matchingTypeToTotalSum = {
    typesOfTripEvents,
    totalSumsForEachTripEvents
  };

  return matchingTypeToTotalSum;
};

export const getAmountTransferTimes = (tripEvents) => {
  const transferTypesToTimes = new Map();

  tripEvents.forEach((tripEvent) => {
    if (tripEvent.routPointTypeGroupName === `transfer`) {
      return transferTypesToTimes.get(tripEvent.routPointType.type) === undefined ?
        transferTypesToTimes.set(tripEvent.routPointType.type, 1) :
        transferTypesToTimes.set(tripEvent.routPointType.type, transferTypesToTimes.get(tripEvent.routPointType.type) + 1);
    }
    return ``;
  });

  const entriesTypesToTimes = Object.fromEntries(transferTypesToTimes);
  const typesOfTransfer = Object.keys(entriesTypesToTimes);
  const timesOfTransfer = Object.values(entriesTypesToTimes);

  const calculatedMatchingTypesToTimes = {
    typesOfTransfer,
    timesOfTransfer
  };

  return calculatedMatchingTypesToTimes;
};

export const getDurationForTypes = (tripEvents) => {
  const transferTypesToDuration = new Map();

  tripEvents.forEach((tripEvent) => {
    return transferTypesToDuration.get(tripEvent.routPointType.type) === undefined ?
      transferTypesToDuration.set(tripEvent.routPointType.type, getTimeDuration(tripEvent.dateStart, tripEvent.dateEnd)) :
      transferTypesToDuration.set(tripEvent.routPointType.type, transferTypesToDuration.get(tripEvent.routPointType.type) + getTimeDuration(tripEvent.dateStart, tripEvent.dateEnd));
  });

  const entriesTypesToDuration = Object.fromEntries(transferTypesToDuration);
  const typesOfTripEvents = Object.keys(entriesTypesToDuration);
  let durationOfTypes = Object.values(entriesTypesToDuration);
  durationOfTypes = durationOfTypes.map((duration) => Math.floor(moment.duration(duration).asHours()));

  const calculatedMatchingTypesToDuration = {
    typesOfTripEvents,
    durationOfTypes
  };

  return calculatedMatchingTypesToDuration;
};
