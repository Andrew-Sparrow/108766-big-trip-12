export const EVENTS_OF_DAY = 1;
export const FIRST_DAY = 0;
export const DATE_OF_GROUP_EVENTS = 0;
export const DESTINATIONS_IN_DAY = 1;
export const FIRST_DESTINATION_IN_DAY = 0;
export const WITHOUT_DAY = `withoutDay`;

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
  DEFAULT: `default`,
  PRICE_DOWN: `price-down`,
  DATE_DOWN: `date-down`
};

export const ADDITIONAL_OFFERS = [
  {
    name: `luggage`,
    title: `Add luggage`,
    price: 50,
  },
  {
    name: `coffee`,
    title: `Make coffee`,
    price: 10
  },
  {
    name: `uber`,
    title: `Order uber`,
    price: 20,
  },
  {
    name: `comfort`,
    title: `Switch to comfort class`,
    price: 100,
  },
  {
    name: `breakfast`,
    title: `Add breakfast`,
    price: 50,
  },
  {
    name: `tickets`,
    title: `Book tickets`,
    price: 40,
  },
  {
    name: `lunch`,
    title: `Lunch in city`,
    price: 30,
  },
  {
    name: `meal`,
    title: `Add meal`,
    price: 15
  },
  {
    name: `seats`,
    title: `Choose seats`,
    price: 5
  },
  {
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
    checkin: {
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
