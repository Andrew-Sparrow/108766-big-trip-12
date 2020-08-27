import {createDOMElement} from "./util/utils.js";

// get block of days
const createTripDaysTemplate = () => {

  return (`<ul class="trip-days">
           </ul>`);
};

export default class TripDays {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripDaysTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createDOMElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
