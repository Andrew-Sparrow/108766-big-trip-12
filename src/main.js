import {
  generateDescriptionsInCities,
  generateOffersInRoutPoints,
  generatePhotosInCities,
  groupArrayOfObjects,
} from "./utils/utils.js";

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
import HeaderFiltersView from "./view/header-filters.js";

import {generateEvent} from "./mock/trip-event";
import BoardPresenter from "./presenter/board.js";

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

const groupsEventsByDay = groupArrayOfObjects(tripEvents, `dateStart`);

const defaultSortedDays = defaultSortEventsByGroupDays(groupsEventsByDay);
const defaultSortedEvents = defaultSortEventsItems(tripEvents);

const boardPresenter = new BoardPresenter(pageBodyContainer);

renderDOMElement(tripMainElementInHeader, new HeaderElementTripInfoView(defaultSortedDays, defaultSortedEvents), RenderPosition.AFTERBEGIN);

renderDOMElement(tripView, new HeaderElementTripTabsView(), RenderPosition.AFTEREND);

renderDOMElement(tripControls, new HeaderFiltersView(), RenderPosition.BEFOREEND);

boardPresenter.init(tripEvents);
