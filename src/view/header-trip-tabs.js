import AbstractView from "./abstract.js";
import {MenuItems} from "../const.js";

const createHeaderElementTripTabsTemplate = () => {
  return (`<nav class="trip-controls__trip-tabs  trip-tabs">
             <a class="trip-tabs__btn  trip-tabs__btn--active" href="#" id="header-table-button">Table</a>
             <a class="trip-tabs__btn" href="#" id="header-stats-button">Stats</a>
           </nav>`);
};

export default class HeaderElementTripTabsView extends AbstractView {
  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
    this._addNewTrpEventClickHandler = this._addNewTrpEventClickHandler.bind(this);
    this.handleNewTripEventFormClose = this.handleNewTripEventFormClose.bind(this);
  }

  getTemplate() {
    return createHeaderElementTripTabsTemplate();
  }

  handleNewTripEventFormClose() {
    this.getElement(`#${MenuItems.TABLE}`).disabled = false;
    document.querySelector(`.trip-main__event-add-btn`).disabled = false;
    this.setMenuItem(MenuItems.TABLE);
  }

  _addNewTrpEventClickHandler(evt) {
    evt.preventDefault();
    this.getElement(`#${MenuItems.TABLE}`).disabled = true;
    document.querySelector(`.trip-main__event-add-btn`).disabled = true;
    this._callback.newTripEventClick(evt.target.id);
  }

  setAddNewTripEventHandler(callback) {
    this._callback.newTripEventClick = callback;
    document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, this._addNewTrpEventClickHandler);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener(`click`, this._menuClickHandler);
  }

  setMenuItem(menuItem) {
    const item = this.getElement().querySelector(`#${menuItem}`);

    if (item !== null) {
      item.classList.add(`trip-tabs__btn--active`);
    }
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._callback.menuClick(evt.target.id);
  }
}
