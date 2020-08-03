import {render} from `./view/render.js`;
import {getHeaderElementTripInfoContainer} from `./view/header-info.js`;
import {getHeaderElementTripInfoTitleContainer} from `./view/header-title.js`;
import {getHeaderElementTripTabsContainer} from `./view/header-trip-tabs.js`;
import {getHeaderFiltersContainer} from `./view/header-filters.js`;
import {getTripSortContainer} from `./view/trip-sort.js`;
import {getTripEventItemContainer} from `./view/trip-event-item.js`;
import {getTripEventItemHeaderContainer} from `./view/trip-event-item-header.js`;
import {getEventOffersContainer} from `./view/event-offers.js`;
import {getEventOffersItemContainer} from `./view/event-offers-item.js`;
import {getEventItemDestination} from `./view/event-item-destination.js`;

const headerElement = document.querySelector(`.page-header`);
const tripMainElement = headerElement.querySelector(`.trip-main`);
const tripViewElement = tripMainElement.querySelector(`.trip-view`);
const filterEventsElement = tripMainElement.querySelector(`.filter-events`);
const pageMainElement = document.querySelector(`.page-main`);
const pageBodyContainerElement = pageMainElement.querySelector(`.page-body__container`);
const tripEventsElement = pageBodyContainerElement.querySelector(`.trip-events`);
const tripEventsTitleElement = tripEventsElement.querySelector(`.trip-events-title`);


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
  render(eventAvailableOffersElement, getEventOffersItemContainer(), `beforeend`);
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
