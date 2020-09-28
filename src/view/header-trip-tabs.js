import AbstractView from "./abstract.js";

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
  }

  getTemplate() {
    return createHeaderElementTripTabsTemplate();
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._callback.menuClick(evt.target.id);
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
}
