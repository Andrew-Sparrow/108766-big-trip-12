import {getRandomInteger} from "./util/utils";

export const getEventPhoto = () => {
  return (`<img class="event__photo" src="img/photos/${getRandomInteger(1, 5)}.jpg" alt="Event photo">`);
};
