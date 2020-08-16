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

export const getRandomInteger = (min = 0, max = 1) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomIndexOfArray = (array) => {
  let start = 0;
  let end = array.length - 1;

  return getRandomInteger(start, end);
};

export const getRandomDescriptions = () => {
  const sumStrings = [];

  for (let i = 0; i < getRandomInteger(1, 5); i++) {
    sumStrings.push(DESCRIPTIONS[getRandomIndexOfArray(DESCRIPTIONS)]);
  }

  return sumStrings.join(` `);
};

export const getRandomPhotosSrc = () => {
  let photos = [];

  for (let i = 0; i < getRandomInteger(1, 5); i++) {
    photos.push(`img/photos/${getRandomInteger(1, 5)}.jpg`);
  }

  return photos;
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
      offers: [
        ADDITIONAL_OFFERS[1],
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
        ADDITIONAL_OFFERS[0],
        ADDITIONAL_OFFERS[1]
      ]
    },
    ship: {
      name: `Ship`,
      offers: [
        ADDITIONAL_OFFERS[0],
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
        ADDITIONAL_OFFERS[0],
        ADDITIONAL_OFFERS[1]
      ]
    },
    flight: {
      name: `Flight`,
      offers: [
        ADDITIONAL_OFFERS[0],
        ADDITIONAL_OFFERS[1]
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
    description: getRandomDescriptions(),
    photos: getRandomPhotosSrc()
  },
  {
    city: `Chamonix`,
    description: getRandomDescriptions(),
    photos: getRandomPhotosSrc()
  },
  {
    city: `Geneva`,
    description: getRandomDescriptions(),
    photos: getRandomPhotosSrc()
  },
  {
    city: `Paris`,
    description: getRandomDescriptions(),
    photos: getRandomPhotosSrc()
  },
];
