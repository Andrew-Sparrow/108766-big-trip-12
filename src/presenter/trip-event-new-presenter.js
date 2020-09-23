import TripEventEditView from "../view/trip-event-edit.js";
import {generateId} from "../mock/trip-event.js";

import {
  remove,
  renderDOMElement,
  RenderPosition
} from "../utils/render.js";

import {
  UserActionForModel,
  UpdateTypeForRerender,
  CITIES
} from "../const.js";

const BLANK_TRIP_EVENT = {
  id: generateId(),
  destination: {
    city: `Amsterdam`,
    description: ``,
    photos: []
  },
  routPointTypeGroupName: `transfer`,
  routPointType: {
    name: `Transport`,
    offers: []
  },
  dateStart: new Date(),
  dateEnd: new Date(),
  price: 0
};

export default class TripEventNewPresenter {
  constructor(tripEventListContainer, changeData) {
    this._tripEventListContainer = tripEventListContainer;
    this._changeData = changeData;

    this._tripEventEditComponent = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init() {

    if (this._tripEventEditComponent !== null) {
      return;
    }

    this._tripEventEditComponent = new TripEventEditView(BLANK_TRIP_EVENT, CITIES);
    // console.log(this._tripEventEditComponent);
    this._tripEventEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._tripEventEditComponent.setDeleteClickHandler(this._handleDeleteClick());

    renderDOMElement(this._tripEventListContainer, this._tripEventEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  destroy() {
    if (this._tripEventEditComponent === null) {
      return;
    }

    remove(this._tripEventEditComponent);
    this._tripEventEditComponent = null;

    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _handleFormSubmit(tripEvent) {
    this._changeData(
        UserActionForModel.ADD_TRIP_EVENT,
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
