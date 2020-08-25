import {
  renderDOMElement,
  RenderPosition,
  groupArrayOfObjects,
  defaultSortEventsByGroupDays,
  defaultSortEventsItems
} from "./view/util/utils.js";

import HeaderElementTripInfoView from "./view/header-info.js";
import HeaderElementTripTabsView from "./view/header-trip-tabs.js";
import HeaderFiltersView from "./view/header-filters.js";
import TripSortView from "./view/trip-sort.js";
import TripEventItemEditView from "./view/trip-event-edit-item.js";
import TripDays from "./view/trip-days.js";

import {generateEvent} from "./mock/trip-event";
import {
  CITIES,
  FIRST_ELEMENT,
} from "./const";

const headerElement = document.querySelector(`.page-header`);
const tripMainElementInHeader = headerElement.querySelector(`.trip-main`);
const tripViewElement = tripMainElementInHeader.querySelector(`.trip-view`);
const filterEventsElement = tripMainElementInHeader.querySelector(`.filter-events`);
const pageMainElement = document.querySelector(`.page-main`);
const pageBodyContainerElement = pageMainElement.querySelector(`.page-body__container`);
const tripEventsElement = pageBodyContainerElement.querySelector(`.trip-events`);

const tripEvents = new Array(10).fill().map(generateEvent);

const groupsEventsByDay = groupArrayOfObjects(tripEvents, `dateStart`);

const defaultSortedDays = defaultSortEventsByGroupDays(groupsEventsByDay);
const defaultSortedEvents = defaultSortEventsItems(tripEvents);

renderDOMElement(tripMainElementInHeader, new HeaderElementTripInfoView(defaultSortedDays, defaultSortedEvents).getElement(), RenderPosition.AFTERBEGIN);

const headerElementTripTabsComponent = new HeaderElementTripTabsView();

renderDOMElement(tripViewElement, headerElementTripTabsComponent.getElement(), RenderPosition.AFTEREND);

const headerFiltersComponent = new HeaderFiltersView();

renderDOMElement(filterEventsElement, headerFiltersComponent.getElement(), RenderPosition.AFTEREND);

const tripSortComponent = new TripSortView();

renderDOMElement(tripEventsElement, tripSortComponent.getElement(), RenderPosition.AFTERBEGIN);

const tripEventItemEditComponent = new TripEventItemEditView(tripEvents[FIRST_ELEMENT], CITIES);

renderDOMElement(tripEventsElement, tripEventItemEditComponent.getElement(), RenderPosition.BEFOREEND);

const tripDaysComponent = new TripDays(defaultSortedDays);

renderDOMElement(tripEventsElement, tripDaysComponent.getElement(), RenderPosition.BEFOREEND);
