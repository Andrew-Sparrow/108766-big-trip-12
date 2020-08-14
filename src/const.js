export const DESCRIPTIONS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`
];

export const ROUTE_POINT_TYPES = [
  `Taxi`,
  `Bus`,
  `Train`,
  `Ship`,
  `Transport`,
  `Drive`,
  `Flight`,
  `Check-in`,
  `Sightseeing`,
  `Restaurant`
];

export const CITIES = [
  `Amsterdam`,
  `Chamonix`,
  `Geneva`,
  `Paris`
];

export const ADDITIONAL_OFFERS = [
  {
    name: `luggage`,
    title: `Add luggage`,
    price: 50,
    routPointType: [`Flight`]
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
    routPointType: [`Taxi`]
  },
  {
    name: `comfort`,
    title: `Switch to comfort class`,
    price: 100,
    routPointType: [`Flight`]
  },
  {
    name: `breakfast`,
    title: `Add breakfast`,
    price: 50,
    routPointType: [`Check-in`]
  },
  {
    name: `tickets`,
    title: `Book tickets`,
    price: 40,
    routPointType: [`Sightseeing`]
  },
  {
    name: `lunch`,
    title: `Lunch in city`,
    price: 30,
    routPointType: [`Sightseeing`]
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
    routPointType: [`Drive`]
  }
];
