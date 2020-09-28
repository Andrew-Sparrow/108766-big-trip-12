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
} from "./utils/trip-event.js";

import {
  renderDOMElement,
  RenderPosition,
} from "./utils/render.js";

import HeaderElementTripInfoView from "./view/header-info.js";
import HeaderElementTripTabsView from "./view/header-trip-tabs.js";

import {generateEvent} from "./mock/trip-event";
import BoardPresenter from "./presenter/board-presenter.js";
import FilterPresenter from "./presenter/filter-presenter.js";

import TripEventPointsModel from "./model/trip-event-points-model.js";
import FilterModel from "./model/trip-event-filter-model.js";

const headerElement = document.querySelector(`.page-header`);
const tripMainElementInHeader = headerElement.querySelector(`.trip-main`);
const tripControls = tripMainElementInHeader.querySelector(`.trip-main__trip-controls`);
const tripView = tripControls.querySelector(`.trip-view`);

const pageMainElement = document.querySelector(`.page-main`);
const pageBodyContainer = pageMainElement.querySelector(`.page-body__container`);

generateOffersInRoutPoints();
generateDescriptionsInCities();
generatePhotosInCities();

const tripEvents = new Array(3).fill().map(generateEvent);

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

const handleNewTripEventFormClose = () => {
  siteMenuComponent.getElement().querySelector(`#${MenuItems.TABLE}]`).disabled = false;
  siteMenuComponent.setMenuItem(MenuItems.TABLE);
};

const handleSiteMenuClick = (menuItemId) => {
  switch (menuItemId) {
    case MenuItems.ADD_NEW_TRIP_EVENT:
      // Скрыть статистику
      boardPresenter.destroy();
      filterModel.setFilter(UpdateTypeForRerender.MAJOR, FilterType.EVERYTHING);
      boardPresenter.init();
      boardPresenter.createNewTripEvent(handleNewTripEventFormClose);
      siteMenuComponent.getElement(`#${MenuItems.TABLE}]`).disabled = true;
      break;
    case MenuItems.TABLE:
      // Показать доску
      // Скрыть статистику
      break;
    case MenuItems.STATISTICS:
      // Скрыть доску
      // Показать статистику
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

filterPresenter.init();
boardPresenter.init(tripEvents);

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  boardPresenter.createNewTripEvent();
});
