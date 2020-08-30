import BoardView from "../view/board.js";
import SortTripView from "../view/sort-trip.js";
import TripDaysListView from "../view/trip-days-list.js";
import NoEventsView from "../view/no-events.js";
import TripDayView from "../view/trip-day.js";
import TripEventEditItemView from "../view/trip-event-edit-item.js";
import {
  renderDOMElement,
  RenderPosition
} from "../view/util/render.js";

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
    renderDOMElement(this._boardComponent, this._tripDaysListComponent, RenderPosition.BEFOREEND);
  }

  _renderSort() {
    // Метод для рендеринга сортировки
  }

  _renderDay() {
    // Метод, куда уйдёт логика созданию и рендерингу компонета дня,
    // текущая функция renderDay в main.js
  }

  _renderEventsInDay() {
    // Метод для рендеринга N-задач за раз
  }

  _renderNoEvents() {
    // Метод для рендеринга заглушки
  }

  _renderBoard() {
    if (this._boardEvents.length === 0) {
      renderDOMElement(this._boardComponent, this._noEventComponent, RenderPosition.BEFOREEND);
      return;
    }

    this._renderSort();
  }
}
