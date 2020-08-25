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
import TripEventEditItemView from "./view/trip-event-edit-item.js";
import TripDaysView from "./view/trip-days.js";

import {generateEvent} from "./mock/trip-event";

const headerElement = document.querySelector(`.page-header`);
const tripMainElementInHeader = headerElement.querySelector(`.trip-main`);
const tripViewElement = tripMainElementInHeader.querySelector(`.trip-view`);
const filterEventsElement = tripMainElementInHeader.querySelector(`.filter-events`);
const pageMainElement = document.querySelector(`.page-main`);
const pageBodyContainer = pageMainElement.querySelector(`.page-body__container`);
const tripEventsContainer = pageBodyContainer.querySelector(`.trip-events`);

const tripEvents = new Array(0).fill().map(generateEvent);

const groupsEventsByDay = groupArrayOfObjects(tripEvents, `dateStart`);

const defaultSortedDays = defaultSortEventsByGroupDays(groupsEventsByDay);
// console.log(defaultSortedDays);
const defaultSortedEvents = defaultSortEventsItems(tripEvents);

renderDOMElement(tripMainElementInHeader, new HeaderElementTripInfoView(defaultSortedDays, defaultSortedEvents).getElement(), RenderPosition.AFTERBEGIN);

const headerElementTripTabsComponent = new HeaderElementTripTabsView();

renderDOMElement(tripViewElement, headerElementTripTabsComponent.getElement(), RenderPosition.AFTEREND);

const headerFiltersComponent = new HeaderFiltersView();

renderDOMElement(filterEventsElement, headerFiltersComponent.getElement(), RenderPosition.AFTEREND);

// const tripSortComponent = new TripSortView();
//
// renderDOMElement(tripEventsContainer, tripSortComponent.getElement(), RenderPosition.AFTERBEGIN);

// const tripEventItemEditComponent = new TripEventEditItemView(tripEvents[FIRST_ELEMENT], CITIES);

// renderDOMElement(tripEventsContainer, tripEventItemEditComponent.getElement(), RenderPosition.BEFOREEND);

// const tripDaysComponent = new TripDaysView(defaultSortedDays);

// renderDOMElement(tripEventsContainer, tripDaysComponent.getElement(), RenderPosition.BEFOREEND);

const renderDaysContainer = (placeForRendering, days) => {

  if (days.length === 0) {
    console.log(`Click New Event to create your first point`);
    return;
  }

  const tripSortComponent = new TripSortView();
  renderDOMElement(placeForRendering, tripSortComponent.getElement(), RenderPosition.AFTERBEGIN);

  const daysComponent = new TripDaysView(days);
  renderDOMElement(placeForRendering, daysComponent.getElement(), RenderPosition.BEFOREEND);
};

renderDaysContainer(tripEventsContainer, defaultSortedDays);
