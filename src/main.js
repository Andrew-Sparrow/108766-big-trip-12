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
import TripDayView from "./view/trip-day.js";
import NoEventsView from "./view/no-events.js";

import {generateEvent} from "./mock/trip-event";

const headerElement = document.querySelector(`.page-header`);
const tripMainElementInHeader = headerElement.querySelector(`.trip-main`);
const tripViewElement = tripMainElementInHeader.querySelector(`.trip-view`);
const filterEventsElement = tripMainElementInHeader.querySelector(`.filter-events`);
const pageMainElement = document.querySelector(`.page-main`);
const pageBodyContainer = pageMainElement.querySelector(`.page-body__container`);
const tripEventsContainer = pageBodyContainer.querySelector(`.trip-events`);

const tripEvents = new Array(10).fill().map(generateEvent);

const groupsEventsByDay = groupArrayOfObjects(tripEvents, `dateStart`);

const defaultSortedDays = defaultSortEventsByGroupDays(groupsEventsByDay);
// console.log(defaultSortedDays);
const defaultSortedEvents = defaultSortEventsItems(tripEvents);

const renderDay = (containerForRendering, day, index) => {
  // console.log(day);
  const tripDay = new TripDayView(day, index);
  renderDOMElement(containerForRendering, tripDay.getElement(), RenderPosition.BEFOREEND);
};

const renderDays = (containerForRendering, days) => {
  // console.log(days);
  if (days.length === 0) {
    renderDOMElement(containerForRendering, new NoEventsView().getElement(), RenderPosition.BEFOREEND);
    return;
  }

  const tripSortComponent = new TripSortView();
  renderDOMElement(containerForRendering, tripSortComponent.getElement(), RenderPosition.BEFOREEND);

  const tripDays = new TripDaysView();
  renderDOMElement(containerForRendering, tripDays.getElement(), RenderPosition.BEFOREEND);

  days.forEach((dayInListOfEvents, index) => renderDay(tripDays.getElement(), dayInListOfEvents, index));
};

renderDOMElement(tripMainElementInHeader, new HeaderElementTripInfoView(defaultSortedDays, defaultSortedEvents).getElement(), RenderPosition.AFTERBEGIN);

renderDOMElement(tripViewElement, new HeaderElementTripTabsView().getElement(), RenderPosition.AFTEREND);

renderDOMElement(filterEventsElement, new HeaderFiltersView().getElement(), RenderPosition.AFTEREND);


renderDays(tripEventsContainer, defaultSortedDays);
