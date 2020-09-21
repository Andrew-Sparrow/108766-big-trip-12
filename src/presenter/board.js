import BoardView from "../view/board.js";
import SortTripView from "../view/sort-trip.js";
import TripDaysListView from "../view/trip-days-list.js";
import NoEventsView from "../view/no-events.js";
import TripDayPresenter from "./trip-day.js";

import {
  sortPriceDown,
  sortDateDown, defaultSortEventsByGroupDays,
  calculateTotalPrice
} from "../utils/trip-event.js";

import {
  renderDOMElement,
  RenderPosition,
} from "../utils/render.js";

import {
  SortType,
  WITHOUT_DAY
} from "../const.js";
import {groupArrayOfObjects} from "../utils/utils.js";

import {updateItems} from "../utils/common.js";

export default class Board {
  constructor(boardContainer, tasksModel) {
    this._boardContainer = boardContainer;
    this._tasksModel = tasksModel;

    this._boardComponent = new BoardView();
    this._sortComponent = new SortTripView();
    this._tripDaysListComponent = new TripDaysListView();
    this._noEventComponent = new NoEventsView();

    this._tripDaysPresenterCollector = {};
    this._tripEventsPresenterCollector = {};

    this._currentSortType = SortType.DEFAULT;

    this._handleTripEventChange = this._handleTripEventChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);

    this._addTripEventPresenterToCollection = this._addTripEventPresenterToCollection.bind(this);
  }

  init(boardEvents) {
    this._sourcedBoardEvents = boardEvents.slice();

    this._changeableBoardEvents = boardEvents.slice();
    this._groupsEventsByDay = groupArrayOfObjects(this._changeableBoardEvents, `dateStart`);
    this._defaultSortedDays = defaultSortEventsByGroupDays(this._groupsEventsByDay);

    this._boardDays = this._defaultSortedDays;

    renderDOMElement(this._boardContainer, this._boardComponent, RenderPosition.BEFOREEND);

    this._renderBoard();
  }

  _getTasks() {
    return this._tasksModel.getTasks();
  }

  _addTripEventPresenterToCollection(tripEvent, tripEventPresenter) {
    this._tripEventsPresenterCollector[tripEvent.id] = tripEventPresenter;
  }

  _renderSortBlock() {
    renderDOMElement(this._boardComponent, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _sortEvents(sortType) {
    switch (sortType) {
      case SortType.PRICE_DOWN:
        this._boardDays = this._sourcedBoardEvents.slice();
        this._boardDays.sort(sortPriceDown);
        this._boardDays = [[WITHOUT_DAY, this._boardDays]];
        break;

      case SortType.DATE_DOWN:
        this._boardDays = this._sourcedBoardEvents.slice();
        this._boardDays.sort(sortDateDown);
        this._boardDays = [[WITHOUT_DAY, this._boardDays]];
        break;

      default:
        this._boardDays = this._defaultSortedDays;
        break;
    }

    this._currentSortType = sortType;
  }

  _clearTripDaysList() {
    Object
      .values(this._tripDaysPresenterCollector)
      .forEach((tripDayPresenter) => {
        tripDayPresenter.destroy();
      });
    this._tripDaysPresenterCollector = {};
  }

  // Renders days in board of day.
  _renderDaysList() {
    renderDOMElement(this._boardComponent, this._tripDaysListComponent, RenderPosition.BEFOREEND);

    // groupDaysEvents
    this._boardDays.forEach((dayInListOfEvents, index) => this._renderDay(this._tripDaysListComponent, dayInListOfEvents, index));
  }

  _handleSortTypeChange(sortType) {
    // - Сортируем события путешествия
    this._sortEvents(sortType);

    // - Очищаем список
    this._clearTripDaysList();

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
    const dayPresenter = new TripDayPresenter(containerForRendering, this._handleTripEventChange, this._addTripEventPresenterToCollection, this._handleModeChange);
    dayPresenter.init(dayProperties, index);
    this._tripDaysPresenterCollector[index] = dayPresenter;
  }

  _renderNoEvents() {
    renderDOMElement(this._boardComponent, this._noEventComponent, RenderPosition.BEFOREEND);
  }

  // groupDaysEvents
  _renderBoard() {
    if (this._boardDays.length === 0) {
      this._renderNoEvents();
      return;
    }

    this._renderSortBlock();
    this._renderDaysList();
  }

  _handleModeChange() {
    Object
      .values(this._tripEventsPresenterCollector)
      .forEach((presenter) => presenter.resetView());
  }

  /**
   * Handler for changing trip event.
   * @param {Object} updatedTripEvent - tripEvent with updated property.
   * @param {Boolean} isCardRerenderNeeded - shows is card of trip event needed to be rerendered.
   * @param {Boolean} isRerenderTripEventsListNeeded - shows is list of trip events needed to be rerendered.
   */
  _handleTripEventChange(updatedTripEvent, isCardRerenderNeeded, isRerenderTripEventsListNeeded) {

    this._changeableBoardEvents = updateItems(this._changeableBoardEvents, updatedTripEvent);
    this._sourcedBoardEvents = updateItems(this._sourcedBoardEvents, updatedTripEvent);

    // this is for favorite
    if (isCardRerenderNeeded) {
      this._tripEventsPresenterCollector[updatedTripEvent.id].init(updatedTripEvent);
    }

    if (isRerenderTripEventsListNeeded) {

      this._groupsEventsByDay = groupArrayOfObjects(this._changeableBoardEvents, `dateStart`);
      this._defaultSortedDays = defaultSortEventsByGroupDays(this._groupsEventsByDay);

      document.querySelector(`.trip-info__cost-value`).textContent = calculateTotalPrice(this._defaultSortedDays);

      this._boardDays = this._defaultSortedDays;

      this._handleSortTypeChange(this._currentSortType);
    }
  }
}
