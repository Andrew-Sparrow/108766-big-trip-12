import AbstractView from "./abstract.js";

const createHeaderElementTripTabsTemplate = () => {
  return (`<nav class="trip-controls__trip-tabs  trip-tabs">
             <a class="trip-tabs__btn  trip-tabs__btn--active" href="#" id="header-table-button">Table</a>
             <a class="trip-tabs__btn" href="#" id="header-stats-button">Stats</a>
           </nav>`);
};

export default class HeaderElementTripTabs extends AbstractView {
  getTemplate() {
    return createHeaderElementTripTabsTemplate();
  }
}
