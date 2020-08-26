import {createDOMElement} from "./util/utils.js";

// get block of days
const createTripDaysTemplate = () => {
  // const blockTripDaysItems = tripDays.map((tripDay, index) => createEventDayTemplate(tripDay[FIRST_ELEMENT], tripDay[SECOND_ELEMENT], index)).join(``);

  return (`<ul class="trip-days">
           </ul>`);
};

export default class TripDays {
  // constructor(tripDays) {
  constructor() {
    // this._days = tripDays;
    this._element = null;
  }

  getTemplate() {
    return createTripDaysTemplate();
    // return createTripDaysTemplate(this._days);
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
