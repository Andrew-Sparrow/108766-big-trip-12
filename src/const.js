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
      offers: [
        ADDITIONAL_OFFERS[4]
      ]
    },
    bus: {
      name: `Bus`,
      offers: []
    },
    train: {
      name: `Train`,
      offers: [
        ADDITIONAL_OFFERS[5],
        ADDITIONAL_OFFERS[3]
      ]
    },
    ship: {
      name: `Ship`,
      offers: [
        ADDITIONAL_OFFERS[7],
        ADDITIONAL_OFFERS[1]
      ]
    },
    transport: {
      name: `Transport`,
      offers: [
        ADDITIONAL_OFFERS[0],
        ADDITIONAL_OFFERS[1]
      ]
    },
    drive: {
      name: `Drive`,
      offers: [
        ADDITIONAL_OFFERS[6],
      ]
    },
    flight: {
      name: `Flight`,
      offers: [
        ADDITIONAL_OFFERS[0],
        ADDITIONAL_OFFERS[1],
        ADDITIONAL_OFFERS[3],
        ADDITIONAL_OFFERS[4]
      ]
    }
  },
  activity: {
    checkin: {
      name: `Check-in`,
      offers: [
        ADDITIONAL_OFFERS[2],
        ADDITIONAL_OFFERS[3]
      ]
    },
    sightseeing: {
      name: `Sightseeing`,
      offers: []
    },
    restaurant: {
      name: `Restaurant`,
      offers: [
        ADDITIONAL_OFFERS[5],
        ADDITIONAL_OFFERS[6]
      ]
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

export const DESTINATION_POINTS = [
  `Amsterdam`,
  `Chamonix`,
  `Geneva`,
  `Paris`,
  `London`,
  `Riga`,
  `Dublin`
];
