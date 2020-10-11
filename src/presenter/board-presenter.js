import BoardView from "../view/board.js";
import SortTripView from "../view/sort-trip.js";
import TripDaysListView from "../view/trip-days-list.js";
import NoTripEvents from "../view/no-trip-events.js";
import TripDayPresenter from "./trip-day-presenter.js";
import TripEventNewPresenter from "./trip-event-new-presenter.js";
import LoadingView from "../view/loading.js";

import {filterTripEvents} from "../utils/utils.js";

import {
  sortPriceDown,
  sortDateDown,
  defaultSortEventsByGroupDays,
} from "../utils/trip-event-utils.js";

import {
  renderDOMElement,
  RenderPosition,
  remove
} from "../utils/render-utils.js";

import {
  SortType,
  WITHOUT_DAY,
  UpdateTypeForRerender,
  UserActionForModel
} from "../const.js";

import {groupArrayOfObjects} from "../utils/utils.js";


export default class BoardPresenter {
  constructor(boardContainer, tripEventModel, filterModel) {
    this._boardContainer = boardContainer;
    this._tripEventModel = tripEventModel;
    this._filterModel = filterModel;

    this._boardComponent = new BoardView();
    this._sortComponent = new SortTripView();
    this._tripDaysListComponent = new TripDaysListView();
    this._noTripEventComponent = new NoTripEvents();
    this._loadingComponent = new LoadingView();

    this._tripDaysPresenterCollector = {};
    this._tripEventsPresenterCollector = {};
    this._isLoading = true;

    this._currentSortType = SortType.DEFAULT;

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);

    this._addTripEventPresenterToCollection = this._addTripEventPresenterToCollection.bind(this);

    this._changeableBoardEvents = this._tripEventModel.getTripEvents().slice();
    this._groupsEventsByDay = groupArrayOfObjects(this._changeableBoardEvents, `dateStart`);
    this._defaultSortedDays = defaultSortEventsByGroupDays(this._groupsEventsByDay);

    this._boardDays = this._defaultSortedDays;

    this._tripEventNewPresenter = new TripEventNewPresenter(this._tripDaysListComponent, this._handleViewAction);
  }

  init() {
    renderDOMElement(this._boardContainer, this._boardComponent, RenderPosition.BEFOREEND);

    this._tripEventModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._renderBoard();
  }

  destroy() {
    this._clearBoard({resetSortType: true});
    remove(this._tripDaysListComponent);
    remove(this._boardComponent);

    this._tripEventModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  createNewTripEvent(callback) {
    this._tripEventNewPresenter.init(callback);
  }

  _getTripDays() {
    const filterType = this._filterModel.getActiveFilter();

    const tripEvents = this._tripEventModel.getTripEvents();
    const filteredTripEvents = filterTripEvents[filterType](tripEvents);

    switch (this._currentSortType) {
      case (SortType.PRICE_DOWN):
        this._boardDays = filteredTripEvents.slice();
        this._boardDays.sort(sortPriceDown);
        this._boardDays = [[WITHOUT_DAY, this._boardDays]];
        break;
      case (SortType.DATE_DOWN):
        this._boardDays = filteredTripEvents.slice();
        this._boardDays.sort(sortDateDown);
        this._boardDays = [[WITHOUT_DAY, this._boardDays]];
        break;
      default:
        this._changeableBoardEvents = filteredTripEvents.slice();
        this._groupsEventsByDay = groupArrayOfObjects(this._changeableBoardEvents, `dateStart`);
        this._defaultSortedDays = defaultSortEventsByGroupDays(this._groupsEventsByDay);

        this._boardDays = this._defaultSortedDays;
        break;
    }
    return this._boardDays;
  }

  _addTripEventPresenterToCollection(tripEvent, tripEventPresenter) {
    this._tripEventsPresenterCollector[tripEvent.id] = tripEventPresenter;
  }

  _renderSortBlock() {
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    renderDOMElement(this._boardComponent, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderLoading() {
    renderDOMElement(this._boardComponent, this._loadingComponent, RenderPosition.BEFOREEND);
  }

  // Renders days in board of day.
  _renderDaysList() {
    if (this._getTripDays().length === 0) {
      this._renderNoEvents();
      return;
    }

    renderDOMElement(this._boardComponent, this._tripDaysListComponent, RenderPosition.BEFOREEND);

    // groupDaysEvents
    this._getTripDays().forEach((dayInListOfEvents, index) => this._renderDay(this._tripDaysListComponent, dayInListOfEvents, index));
  }

  _handleSortTypeChange(sortType) {

    this._currentSortType = sortType;

    // - Очищаем список
    this._clearTripDaysList();
    // this._clearBoard();

    // - Рендерим список заново
    this._renderDaysList();
    // this._renderBoard();
  }

  _clearTripDaysList() {
    Object
      .values(this._tripDaysPresenterCollector)
      .forEach((tripDayPresenter) => {
        tripDayPresenter.destroy();
      });
    this._tripDaysPresenterCollector = {};
  }

  _clearBoard({resetSortType = false} = {}) {
    this._tripEventNewPresenter.destroy();

    this._clearTripDaysList();

    remove(this._sortComponent);
    remove(this._noTripEventComponent);
    remove(this._loadingComponent);

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  /**
  * Renders dayProperties in dayProperties's list.
  * @param {Object} containerForRendering - containerForRendering.
  * @param {Object[]} dayProperties - dayProperties.
  * @param {Number} index - index of dayProperties in list of days.
  */
  _renderDay(containerForRendering, dayProperties, index) {
    const dayPresenter = new TripDayPresenter(containerForRendering, this._handleViewAction, this._addTripEventPresenterToCollection, this._handleModeChange);
    dayPresenter.init(dayProperties, index);
    this._tripDaysPresenterCollector[index] = dayPresenter;
  }

  _renderNoEvents() {
    renderDOMElement(this._boardComponent, this._noTripEventComponent, RenderPosition.BEFOREEND);
  }

  // groupDaysEvents
  _renderBoard() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    this._renderSortBlock();
    this._renderDaysList();
  }

  _handleModeChange() {
    this._tripEventNewPresenter.destroy();
    Object
      .values(this._tripEventsPresenterCollector)
      .forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionTypeForModel, updateTypeForRerender, updatedItem) {
    switch (actionTypeForModel) {
      case UserActionForModel.UPDATE_TRIP_EVENT:
        this._tripEventModel.updateTripEventPoint(updateTypeForRerender, updatedItem);
        break;
      case UserActionForModel.ADD_NEW_TRIP_EVENT:
        this._tripEventModel.addTripEvent(updateTypeForRerender, updatedItem);
        break;
      case UserActionForModel.DELETE_TRIP_EVENT:
        this._tripEventModel.deleteTripEvent(updateTypeForRerender, updatedItem);
    }
  }

  _handleModelEvent(updateTypeForRerender, data) {
    switch (updateTypeForRerender) {
      case UpdateTypeForRerender.PATCH:
        this._tripEventsPresenterCollector[data.id].init(data);
        break;
      case UpdateTypeForRerender.MINOR:
        this._clearBoard();
        this._renderBoard();
        break;
      case UpdateTypeForRerender.MAJOR:
        // - TODO добавить header
        this._clearBoard({resetSortType: true});
        this._renderBoard();
        break;
      case UpdateTypeForRerender.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderBoard();
        break;
    }
  }
}
