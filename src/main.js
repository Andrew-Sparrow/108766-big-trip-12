import {render} from `./view/render.js`;
import {getHeaderElementTripInfoContainer} from `./view/header-info.js`;
import {getHeaderElementTripInfoTitleContainer} from `./view/header-title.js`;
import {getHeaderElementTripTabsContainer} from `./view/header-trip-tabs.js`;
import {getHeaderFiltersContainer} from `./view/header-filters.js`;
import {getTripSortContainer} from `./trip-sort.js`;
import {getTripEventItemContainer} from `./view/trip-event-item.js`;

const headerElement = document.querySelector(`.page-header`);
const tripMainElement = headerElement.querySelector(`.trip-main`);
const tripViewElement = tripMainElement.querySelector(`.trip-view`);
const filterEventsElement = tripMainElement.querySelector(`.filter-events`);
const pageMainElement = document.querySelector(`.page-main`);
const pageBodyContainerElement = pageMainElement.querySelector(`.page-body__container`);
const tripEventsElement = pageBodyContainerElement.querySelector(`.trip-events`);
const tripEventsTitleElement = tripEventsElement.querySelector(`.trip-events-title`);


const getTripEventItemHeaderContainer = () => {
  return (`<header class="event__header">
              <div class="event__type-wrapper">
                <label class="event__type  event__type-btn" for="event-type-toggle-1">
                  <span class="visually-hidden">Choose event type</span>
                  <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
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
                  Flight to
                </label>
                <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Geneva" list="destination-list-1" style="background-image: url(&quot;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABHklEQVQ4EaVTO26DQBD1ohQWaS2lg9JybZ+AK7hNwx2oIoVf4UPQ0Lj1FdKktevIpel8AKNUkDcWMxpgSaIEaTVv3sx7uztiTdu2s/98DywOw3Dued4Who/M2aIx5lZV1aEsy0+qiwHELyi+Ytl0PQ69SxAxkWIA4RMRTdNsKE59juMcuZd6xIAFeZ6fGCdJ8kY4y7KAuTRNGd7jyEBXsdOPE3a0QGPsniOnnYMO67LgSQN9T41F2QGrQRRFCwyzoIF2qyBuKKbcOgPXdVeY9rMWgNsjf9ccYesJhk3f5dYT1HX9gR0LLQR30TnjkUEcx2uIuS4RnI+aj6sJR0AM8AaumPaM/rRehyWhXqbFAA9kh3/8/NvHxAYGAsZ/il8IalkCLBfNVAAAAABJRU5ErkJggg==&quot;); background-repeat: no-repeat; background-attachment: scroll; background-size: 16px 18px; background-position: 98% 50%; cursor: auto;">
                <datalist id="destination-list-1">
                  <option value="Amsterdam"></option>
                  <option value="Geneva"></option>
                  <option value="Chamonix"></option>
                  <option value="Saint Petersburg"></option>
                </datalist>
              </div>

              <div class="event__field-group  event__field-group--time">
                <label class="visually-hidden" for="event-start-time-1">
                  From
                </label>
                <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="18/03/19 00:00">
                —
                <label class="visually-hidden" for="event-end-time-1">
                  To
                </label>
                <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="18/03/19 00:00">
              </div>

              <div class="event__field-group  event__field-group--price">
                <label class="event__label" for="event-price-1">
                  <span class="visually-hidden">Price</span>
                  €
                </label>
                <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
              </div>

              <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
              <button class="event__reset-btn" type="reset">Cancel</button>
            </header>`);
};

const getEventOffersContainer = () => {
  return (`<section class="event__details">
              <section class="event__section  event__section--offers">
                <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                <div class="event__available-offers">
                </div>
              </section>
            </section>`);
};

const getEventOfferContainer = () => {
  return `<div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked="">
            <label class="event__offer-label" for="event-offer-luggage-1">
              <span class="event__offer-title">Add luggage</span>
              +
              €&nbsp;<span class="event__offer-price">30</span>
            </label>
          </div>`;
};

const getEventItemDestination = () => {
  return (`<section class="event__section  event__section--destination">
              <h3 class="event__section-title  event__section-title--destination">Destination</h3>
              <p class="event__destination-description">Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.</p>

              <div class="event__photos-container">
                <div class="event__photos-tape">
                </div>
              </div>
            </section>`);
};

const getEventPhoto = () => {
  return (`<img class="event__photo" src="img/photos/1.jpg" alt="Event photo">`);
};

const getTripDaysContainer = () => {
  return (`<ul class="trip-days">
           </ul>`);
};

const getTripDaysItem = () => {
  return (`<li class="trip-days__item  day">
              <div class="day__info">
                <span class="day__counter">1</span>
                <time class="day__date" datetime="2019-03-18">MAR 18</time>
              </div>

              <ul class="trip-events__list">
              </ul>
            </li>`);
};

const getTripEventItemContainerForTripDays = () => {
  return (`<li class="trip-events__item">
              <div class="event">
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/taxi.png" alt="Event type icon">
                </div>
                <h3 class="event__title">Taxi to Amsterdam</h3>

                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="2019-03-18T10:30">10:30</time>
                    —
                    <time class="event__end-time" datetime="2019-03-18T11:00">11:00</time>
                  </p>
                  <p class="event__duration">30M</p>
                </div>

                <p class="event__price">
                  €&nbsp;<span class="event__price-value">20</span>
                </p>

                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                </ul>

                <button class="event__rollup-btn" type="button" data-select-like-a-boss="1">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`);
};

const getEventOffer = () => {
  return (`<li class="event__offer">
            <span class="event__offer-title">Order Uber</span>€&nbsp;<span class="event__offer-price">20</span>
           </li>`);
};

render(tripMainElement, getHeaderElementTripInfoContainer(), `afterbegin`);

const tripInfoMain = headerElement.querySelector(`.trip-info__main`);

render(tripInfoMain, getHeaderElementTripInfoTitleContainer(), `afterbegin`);

render(tripViewElement, getHeaderElementTripTabsContainer(), `afterend`);
render(filterEventsElement, getHeaderFiltersContainer(), `afterend`);
render(tripEventsTitleElement, getTripSortContainer(), `afterend`);
render(tripEventsElement, getTripEventItemContainer(), `beforeend`);

const tripEventsItemElement = tripEventsElement.querySelector(`form.trip-events__item`);

render(tripEventsItemElement, getTripEventItemHeaderContainer(), `afterbegin`);

render(tripEventsItemElement, getEventOffersContainer(), `beforeend`);

const eventAvailableOffersElement = tripEventsItemElement.querySelector(`.event__available-offers`);

for (let i = 0; i < 5; i++) {
  render(eventAvailableOffersElement, getEventOfferContainer(), `beforeend`);
}

const eventDetailsElement = tripEventsItemElement.querySelector(`.event__details`);

render(eventDetailsElement, getEventItemDestination(), `beforeend`);

const eventPhotosTape = tripEventsItemElement.querySelector(`.event__photos-tape`);

for (let i = 0; i < 5; i++) {
  render(eventPhotosTape, getEventPhoto(), `beforeend`);
}

render(tripEventsElement, getTripDaysContainer(), `beforeend`);

const tripDaysContainer = tripEventsElement.querySelector(`.trip-days`);

for (let i = 0; i < 3; i++) {
  render(tripDaysContainer, getTripDaysItem(), `beforeend`);
}

const tripEventsInTripDay = tripDaysContainer.querySelector(`.trip-events__list`);

for (let i = 0; i < 3; i++) {
  render(tripEventsInTripDay, getTripEventItemContainerForTripDays(), `beforeend`);
}

const tripEventsItemInTripDay = tripEventsInTripDay.querySelector(`.trip-events__item`);

const eventSelectedOffers = tripEventsItemInTripDay.querySelector(`.event__selected-offers`);

for (let i = 0; i < 3; i++) {
  render(eventSelectedOffers, getEventOffer(), `beforeend`);
}
