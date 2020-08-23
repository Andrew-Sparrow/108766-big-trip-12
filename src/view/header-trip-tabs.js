import {createDOMElement} from "./util/utils";

const createHeaderElementTripTabsTemplate = () => {
  return (`<nav class="trip-controls__trip-tabs  trip-tabs">
              <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
              <a class="trip-tabs__btn" href="#">Stats</a>
            </nav>`);
};

export default class HeaderElementTripTabs {
  constructor() {
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createDOMElement(HeaderElementTripTabs.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  static getTemplate() {
    return createHeaderElementTripTabsTemplate();
  }
}
