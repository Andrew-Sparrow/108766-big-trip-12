import AbstractView from "./abstract.js";

// get block of days
const createTripDaysTemplate = () => {

  return (`<ul class="trip-days">
           </ul>`);
};

export default class TripDays extends AbstractView {
  getTemplate() {
    return createTripDaysTemplate();
  }
}
