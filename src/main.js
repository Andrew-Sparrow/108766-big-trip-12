import {render} from "./view/util/utils.js";
import {getHeaderElementTripInfoContainer} from "./view/header-info.js";
import {getHeaderElementTripInfoTitleContainer} from "./view/header-title.js";
import {getHeaderElementTripTabsContainer} from "./view/header-trip-tabs.js";
import {getHeaderFiltersContainer} from "./view/header-filters.js";
import {getTripSortContainer} from "./view/trip-sort.js";
import {getTripEventItemContainer} from "./view/trip-event-item.js";
import {getTripEventItemHeaderTemplate} from "./view/trip-event-item-header.js";
import {getEventOffersTemplate} from "./view/event-offers.js";
import {getEventOffersItemTemplate} from "./view/event-offers-item.js";
import {getEventItemDestination} from "./view/event-item-destination.js";
import {getEventPhoto} from "./view/event-photo.js";
import {getTripDaysTemplate} from "./view/trip-days.js";
import {getTripDaysItem} from "./view/trip-days-item.js";
import {getTripEventItemTemplateForTripDays} from "./view/trip-event-item-in-trip-days.js";
import {getEventOfferTemplate} from "./view/event-offer-in-event-item.js";
import {generateEvent} from "./mock/event";

const headerElement = document.querySelector(`.page-header`);
const tripMainElement = headerElement.querySelector(`.trip-main`);
const tripViewElement = tripMainElement.querySelector(`.trip-view`);
const filterEventsElement = tripMainElement.querySelector(`.filter-events`);
const pageMainElement = document.querySelector(`.page-main`);
const pageBodyContainerElement = pageMainElement.querySelector(`.page-body__container`);
const tripEventsElement = pageBodyContainerElement.querySelector(`.trip-events`);
const tripEventsTitleElement = tripEventsElement.querySelector(`.trip-events-title`);

const events = new Array(3).fill().map(generateEvent);

render(tripMainElement, getHeaderElementTripInfoContainer(), `afterbegin`);

const tripInfoMain = headerElement.querySelector(`.trip-info__main`);

render(tripInfoMain, getHeaderElementTripInfoTitleContainer(), `afterbegin`);

render(tripViewElement, getHeaderElementTripTabsContainer(), `afterend`);
render(filterEventsElement, getHeaderFiltersContainer(), `afterend`);
render(tripEventsTitleElement, getTripSortContainer(), `afterend`);
render(tripEventsElement, getTripEventItemContainer(), `beforeend`);

const tripEventsItemElement = tripEventsElement.querySelector(`form.trip-events__item`);

render(tripEventsItemElement, getTripEventItemHeaderTemplate(events[0]), `afterbegin`);

render(tripEventsItemElement, getEventOffersTemplate(), `beforeend`);

const eventAvailableOffersElement = tripEventsItemElement.querySelector(`.event__available-offers`);

for (let i = 0; i < events[0].offers.length; i++) {
  render(eventAvailableOffersElement, getEventOffersItemTemplate(events[0].offers[i]), `beforeend`);
}

const eventDetailsElement = tripEventsItemElement.querySelector(`.event__details`);

render(eventDetailsElement, getEventItemDestination(events[0]), `beforeend`);

const eventPhotosTape = tripEventsItemElement.querySelector(`.event__photos-tape`);

for (let i = 0; i < events[0].photos.length; i++) {
  render(eventPhotosTape, getEventPhoto(), `beforeend`);
}

render(tripEventsElement, getTripDaysTemplate(), `beforeend`);

const tripDaysContainer = tripEventsElement.querySelector(`.trip-days`);

for (let i = 0; i < 3; i++) {
  render(tripDaysContainer, getTripDaysItem(), `beforeend`);
}

const tripEventsInTripDay = tripDaysContainer.querySelector(`.trip-events__list`);

for (let i = 0; i < events.length; i++) {
  render(tripEventsInTripDay, getTripEventItemTemplateForTripDays(events[i]), `beforeend`);
}

const tripEventsItemInTripDay = tripEventsInTripDay.querySelector(`.trip-events__item`);

const eventSelectedOffers = tripEventsItemInTripDay.querySelector(`.event__selected-offers`);

for (let i = 0; i < 3; i++) {
  render(eventSelectedOffers, getEventOfferTemplate(), `beforeend`);
}
