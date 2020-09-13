import SmartView from "./smart.js";
import flatpickr from "flatpickr";

import "../../node_modules/flatpickr/dist/flatpickr.min.css";

import {
  ROUTE_POINT_TYPES,
  CITIES
} from "../const.js";

const BLANK_TRIP_EVENT = {
  destination: null,
  routPointTypeGroupName: null,
  routPointType: null,
  dateStart: null,
  dateEnd: null,
  price: null
};

const createDestinationPointsTemplate = (city) => {
  return `<option value="${city}"></option>`;
};

export const getTripEventItemHeaderEditTemplate = (travelEvent, destinationsPoints) => {
  const {
    routPointType,
    routPointTypeGroupName,
    dateStart,
    dateEnd,
    price,
    isFavorite
  } = travelEvent;

  const destinationPointsValues = destinationsPoints.map((point) => createDestinationPointsTemplate(point.city)).join(``);

  return (`<header class="event__header">
              <div class="event__type-wrapper">
                <label class="event__type  event__type-btn" for="event-type-toggle-1">
                  <span class="visually-hidden">Choose event type</span>
                  <img class="event__type-icon" width="17" height="17" src="img/icons/${routPointType.name.toLowerCase()}.png" alt="Event type icon">
                </label>
                <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                <div class="event__type-list">
                  <fieldset class="event__type-group event__type-group-transfer">
                    <legend class="visually-hidden">Transfer</legend>
                    ${Object.values(ROUTE_POINT_TYPES.transfer)
                      .map((value) =>`<div class="event__type-item">
                      <input
                        id="event-type-${value.name.toLowerCase()}-1"
                        class="event__type-input  visually-hidden"
                        type="radio"
                        name="event-type"
                        value="${value.name.toLowerCase()}"
                        ${routPointType.name.toLowerCase() === value.name.toLowerCase() ? `checked` : ``}>
                      <label class="event__type-label  event__type-label--${value.name.toLowerCase()}" for="event-type-${value.name.toLowerCase()}-1">
                        ${value.name}
                      </label>
                    </div>`).join(``)}
                  </fieldset>

                  <fieldset class="event__type-group event__type-group-activity">
                    <legend class="visually-hidden">Activity</legend>

                    ${Object.values(ROUTE_POINT_TYPES.activity)
                     .map((value) =>`<div class="event__type-item">
                      <input
                        id="event-type-${value.name.toLowerCase()}-1"
                        class="event__type-input  visually-hidden"
                        type="radio"
                        name="event-type"
                        value="${value.name.toLowerCase()}"
                        ${routPointType.name.toLowerCase() === value.name.toLowerCase() ? `checked` : ``}>
                      <label class="event__type-label  event__type-label--${value.name.toLowerCase()}" for="event-type-${value.name.toLowerCase()}-1">
                        ${value.name}
                      </label>
                    </div>`).join(``)}
                  </fieldset>
              </div>
              </div>

              <div class="event__field-group  event__field-group--destination">
                <label
                  class="event__label  event__type-output"
                  for="event-destination-1">
                  ${routPointType.name} ${routPointTypeGroupName === `transfer` ? ` to` : ` in`}
                </label>
                <input
                  class="event__input  event__input--destination"
                  id="event-destination-1"
                  type="text"
                  name="event-destination"
                  list="destination-list-1"
                  value=""
                  style="background-image: url(&quot;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABHklEQVQ4EaVTO26DQBD1ohQWaS2lg9JybZ+AK7hNwx2oIoVf4UPQ0Lj1FdKktevIpel8AKNUkDcWMxpgSaIEaTVv3sx7uztiTdu2s/98DywOw3Dued4Who/M2aIx5lZV1aEsy0+qiwHELyi+Ytl0PQ69SxAxkWIA4RMRTdNsKE59juMcuZd6xIAFeZ6fGCdJ8kY4y7KAuTRNGd7jyEBXsdOPE3a0QGPsniOnnYMO67LgSQN9T41F2QGrQRRFCwyzoIF2qyBuKKbcOgPXdVeY9rMWgNsjf9ccYesJhk3f5dYT1HX9gR0LLQR30TnjkUEcx2uIuS4RnI+aj6sJR0AM8AaumPaM/rRehyWhXqbFAA9kh3/8/NvHxAYGAsZ/il8IalkCLBfNVAAAAABJRU5ErkJggg==&quot;); background-repeat: no-repeat; background-attachment: scroll; background-size: 16px 18px; background-position: 98% 50%; cursor: auto;">
                <datalist id="destination-list-1">
                  ${destinationPointsValues}
                </datalist>
              </div>

              <div class="event__field-group  event__field-group--time">
                <label class="visually-hidden" for="event-start-time-1">
                  From
                </label>
                <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateStart.getDate()}/${dateStart.getMonth()}/${dateStart.getFullYear()} ${dateStart.getHours()}:${dateStart.getMinutes()}">
                —
                <label class="visually-hidden" for="event-end-time-1">
                  To                </label>
                <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateEnd.getDate()}/${dateEnd.getMonth()}/${dateEnd.getFullYear()} ${dateEnd.getHours()}:${dateEnd.getMinutes()}">
              </div>

              <div class="event__field-group  event__field-group--price">
                <label class="event__label" for="event-price-1">
                  <span class="visually-hidden">Price</span>
                  €
                </label>
                <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
              </div>

              <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
              <button class="event__reset-btn" type="reset">Delete</button>
              <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? `checked` : ``}>
              <label class="event__favorite-btn" for="event-favorite-1">
                <span class="visually-hidden">Add to favorite</span>
                <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                  <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
                </svg>
              </label>
              <button class="event__rollup-btn" type="button" data-select-like-a-boss="1">
                <span class="visually-hidden">Open event</span>
              </button>
            </header>`);
};

const createEventOffersItemInEditFormTemplate = (offer) => {
  const {title, price} = offer;

  return `<div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.name}-1" type="checkbox" name="event-offer-${offer.name}" checked="">
            <label class="event__offer-label" for="event-offer-${offer.name}-1">
              <span class="event__offer-title">${title}</span>
              +
              €&nbsp;<span class="event__offer-price">${price}</span>
            </label>
          </div>`;
};

/**
 * Returns a markup list of offers.
 * @param {Object[]} offers - The offers in the trip event.
 * @return {String} Returns markup block of offers
 */
export const createEventOffersInEditFormTemplate = (offers) => {

  const offersBlockInEditForm = offers.map((offer) => createEventOffersItemInEditFormTemplate(offer)).join(``);

  return (`<section class="event__section  event__section--offers">
              <h3 class="event__section-title  event__section-title--offers">Offers</h3>
              <div class="event__available-offers">
                  <!--container for available offers-->
                  ${offersBlockInEditForm}
              </div>
            </section>`);
};

const createEventPhotoTemplate = (photoSrc) => {
  return (`<img class="event__photo" src="${photoSrc}" alt="Event photo">`);
};

export const getEventItemDestinationInEditFormTemplate = (travelEvent) => {

  const {destination} = travelEvent;
  const {photos, description} = destination;

  const photosBlockTemplate = photos
    .map((photo) => createEventPhotoTemplate(photo))
    .join(``);

  return (`${!description || !photos ? `` : `<section class="event__section  event__section--destination">
              <h3 class="event__section-title  event__section-title--destination">Destination</h3>
              <p class="event__destination-description">${description}</p>

              <div class="event__photos-container">
                <div class="event__photos-tape">
                ${photosBlockTemplate}
                </div>
              </div>
            </section>`}`);
};

export const createTripEventItemEditTemplate = (data, destinationPoints) => {
  const {
    routPointType,
    isOffersExist,
    isDescriptionOfDestinationExist
  } = data;

  return (`<form class="trip-events__item  event  event--edit" action="#" method="post">
            ${getTripEventItemHeaderEditTemplate(data, destinationPoints)}
            <section class="event__details">
              ${isOffersExist ? createEventOffersInEditFormTemplate(routPointType.offers) : ``}
              ${isDescriptionOfDestinationExist ? `` : getEventItemDestinationInEditFormTemplate(data)}
            </section>
          </form>`);
};

export default class TripEventEdit extends SmartView {
  constructor(travelEvent = Object.assign({}, BLANK_TRIP_EVENT), destinationPoints) {
    super();
    this._data = TripEventEdit.parseTripEventToData(travelEvent);
    this._destinationPoints = destinationPoints;

    this._eventTypeToggleTransferHandler = this._eventTypeToggleTransferHandler.bind(this);
    this._eventTypeToggleActivityHandler = this._eventTypeToggleActivityHandler.bind(this);
    this._destinationToggleHandler = this._destinationToggleHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._priceInputHandler = this._priceInputHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createTripEventItemEditTemplate(this._data, this._destinationPoints);
  }

  reset(tripEvent) {
    this.updateData(
        TripEventEdit.parseTripEventToData(tripEvent)
    );
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, this._favoriteClickHandler);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement(`.event__save-btn`).addEventListener(`submit`, this._formSubmitHandler);
  }

  _eventTypeToggleTransferHandler(evt) {
    evt.preventDefault();
    const value = evt.target.value;
    this.updateData({
      routPointTypeGroupName: `transfer`,
      routPointType: ROUTE_POINT_TYPES.transfer[value],
      isOffersExist: ROUTE_POINT_TYPES.transfer[value].offers.length !== 0
    });
  }

  _eventTypeToggleActivityHandler(evt) {
    evt.preventDefault();

    let dropDownValue = evt.target.value;

    if (dropDownValue === `check-in`) {
      dropDownValue = `checkin`;
    }

    this.updateData({
      routPointTypeGroupName: `activity`,
      routPointType: ROUTE_POINT_TYPES.activity[dropDownValue],
      isOffersExist: ROUTE_POINT_TYPES.activity[dropDownValue].offers.length !== 0
    });

    // console.log(this._data);
  }

  _destinationToggleHandler(evt) {
    evt.preventDefault();

    const inputValue = evt.target.value;
    let destinationDescription = ``;
    let destinationPhotos = [];

    CITIES.forEach((destinationItem) => {
      if (destinationItem.city === inputValue) {
        destinationDescription = destinationItem.description;
        destinationPhotos = destinationItem.photos;
      }
    });

    this.updateData({
      destination: Object.assign(
          {},
          this._data.destination,
          {city: evt.target.value},
          {description: destinationDescription},
          {photos: destinationPhotos})
    });
  }

  _setInnerHandlers() {
    this.getElement(`.event__type-group-transfer`)
      .addEventListener(`change`, this._eventTypeToggleTransferHandler);
    this.getElement(`.event__type-group-activity`)
      .addEventListener(`change`, this._eventTypeToggleActivityHandler);
    this.getElement(`.event__input--destination`)
      .addEventListener(`change`, this._destinationToggleHandler);
    this.getElement()
      .querySelector(`.event__input--price`)
      .addEventListener(`input`, this._priceInputHandler);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setFormSubmitHandler(this._callback.formSubmit);
  }

  _priceInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      price: evt.target.value
    }, true);
  }

  _favoriteClickHandler() {
    this._callback.favoriteClick();
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(TripEventEdit.parseDataToTripEvent(this._data));
  }

  static parseTripEventToData(tripEvent) {
    return Object.assign(
        {},
        tripEvent,
        {
          isOffersExist: tripEvent.routPointType.offers.length !== 0,
          isDescriptionOfDestinationExist: !tripEvent.destination
        });
  }

  static parseDataToTripEvent(data) {
    const tripEvent = Object.assign({}, data);

    if (!tripEvent.isOffersExist) {
      tripEvent.routPointType.offers = [];
    }

    if (!data.isDescriptionOfDestinationExist) {
      tripEvent.description = ``;
    }

    delete tripEvent.isOffersExist;
    delete tripEvent.isDescriptionOfDestinationExist;

    return tripEvent;
  }
}
