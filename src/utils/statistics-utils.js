import {LabelsStatistics} from "../const.js";

export const getTypesForLabels = (types) => {
  let result = [];
  types.forEach((item) => result.push(LabelsStatistics[item]));
  return result;
};

export const calculateMoneyForTypes = (tripEvents) => {
  const mapOfMoney = new Map();

  tripEvents.forEach(
      (tripEvent) => {
        return mapOfMoney.get(tripEvent.routPointType.type) === undefined ?
          mapOfMoney.set(tripEvent.routPointType.type, tripEvent.price) :
          mapOfMoney.set(tripEvent.routPointType.type, mapOfMoney.get(tripEvent.routPointType.type) + tripEvent.price);
      }
  );

  const entriesTypesToMoney = Object.fromEntries(mapOfMoney);
  const typesOfTripEvents = Object.keys(entriesTypesToMoney);
  const totalSumsForEachTripEvents = Object.values(entriesTypesToMoney);

  const matchingTypeToTotalSum = {
    typesOfTripEvents,
    totalSumsForEachTripEvents
  };
  console.log(matchingTypeToTotalSum);

  return matchingTypeToTotalSum;
};
