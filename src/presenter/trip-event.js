import TripEventView from "../view/trip-event.js";
import TripEventEditView from "../view/trip-event-edit.js";

import {
  renderDOMElement,
  RenderPosition,
  replace,
  remove
} from "../view/util/render.js";

import {CITIES} from "../const.js";

export default class TripEvent {
  constructor(tripEventsListContainer, changeData) {
    this._tripEventsListContainer = tripEventsListContainer;
    this._changeData = changeData;

    this._tripEventComponent = null;
    this._tripEventEditComponent = null;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(tripEvent) {
    this._tripEvent = tripEvent;

    const prevTripEventComponent = this._tripEventComponent;
    const prevTripEventEditComponent = this._tripEventEditComponent;

    this._tripEventComponent = new TripEventView(this._tripEvent);
    this._tripEventEditComponent = new TripEventEditView(this._tripEvent, CITIES);

    this._tripEventComponent.setRollupClickHandler(this._handleEditClick);
    this._tripEventEditComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._tripEventEditComponent.setFormSubmitHandler(this._handleFormSubmit);

    if (prevTripEventComponent === null || prevTripEventEditComponent === null) {
      renderDOMElement(this._tripEventsListContainer, this._tripEventComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._tripEventsListContainer.getElement().contains(prevTripEventComponent.getElement())) {
      replace(this._tripEventComponent, prevTripEventComponent);
    }

    if (this._tripEventsListContainer.getElement().contains(prevTripEventEditComponent.getElement())) {
      replace(this._tripEventEditComponent, prevTripEventEditComponent);
    }

    remove(prevTripEventComponent);
    remove(prevTripEventEditComponent);
  }

  destroy() {
    remove(this._tripEventComponent);
    remove(this._tripEventEditComponent);
  }

  _replaceCardToForm() {
    replace(this._tripEventEditComponent, this._tripEventComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  _replaceFormToCard() {
    replace(this._tripEventComponent, this._tripEventEditComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._replaceFormToCard();
    }
  }

  _handleEditClick() {
    this._replaceCardToForm();
  }

  _handleFavoriteClick() {
    this._tripEvent = Object.assign({}, this._tripEvent, {isFavorite: !this._tripEvent.isFavorite});
    // const updatedTripEvent = Object.assign({}, this._tripEvent, {isFavorite: !this._tripEvent.isFavorite});
    // console.log(this._tripEvent.isFavorite);
    // console.log(this._tripEvent.isFavorite);
    // console.log(updatedTripEvent);
    this._changeData(this._tripEvent);
    // this._changeData(updatedTripEvent);
  }

  _handleFormSubmit(tripEvent) {
    this._changeData(tripEvent);
    this._replaceFormToCard();
  }
}
