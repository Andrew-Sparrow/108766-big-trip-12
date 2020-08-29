import {
  groupArrayOfObjects,
  defaultSortEventsByGroupDays,
  defaultSortEventsItems
} from "./view/util/utils.js";

import {
  renderDOMElement,
  RenderPosition,
  replace,
  remove
} from "./view/util/render.js";

import BoardView from "./view/board.js";
import HeaderElementTripInfoView from "./view/header-info.js";
import HeaderElementTripTabsView from "./view/header-trip-tabs.js";
import HeaderFiltersView from "./view/header-filters.js";

import {generateEvent} from "./mock/trip-event";
import TripEventItemInDayView from "./view/trip-event-item-in-trip-days.js";
import TripEventEditItemView from "./view/trip-event-edit-item.js";
import TripEventsInDayView from "./view/trip-events-in-day.js";
import TripDayView from "./view/trip-day.js";
import NoEventsView from "./view/no-events.js";
import TripSortView from "./view/trip-sort.js";
import TripDaysListView from "./view/trip-days-list.js";
import {CITIES} from "./const.js";
// import TripEventEditItemView from "./view/trip-event-edit-item.js";
// import TripSortView from "./view/trip-sort.js";
// import TripDaysListView from "./view/trip-days-list.js";
// import TripDayView from "./view/trip-day.js";
// import TripEventItemInDayView from "./view/trip-event-item-in-trip-days-list.js";
// import TripEventsInDayView from "./view/trip-events-in-day.js";
// import NoEventsView from "./view/no-events.js";

const EVENTS_OF_DAY = 1;

const headerElement = document.querySelector(`.page-header`);
const tripMainElementInHeader = headerElement.querySelector(`.trip-main`);
const tripControls = tripMainElementInHeader.querySelector(`.trip-main__trip-controls`);
const tripView = tripControls.querySelector(`.trip-view`);

const pageMainElement = document.querySelector(`.page-main`);
const pageBodyContainer = pageMainElement.querySelector(`.page-body__container`);

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
  const tripEventInDayComponent = new TripEventItemInDayView(event);

  const tripEditComponent = new TripEventEditItemView(event, CITIES);

  const replaceCardToForm = () => {
    replace(tripEditComponent, tripEventInDayComponent);
  };

  const replaceFormToCard = () => {
    replace(tripEventInDayComponent, tripEditComponent);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  tripEventInDayComponent.setRollupClickHandler(() => {
    replaceCardToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  tripEditComponent.setFormSubmitHandler(() => {
    replaceFormToCard();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  renderDOMElement(containerForRendering, tripEventInDayComponent, RenderPosition.BEFOREEND);
};

/**
 * Renders dayProperties in dayProperties's list.
 * @param {Object} containerForRendering - containerForRendering.
 * @param {Object[]} dayProperties - dayProperties.
 * @param {Number} index - index of dayProperties in list of days.
 */
const renderDay = (containerForRendering, dayProperties, index) => {
  const events = dayProperties[EVENTS_OF_DAY];

  const tripEventsInDay = new TripEventsInDayView();
  const tripDay = new TripDayView(dayProperties, index);

  events.forEach((tripEvent) => renderEventInDay(tripEventsInDay.getElement(), tripEvent));

  renderDOMElement(tripDay.getElement(), tripEventsInDay.getElement(), RenderPosition.BEFOREEND);

  renderDOMElement(containerForRendering, tripDay.getElement(), RenderPosition.BEFOREEND);
};

/**
 * Renders boardDays in list events in day.
 * @param {Object} boardContainer - boardContainer.
 * @param {Object} boardDays - boardDays.
 */
export const renderBoard = (boardContainer, boardDays) => {
  const boardComponent = new BoardView();

  renderDOMElement(boardContainer, boardComponent, RenderPosition.BEFOREEND);

  if (boardDays.length === 0) {
    renderDOMElement(boardComponent, new NoEventsView(), RenderPosition.BEFOREEND);
    return;
  }

  const tripSortComponent = new TripSortView();
  renderDOMElement(boardComponent, tripSortComponent, RenderPosition.BEFOREEND);

  const tripDays = new TripDaysListView();
  renderDOMElement(boardComponent, tripDays, RenderPosition.BEFOREEND);

  boardDays.forEach((dayInListOfEvents, index) => renderDay(tripDays, dayInListOfEvents, index));
};

renderDOMElement(tripMainElementInHeader, new HeaderElementTripInfoView(defaultSortedDays, defaultSortedEvents), RenderPosition.AFTERBEGIN);

renderDOMElement(tripView, new HeaderElementTripTabsView(), RenderPosition.AFTEREND);

renderDOMElement(tripControls, new HeaderFiltersView(), RenderPosition.BEFOREEND);

renderBoard(pageBodyContainer, defaultSortedDays);
