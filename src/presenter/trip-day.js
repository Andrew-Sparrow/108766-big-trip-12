import TripEventsInDayView from "../view/trip-events-in-day.js";
import TripDayView from "../view/trip-day.js";
import TripEventPresenter from "./trip-event.js";

import {EVENTS_OF_DAY} from "../const.js";
import {renderDOMElement, RenderPosition} from "../view/util/render.js";

export default class TripDay {
  constructor(containerForRendering) {
    this._tripDayContainer = containerForRendering;
  }

  init(dayProperties, index) {
    this._events = dayProperties[EVENTS_OF_DAY];
    this._index = index;

    this._tripEventsInDayComponent = new TripEventsInDayView();
    this._tripDay = new TripDayView(dayProperties, index);

    this._renderEventsInDay(this._events, this._tripEventsInDayComponent);

    renderDOMElement(this._tripDay, this._tripEventsInDayComponent, RenderPosition.BEFOREEND);

    renderDOMElement(this._tripDayContainer, this._tripDay, RenderPosition.BEFOREEND);
  }

  /**
   * Renders EventsInDay.
   * @param {Object[]} events - list of events.
   * @param {Object} tripEventsContainer - container for tripEvents items.
   */
  _renderEventsInDay(events, tripEventsContainer) {
    events.forEach((tripEvent) => {
      return this._renderEventInDay(tripEventsContainer, tripEvent);
    });
  }

  /**
   * Renders tripEvent in list events in day.
   * @param {Object} containerForRendering - containerForRendering.
   * @param {Object} tripEvent - tripEvent.
   */
  _renderEventInDay(containerForRendering, tripEvent) {
    const eventPresenter = new TripEventPresenter(containerForRendering);
    eventPresenter.init(tripEvent);
  }
}
