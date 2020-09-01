import BoardView from "../view/board.js";
import SortTripView from "../view/sort-trip.js";
import TripDaysListView from "../view/trip-days-list.js";
import NoEventsView from "../view/no-events.js";
import TripDayView from "../view/trip-day.js";
import TripEventEditItemView from "../view/trip-event-edit-item.js";

import {
  sortPriceDown,
  sortDateDown, defaultSortEventsByGroupDays,
} from "../view/util/trip-event.js";

import {
  renderDOMElement,
  RenderPosition,
  replace
} from "../view/util/render.js";

import TripEventItemInDayView from "../view/trip-event-item-in-trip-days.js";
import TripEventsInDayView from "../view/trip-events-in-day.js";

import {
  SortType,
  CITIES,
  EVENTS_OF_DAY,
  WITHOUT_DAY
} from "../const.js";
import {groupArrayOfObjects} from "../view/util/utils.js";

export default class Board {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;

    this._boardComponent = new BoardView();
    this._sortComponent = new SortTripView();
    this._tripDaysListComponent = new TripDaysListView();
    this._noEventComponent = new NoEventsView();

    this._currentSortType = SortType.DEFAULT;

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(boardEvents) {
    this._sourcedBoardEvents = boardEvents.slice();

    this._groupsEventsByDay = groupArrayOfObjects(boardEvents, `dateStart`);
    this._defaultSortedDays = defaultSortEventsByGroupDays(this._groupsEventsByDay);

    this._boardEvents = this._defaultSortedDays;

    renderDOMElement(this._boardContainer, this._boardComponent, RenderPosition.BEFOREEND);

    this._renderBoard();
  }

  _renderSort() {
    renderDOMElement(this._boardComponent, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
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

  _sortEvents(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    switch (sortType) {
      case SortType.PRICE_DOWN:
        this._boardEvents = this._sourcedBoardEvents.slice();
        this._boardEvents.sort(sortPriceDown);
        this._boardEvents = [[WITHOUT_DAY, this._boardEvents]];
        break;
      case SortType.DATE_DOWN:
        this._boardEvents = this._sourcedBoardEvents.slice();
        this._boardEvents.sort(sortDateDown);
        this._boardEvents = [[WITHOUT_DAY, this._boardEvents]];
        break;
      default:
        this._boardEvents = this._defaultSortedDays;
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    // - Сортируем события путешествия
    this._sortEvents(sortType);

    // - Очищаем список
    this._tripDaysListComponent.getElement().innerHTML = ``;

    // - Рендерим список заново
    this._renderDaysList();
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
    // groupDaysEvents
    this._boardEvents.forEach((dayInListOfEvents, index) => this._renderDay(this._tripDaysListComponent, dayInListOfEvents, index));
  }

  _renderNoEvents() {
    renderDOMElement(this._boardComponent, this._noEventComponent, RenderPosition.BEFOREEND);
  }

  // groupDaysEvents
  _renderBoard() {
    if (this._boardEvents.length === 0) {
      this._renderNoEvents();
      return;
    }

    this._renderSort();
    this._renderDaysList();
  }
}
