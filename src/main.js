import {render} from "./view/util/utils.js";
import {getHeaderElementTripInfoContainer} from "./view/header-info.js";
import {getHeaderElementTripInfoTitleContainer} from "./view/header-title.js";
import {getHeaderElementTripTabsContainer} from "./view/header-trip-tabs.js";
import {getHeaderFiltersContainer} from "./view/header-filters.js";
import {getTripSortContainer} from "./view/trip-sort.js";
import {getTripEventItemEditTemplate} from "./view/trip-event-item.js";
import {getTripEventItemHeaderTemplate} from "./view/trip-event-item-header.js";
import {getEventOffersTemplateInEditForm} from "./view/event-offers.js";
import {getEventItemDestination} from "./view/event-item-destination.js";
import {getEventPhoto} from "./view/event-photo.js";
import {getTripDaysTemplate} from "./view/trip-days.js";
import {getTripDaysItem} from "./view/trip-days-item.js";
import {getTripEventItemTemplateForTripDays} from "./view/trip-event-item-in-trip-days.js";
import {generateEvent} from "./mock/trip-event";

const headerElement = document.querySelector(`.page-header`);
const tripMainElement = headerElement.querySelector(`.trip-main`);
const tripViewElement = tripMainElement.querySelector(`.trip-view`);
const filterEventsElement = tripMainElement.querySelector(`.filter-events`);
const pageMainElement = document.querySelector(`.page-main`);
const pageBodyContainerElement = pageMainElement.querySelector(`.page-body__container`);
const tripEventsElement = pageBodyContainerElement.querySelector(`.trip-events`);
const tripEventsTitleElement = tripEventsElement.querySelector(`.trip-events-title`);

const tripEvents = new Array(3).fill().map(generateEvent);

render(tripMainElement, getHeaderElementTripInfoContainer(), `afterbegin`);

const tripInfoMain = headerElement.querySelector(`.trip-info__main`);

render(tripInfoMain, getHeaderElementTripInfoTitleContainer(), `afterbegin`);

render(tripViewElement, getHeaderElementTripTabsContainer(), `afterend`);
render(filterEventsElement, getHeaderFiltersContainer(), `afterend`);
render(tripEventsTitleElement, getTripSortContainer(), `afterend`);
render(tripEventsElement, getTripEventItemEditTemplate(), `beforeend`);

const tripEventsItemElement = tripEventsElement.querySelector(`form.trip-events__item`);

render(tripEventsItemElement, getTripEventItemHeaderTemplate(tripEvents[0]), `afterbegin`);

render(tripEventsItemElement, getEventOffersTemplateInEditForm(tripEvents[0].offers), `beforeend`);
/*
const eventAvailableOffersElement = tripEventsItemElement.querySelector(`.event__available-offers`);

for (let i = 0; i < tripEvents[0].offers.length; i++) {
  render(eventAvailableOffersElement, getEventOffersItemTemplateInEditForm(tripEvents[0].offers[i]), `beforeend`);
}
*/
const eventDetailsElement = tripEventsItemElement.querySelector(`.event__details`);

render(eventDetailsElement, getEventItemDestination(tripEvents[0]), `beforeend`);

const eventPhotosTape = tripEventsItemElement.querySelector(`.event__photos-tape`);

for (let i = 0; i < tripEvents[0].destination.photos.length; i++) {
  render(eventPhotosTape, getEventPhoto(), `beforeend`);
}

render(tripEventsElement, getTripDaysTemplate(), `beforeend`);

const tripDaysContainer = tripEventsElement.querySelector(`.trip-days`);

for (let i = 0; i < 3; i++) {
  render(tripDaysContainer, getTripDaysItem(), `beforeend`);
}

const tripEventsInTripDay = tripDaysContainer.querySelector(`.trip-events__list`);

for (let i = 0; i < tripEvents.length; i++) {
  render(tripEventsInTripDay, getTripEventItemTemplateForTripDays(tripEvents[i]), `beforeend`);
}
