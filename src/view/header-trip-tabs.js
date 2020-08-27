import {createDOMElement} from "./util/utils";

const createHeaderElementTripTabsTemplate = () => {
  return (`<h2 class="visually-hidden trip-view">Switch trip view</h2>
            <nav class="trip-controls__trip-tabs  trip-tabs">
              <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
              <a class="trip-tabs__btn" href="#">Stats</a>
            </nav>`);
};

export default class HeaderElementTripTabs {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createHeaderElementTripTabsTemplate();
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
