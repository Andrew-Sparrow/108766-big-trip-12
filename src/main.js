import {
  CITIES,
  SECOND_ELEMENT
} from "./const.js";

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

import {generateEvent} from "./mock/trip-event";
import TripEventEditItemView from "./view/trip-event-edit-item.js";
import TripSortView from "./view/trip-sort.js";
import TripDaysView from "./view/trip-days.js";
import TripDayView from "./view/trip-day.js";
import TripEventItemInDayView from "./view/trip-event-item-in-trip-days.js";
import TripEventsInDayView from "./view/trip-events-in-day.js";
import NoEventsView from "./view/no-events.js";

const headerElement = document.querySelector(`.page-header`);
const tripMainElementInHeader = headerElement.querySelector(`.trip-main`);
const tripControls = tripMainElementInHeader.querySelector(`.trip-main__trip-controls`);
const pageMainElement = document.querySelector(`.page-main`);
const pageBodyContainer = pageMainElement.querySelector(`.page-body__container`);
const tripEventsContainer = pageBodyContainer.querySelector(`.trip-events`);

const tripEvents = new Array(10).fill().map(generateEvent);

const groupsEventsByDay = groupArrayOfObjects(tripEvents, `dateStart`);

const defaultSortedDays = defaultSortEventsByGroupDays(groupsEventsByDay);
const defaultSortedEvents = defaultSortEventsItems(tripEvents);


/**
 * Renders event in list events in day.
 * @param {Object} containerForRendering - containerForRendering.
 * @param {Object} event - event.
 */
const renderEventInDay = (containerForRendering, event) => {
  const tripEventInDay = new TripEventItemInDayView(event);

  const tripEditComponent = new TripEventEditItemView(event, CITIES);

  const replaceCardToForm = () => {
    containerForRendering.replaceChild(tripEditComponent.getElement(), tripEventInDay.getElement());
  };

  const replaceFormToCard = () => {
    containerForRendering.replaceChild(tripEventInDay.getElement(), tripEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  tripEventInDay.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceCardToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  tripEditComponent.getElement().querySelector(`.event__save-btn`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToCard();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  renderDOMElement(containerForRendering, tripEventInDay.getElement(), RenderPosition.BEFOREEND);
};

/**
 * Renders day in day's list.
 * @param {Object} containerForRendering - containerForRendering.
 * @param {Object} day - day.
 * @param {Number} index - index of day in list of days.
 */
const renderDay = (containerForRendering, day, index) => {
  const events = day[SECOND_ELEMENT];

  const tripEventsInDay = new TripEventsInDayView();
  const tripDay = new TripDayView(day, index);

  events.forEach((tripEvent) => renderEventInDay(tripEventsInDay.getElement(), tripEvent));

  renderDOMElement(tripDay.getElement(), tripEventsInDay.getElement(), RenderPosition.BEFOREEND);

  renderDOMElement(containerForRendering, tripDay.getElement(), RenderPosition.BEFOREEND);
};

/**
 * Renders days in list events in day.
 * @param {Object} containerForRendering - containerForRendering.
 * @param {Object[]} days - days.
 */
export const renderDays = (containerForRendering, days) => {
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

renderDOMElement(tripControls, new HeaderElementTripTabsView().getElement(), RenderPosition.AFTERBEGIN);

renderDOMElement(tripControls, new HeaderFiltersView().getElement(), RenderPosition.BEFOREEND);

renderDays(tripEventsContainer, defaultSortedDays);
