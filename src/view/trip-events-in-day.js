import {createDOMElement} from "./util/utils.js";

const createTripEventsInDay = () => {
  return `<ul class="trip-events__list"></ul>`;
};

export default class TripEventsInDay {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripEventsInDay();
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
