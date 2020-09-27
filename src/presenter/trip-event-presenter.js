import TripEventView from "../view/trip-event.js";
import TripEventEditView from "../view/trip-event-edit.js";

import {
  renderDOMElement,
  RenderPosition,
  replace,
  remove
} from "../utils/render.js";

import {
  CITIES,
  UpdateTypeForRerender,
  UserActionForModel
} from "../const.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export default class TripEventPresenter {
  constructor(tripEventsListContainer, changeData, changeMode) {
    this._tripEventsListContainer = tripEventsListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._tripEventComponent = null;
    this._tripEventEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(tripEvent) {
    this._tripEvent = tripEvent;

    const prevTripEventComponent = this._tripEventComponent;
    const prevTripEventEditComponent = this._tripEventEditComponent;

    this._tripEventComponent = new TripEventView(this._tripEvent);
    this._tripEventEditComponent = new TripEventEditView(this._tripEvent);

    this._tripEventComponent.setRollupClickHandler(this._handleEditClick);
    this._tripEventEditComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._tripEventEditComponent.setFormSubmitHandler(this._handleFormSubmit);

    this._tripEventEditComponent.setDeleteClickHandler(this._handleDeleteClick);

    if (prevTripEventComponent === null || prevTripEventEditComponent === null) {
      renderDOMElement(this._tripEventsListContainer, this._tripEventComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._tripEventComponent, prevTripEventComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._tripEventEditComponent, prevTripEventEditComponent);
    }

    remove(prevTripEventComponent);
    remove(prevTripEventEditComponent);
  }

  destroy() {
    remove(this._tripEventComponent);
    remove(this._tripEventEditComponent);
    remove(this._escKeyDownHandler);
  }

  resetView() {
    if (this._mode === Mode.EDITING) {
      this._replaceFormToCard();
    }
  }

  _replaceCardToForm() {
    replace(this._tripEventEditComponent, this._tripEventComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToCard() {
    replace(this._tripEventComponent, this._tripEventEditComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._tripEventEditComponent.reset(this._tripEvent);
      this._replaceFormToCard();
    }
  }

  _handleEditClick() {
    this._replaceCardToForm();
  }

  _handleFavoriteClick() {
    this._tripEvent = Object.assign(
        {},
        this._tripEvent,
        {isFavorite: !this._tripEvent.isFavorite}
    );
    this._changeData(
        UserActionForModel.UPDATE_TRIP_EVENT,
        UpdateTypeForRerender.PATCH,
        this._tripEvent
    );
  }

  _handleDeleteClick(tripEvent) {
    this._changeData(
        UserActionForModel.DELETE_TRIP_EVENT,
        UpdateTypeForRerender.MAJOR,
        tripEvent
    );
  }

  _handleFormSubmit(tripEvent) {
    this._changeData(
        UserActionForModel.UPDATE_TRIP_EVENT,
        UpdateTypeForRerender.MAJOR,
        tripEvent
    );
    this._replaceFormToCard();
  }
}
