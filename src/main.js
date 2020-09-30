import {
  generateDescriptionsInCities,
  generateOffersInRoutPoints,
  generatePhotosInCities,
  groupArrayOfObjects,
} from "./utils/utils.js";

import {
  MenuItems,
  UpdateTypeForRerender,
  FilterType
} from "./const.js";

import {
  defaultSortEventsByGroupDays,
  defaultSortEventsItems
} from "./utils/trip-event-utils.js";

import {
  renderDOMElement,
  RenderPosition,
  remove
} from "./utils/render-utils.js";

import HeaderElementTripInfoView from "./view/header-info.js";
import HeaderElementTripTabsView from "./view/header-trip-tabs.js";

import {generateEvent} from "./mock/trip-event";
import BoardPresenter from "./presenter/board-presenter.js";
import FilterPresenter from "./presenter/filter-presenter.js";

import TripEventPointsModel from "./model/trip-event-points-model.js";
import FilterModel from "./model/trip-event-filter-model.js";
import StatisticsView from "./view/statistics-view.js";

const headerElement = document.querySelector(`.page-header`);
const tripMainElementInHeader = headerElement.querySelector(`.trip-main`);
const tripControls = tripMainElementInHeader.querySelector(`.trip-main__trip-controls`);
const tripView = tripControls.querySelector(`.trip-view`);

const pageMainElement = document.querySelector(`.page-main`);
const pageBodyContainer = pageMainElement.querySelector(`.page-body__container`);

generateOffersInRoutPoints();
generateDescriptionsInCities();
generatePhotosInCities();

const tripEvents = new Array(4).fill().map(generateEvent);

console.log(tripEvents);

const tripEventModel = new TripEventPointsModel();
tripEventModel.setTripEvents(tripEvents);

const filterModel = new FilterModel();

const groupsEventsByDay = groupArrayOfObjects(tripEvents, `dateStart`);

const defaultSortedDays = defaultSortEventsByGroupDays(groupsEventsByDay);
const defaultSortedEvents = defaultSortEventsItems(tripEvents);

const boardPresenter = new BoardPresenter(pageBodyContainer, tripEventModel, filterModel);
const filterPresenter = new FilterPresenter(tripControls, filterModel, tripEventModel);

const siteMenuComponent = new HeaderElementTripTabsView();

renderDOMElement(tripMainElementInHeader, new HeaderElementTripInfoView(defaultSortedDays, defaultSortedEvents), RenderPosition.AFTERBEGIN);

renderDOMElement(tripView, siteMenuComponent, RenderPosition.AFTEREND);

let statisticsComponent = null;

const handleAddNewTripEventClick = () => {
  if (statisticsComponent !== null) {
    remove(statisticsComponent);
  }
  filterModel.setFilter(UpdateTypeForRerender.MAJOR, FilterType.EVERYTHING);
  boardPresenter.destroy();
  boardPresenter.createNewTripEvent(siteMenuComponent.handleNewTripEventFormClose);
  boardPresenter.init();
};

const handleSiteMenuClick = (menuItemId) => {
  switch (menuItemId) {
    case MenuItems.TABLE:
      boardPresenter.init();
      remove(statisticsComponent);
      break;
    case MenuItems.STATISTICS:
      if (statisticsComponent !== null) {
        remove(statisticsComponent);
      }
      boardPresenter.destroy();
      statisticsComponent = new StatisticsView(tripEventModel.getTripEvents());
      renderDOMElement(pageBodyContainer, statisticsComponent, RenderPosition.BEFOREEND);
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
siteMenuComponent.setAddNewTripEventHandler(handleAddNewTripEventClick);

filterPresenter.init();
boardPresenter.init();

// statisticsComponent = new StatisticsView(tripEventModel.getTripEvents());
// renderDOMElement(pageBodyContainer, statisticsComponent, RenderPosition.BEFOREEND);
