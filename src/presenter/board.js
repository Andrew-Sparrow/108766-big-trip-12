import BoardView from "../view/board.js";
import SortTripView from "../view/sort-trip.js";
import TripDaysListView from "../view/trip-days-list.js";
import NoEventsView from "../view/no-events.js";
import TripDayView from "../view/trip-day.js";
import TripEventEditItemView from "../view/trip-event-edit-item.js";

import {
  renderDOMElement,
  RenderPosition,
  replace
} from "../view/util/render.js";

import TripEventItemInDayView from "../view/trip-event-item-in-trip-days.js";
import TripEventsInDayView from "../view/trip-events-in-day.js";

import {
  CITIES,
  EVENTS_OF_DAY
} from "../const.js";

export default class Board {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;

    this._boardComponent = new BoardView();
    this._sortComponent = new SortTripView();
    this._tripDaysListComponent = new TripDaysListView();
    this._noEventComponent = new NoEventsView();
  }

  init(boardEvents) {
    this._boardEvents = boardEvents.slice();

    renderDOMElement(this._boardContainer, this._boardComponent, RenderPosition.BEFOREEND);

    this._renderBoard();
  }

  /**
   * Renders event in list events in day.
   * @param {Object} containerForRendering - containerForRendering.
   * @param {Object} event - event.
   */
  _renderEventInDay(containerForRendering, event) {
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
  }

  _renderSort() {
    renderDOMElement(this._boardComponent, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  /**
   * Renders EventsInDay.
   * @param {Object[]} events - list of events.
   * @param {Object} tripEventsInDay - container for tripEvents items.
   */
  _renderEventsInDay(events, tripEventsInDay) {
    events.forEach((tripEvent) => this._renderEventInDay(tripEventsInDay, tripEvent));
  }

  /**
  * Renders dayProperties in dayProperties's list.
  * @param {Object} containerForRendering - containerForRendering.
  * @param {Object[]} dayProperties - dayProperties.
  * @param {Number} index - index of dayProperties in list of days.
  */
  _renderDay(containerForRendering, dayProperties, index) {
    const events = dayProperties[EVENTS_OF_DAY];

    const tripEventsInDayComponent = new TripEventsInDayView();
    const tripDay = new TripDayView(dayProperties, index);

    this._renderEventsInDay(events, tripEventsInDayComponent);

    renderDOMElement(tripDay, tripEventsInDayComponent, RenderPosition.BEFOREEND);

    renderDOMElement(containerForRendering, tripDay, RenderPosition.BEFOREEND);
  }

  // Renders days in board of day.
  _renderDaysList() {
    renderDOMElement(this._boardComponent, this._tripDaysListComponent, RenderPosition.BEFOREEND);

    this._boardEvents.forEach((dayInListOfEvents, index) => this._renderDay(this._tripDaysListComponent, dayInListOfEvents, index));
  }

  _renderNoEvents() {
    renderDOMElement(this._boardComponent, this._noEventComponent, RenderPosition.BEFOREEND);
  }

  _renderBoard() {
    if (this._boardEvents.length === 0) {
      this._renderNoEvents();
      return;
    }

    this._renderSort();
    this._renderDaysList();
  }
}
