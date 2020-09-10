import AbstractView from "./abstract.js";

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
                  <fieldset class="event__type-group">
                    <legend class="visually-hidden">Transfer</legend>

                    <div class="event__type-item">
                      <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                      <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                      <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                      <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                      <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
                      <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                      <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked="">
                      <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                    </div>
                  </fieldset>

                  <fieldset class="event__type-group">
                    <legend class="visually-hidden">Activity</legend>

                    <div class="event__type-item">
                      <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                      <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                      <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                      <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                    </div>
                  </fieldset>
                </div>
              </div>

              <div class="event__field-group  event__field-group--destination">
                <label class="event__label  event__type-output" for="event-destination-1">
                  ${routPointType.name} ${routPointTypeGroupName === `transfer` ? ` to` : ` in`}
                </label>
                <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" list="destination-list-1" style="background-image: url(&quot;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABHklEQVQ4EaVTO26DQBD1ohQWaS2lg9JybZ+AK7hNwx2oIoVf4UPQ0Lj1FdKktevIpel8AKNUkDcWMxpgSaIEaTVv3sx7uztiTdu2s/98DywOw3Dued4Who/M2aIx5lZV1aEsy0+qiwHELyi+Ytl0PQ69SxAxkWIA4RMRTdNsKE59juMcuZd6xIAFeZ6fGCdJ8kY4y7KAuTRNGd7jyEBXsdOPE3a0QGPsniOnnYMO67LgSQN9T41F2QGrQRRFCwyzoIF2qyBuKKbcOgPXdVeY9rMWgNsjf9ccYesJhk3f5dYT1HX9gR0LLQR30TnjkUEcx2uIuS4RnI+aj6sJR0AM8AaumPaM/rRehyWhXqbFAA9kh3/8/NvHxAYGAsZ/il8IalkCLBfNVAAAAABJRU5ErkJggg==&quot;); background-repeat: no-repeat; background-attachment: scroll; background-size: 16px 18px; background-position: 98% 50%; cursor: auto;">
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
                <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
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
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-${offer.name}" checked="">
            <label class="event__offer-label" for="event-offer-luggage-1">
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

  return (`<section class="event__section  event__section--destination">
              <h3 class="event__section-title  event__section-title--destination">Destination</h3>
              <p class="event__destination-description">${description}</p>

              <div class="event__photos-container">
                <div class="event__photos-tape">
                ${photosBlockTemplate}
                </div>
              </div>
            </section>`);
};

export const createTripEventItemEditTemplate = (travelEvent, destinationPoints) => {
  const {
    destination,
    routPointType
  } = travelEvent;

  return (`<form class="trip-events__item  event  event--edit" action="#" method="post">
            ${getTripEventItemHeaderEditTemplate(travelEvent, destinationPoints)}
            <section class="event__details">
              ${routPointType.offers.length !== 0 ? createEventOffersInEditFormTemplate(routPointType.offers) : ``}
              ${destination.description === null ? `` : getEventItemDestinationInEditFormTemplate(travelEvent)}
            </section>
          </form>`);
};

export default class TripEventEdit extends AbstractView {
  constructor(travelEvent = Object.assign({}, BLANK_TRIP_EVENT), destinationPoints) {
    super();
    this._travelEvent = travelEvent;
    this._destinationPoints = destinationPoints;

    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
  }

  getTemplate() {
    return createTripEventItemEditTemplate(this._travelEvent, this._destinationPoints);
  }

  _favoriteClickHandler() {
    this._callback.favoriteClick();
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(this._travelEvent);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, this._favoriteClickHandler);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement(`.event__save-btn`).addEventListener(`submit`, this._formSubmitHandler);
  }
}
