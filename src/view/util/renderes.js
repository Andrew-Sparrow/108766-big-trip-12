import {
  SECOND_ELEMENT,
  CITIES
} from "../../const.js";

import {
  renderDOMElement,
  RenderPosition
} from "./utils.js";

import TripEventItemInDayView from "../trip-event-item-in-trip-days.js";
import TripEventsInDayView from "../trip-events-in-day.js";
import TripDayView from "../trip-day.js";
import NoEventsView from "../no-events.js";
import TripSortView from "../trip-sort.js";
import TripDaysView from "../trip-days.js";
import TripEventEditItemView from "../trip-event-edit-item.js";

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
