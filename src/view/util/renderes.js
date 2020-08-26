import {SECOND_ELEMENT} from "../../const.js";

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

const renderEventInDay = (containerForRendering, event) => {
  const tripEventInDay = new TripEventItemInDayView(event);
  renderDOMElement(containerForRendering, tripEventInDay.getElement(), RenderPosition.BEFOREEND);
};

const renderDay = (containerForRendering, day, index) => {
  const events = day[SECOND_ELEMENT];

  const tripEventsInDay = new TripEventsInDayView();
  const tripDay = new TripDayView(day, index);

  events.forEach((tripEvent) => renderEventInDay(tripEventsInDay.getElement(), tripEvent));

  renderDOMElement(tripDay.getElement(), tripEventsInDay.getElement(), RenderPosition.BEFOREEND);

  renderDOMElement(containerForRendering, tripDay.getElement(), RenderPosition.BEFOREEND);
};

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
