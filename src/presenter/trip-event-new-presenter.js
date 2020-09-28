import TripEventEditView from "../view/trip-event-edit.js";
import {generateEvent} from "../mock/trip-event.js";

import {
  remove,
  renderDOMElement,
  RenderPosition
} from "../utils/render.js";

import {
  UserActionForModel,
  UpdateTypeForRerender,
} from "../const.js";

const BLANK_TRIP_EVENT = generateEvent();

export default class TripEventNewPresenter {
  constructor(tripEventListContainer, changeData) {
    this._tripEventListContainer = tripEventListContainer;
    this._changeData = changeData;

    this._tripEventEditComponent = null;
    this._destroyCallback = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(callback) {
    this._destroyingCallback = callback;

    if (this._tripEventEditComponent !== null) {
      return;
    }

    this._tripEventEditComponent = new TripEventEditView(BLANK_TRIP_EVENT);
    this._tripEventEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._tripEventEditComponent.setDeleteClickHandler(this._handleDeleteClick);

    renderDOMElement(this._tripEventListContainer, this._tripEventEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener(`keydown`, this._escKeyDownHandler);
    // document.querySelector(`.trip-main__event-add-btn`).disabled = true;
  }

  destroy() {
    if (this._tripEventEditComponent === null) {
      return;
    }

    if (this._destroyingCallback !== null) {
      this._destroyingCallback();
    }

    remove(this._tripEventEditComponent);
    this._tripEventEditComponent = null;

    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _handleFormSubmit(tripEvent) {
    this._changeData(
        UserActionForModel.ADD_NEW_TRIP_EVENT,
        UpdateTypeForRerender.MAJOR,
        tripEvent
    );
    this.destroy();
  }

  _handleDeleteClick() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this.destroy();
    }
  }
}
