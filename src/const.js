import {generateId} from "./mock/trip-event-mock.js";

export const EVENTS_OF_DAY = 1;
export const FIRST_DAY = 0;
export const DATE_OF_GROUP_EVENTS = 0;
export const DESTINATIONS_IN_DAY = 1;
export const FIRST_DESTINATION_IN_DAY = 0;
export const WITHOUT_DAY = `withoutDay`;
export const WITHOUT_SELECTOR = `withoutSelector`;

const checkIn = `check-in`;

export const DESCRIPTIONS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

export const SortType = {
  DEFAULT: `sort-event`,
  PRICE_DOWN: `sort-price`,
  DATE_DOWN: `sort-time`
};

export const ADDITIONAL_OFFERS = [
  {
    id: generateId(),
    name: `luggage`,
    title: `Add luggage`,
    price: 50,
  },
  {
    id: generateId(),
    name: `coffee`,
    title: `Make coffee`,
    price: 10
  },
  {
    id: generateId(),
    name: `uber`,
    title: `Order uber`,
    price: 20,
  },
  {
    id: generateId(),
    name: `comfort`,
    title: `Switch to comfort class`,
    price: 100,
  },
  {
    id: generateId(),
    name: `breakfast`,
    title: `Add breakfast`,
    price: 50,
  },
  {
    id: generateId(),
    name: `tickets`,
    title: `Book tickets`,
    price: 40,
  },
  {
    id: generateId(),
    name: `lunch`,
    title: `Lunch in city`,
    price: 30,
  },
  {
    id: generateId(),
    name: `meal`,
    title: `Add meal`,
    price: 15
  },
  {
    id: generateId(),
    name: `seats`,
    title: `Choose seats`,
    price: 5
  },
  {
    id: generateId(),
    name: `car`,
    title: `Rent a car`,
    price: 200,
  }
];

export const ROUTE_POINT_TYPES = {
  transfer: {
    taxi: {
      name: `Taxi`,
      offers: []
    },
    bus: {
      name: `Bus`,
      offers: []
    },
    train: {
      name: `Train`,
      offers: []
    },
    ship: {
      name: `Ship`,
      offers: []
    },
    transport: {
      name: `Transport`,
      offers: []
    },
    drive: {
      name: `Drive`,
      offers: []
    },
    flight: {
      name: `Flight`,
      offers: []
    }
  },
  activity: {
    [checkIn]: {
      name: `Check-in`,
      offers: []
    },
    sightseeing: {
      name: `Sightseeing`,
      offers: []
    },
    restaurant: {
      name: `Restaurant`,
      offers: []
    },
  }
};

export const groupOfTripEventsTransfer = [
  `taxi`,
  `bus`,
  `train`,
  `ship`,
  `transport`,
  `drive`,
  `flight`,
];

export const CITIES = [
  {
    city: `Amsterdam`,
    description: ``,
    photos: null
  },
  {
    city: `Chamonix`,
    description: ``,
    photos: null
  },
  {
    city: `Geneva`,
    description: ``,
    photos: null
  },
  {
    city: `Paris`,
    description: ``,
    photos: null
  },
];

export const UserActionForModel = {
  UPDATE_TRIP_EVENT: `UPDATE_TRIP_EVENT`,
  ADD_NEW_TRIP_EVENT: `ADD_TRIP_EVENT`,
  DELETE_TRIP_EVENT: `DELETE_TRIP_EVENT`
};

export const UpdateTypeForRerender = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`,
  INIT: `INIT`,
};

export const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`
};

export const MenuItems = {
  ADD_NEW_TRIP_EVENT: `header-new-trip-event-button`,
  TABLE: `header-table-button`,
  STATISTICS: `header-stats-button`
};

const TripPointsTypes = {
  TAXI: `taxi`,
  BUS: `bus`,
  TRAIN: `train`,
  SHIP: `ship`,
  TRANSPORT: `transport`,
  DRIVE: `drive`,
  FLIGHT: `flight`,
  CHECK: `checkin`,
  SIGHTSEEING: `sightseeing`,
  RESTAURANT: `restaurant`
};

export const LabelsStatistics = {
  [TripPointsTypes.TAXI]: `🚕 TAXI`,
  [TripPointsTypes.BUS]: `🚌 BUS`,
  [TripPointsTypes.TRAIN]: `🚂 TRAIN`,
  [TripPointsTypes.SHIP]: `🚢 SHIP`,
  [TripPointsTypes.TRANSPORT]: `🚊 TRANSPORT`,
  [TripPointsTypes.DRIVE]: `🚗 DRIVE`,
  [TripPointsTypes.FLIGHT]: `✈️ FLY`,
  [TripPointsTypes.CHECK]: `🏨 CHECK`,
  [TripPointsTypes.SIGHTSEEING]: `🏛️ SIGHTSEEING`,
  [TripPointsTypes.RESTAURANT]: `🍴 RESTAURANT`
};
