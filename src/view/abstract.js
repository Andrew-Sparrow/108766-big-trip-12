import {createDOMElement} from "./util/render.js";
import {WITHOUT_SELECTOR} from "../const.js";

export default class Abstract {
  constructor() {
    if (new.target === Abstract) {
      throw new Error(`Can't instantiate Abstract, only concrete one.`);
    }

    this._element = null;
    this._callback = {};
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }

  getElement(selector = WITHOUT_SELECTOR) {
    if (!this._element) {
      this._element = createDOMElement(this.getTemplate());
    }

    // some trick
    // passing selector as an argument to get inner DOM element
    if (selector !== WITHOUT_SELECTOR) {
      return this._element.querySelector(selector);
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
