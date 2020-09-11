import TripEventsInDayView from "../view/trip-events-in-day.js";
import TripDayView from "../view/trip-day.js";
import TripEventPresenter from "./trip-event.js";

import {EVENTS_OF_DAY} from "../const.js";

import {
  remove,
  renderDOMElement,
  RenderPosition
} from "../view/util/render.js";

export default class TripDay {
  constructor(containerForRendering, changeData, addToCollection) {
    this._tripDaysContainer = containerForRendering;
    this._changeData = changeData;
    this._addToCollection = addToCollection;
  }

  init(dayProperties, index) {
    this._events = dayProperties[EVENTS_OF_DAY];
    this._index = index;

    this._tripEventsInDayComponent = new TripEventsInDayView();
    this._tripDayComponent = new TripDayView(dayProperties, index);

    this._renderEventsInDay(this._events);

    renderDOMElement(this._tripDayComponent, this._tripEventsInDayComponent, RenderPosition.BEFOREEND);

    renderDOMElement(this._tripDaysContainer, this._tripDayComponent, RenderPosition.BEFOREEND);
  }

  destroy() {
    remove(this._tripDayComponent);
  }

  /**
   * Renders EventsInDay.
   * @param {Object[]} events - list of events.
   */
  _renderEventsInDay(events) {
    events.forEach((tripEvent) => {
      return this._renderTripEventInDay(this._tripEventsInDayComponent, tripEvent);
    });
  }

  /**
   * Renders tripEvent in list events in day.
   * @param {Object} containerForRendering - containerForRendering.
   * @param {Object} tripEvent - tripEvent.
   */
  _renderTripEventInDay(containerForRendering, tripEvent) {
    const tripEventPresenter = new TripEventPresenter(containerForRendering, this._changeData);
    tripEventPresenter.init(tripEvent);
    this._addToCollection(tripEvent, tripEventPresenter);
  }
}
