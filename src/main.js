import {
  render,
  groupArrayOfObjects,
  groupArrayOfObjectsBySet
} from "./view/util/utils.js";
import {getHeaderElementTripInfoContainer} from "./view/header-info.js";
import {getHeaderElementTripTabsContainer} from "./view/header-trip-tabs.js";
import {getHeaderFiltersContainer} from "./view/header-filters.js";
import {getTripSortContainer} from "./view/trip-sort.js";
import {getTripEventItemEditTemplate} from "./view/trip-event-item.js";
import {getTripDaysTemplate} from "./view/trip-days.js";
// import {getTripDaysItem} from "./view/trip-days-item.js";
// import {getTripEventItemTemplateForTripDays} from "./view/trip-event-item-in-trip-days.js";
import {generateEvent} from "./mock/trip-event";
import {DESTINATION_POINTS} from "./const";

const headerElement = document.querySelector(`.page-header`);
const tripMainElementInHeader = headerElement.querySelector(`.trip-main`);
const tripViewElement = tripMainElementInHeader.querySelector(`.trip-view`);
const filterEventsElement = tripMainElementInHeader.querySelector(`.filter-events`);
const pageMainElement = document.querySelector(`.page-main`);
const pageBodyContainerElement = pageMainElement.querySelector(`.page-body__container`);
const tripEventsElement = pageBodyContainerElement.querySelector(`.trip-events`);
const tripEventsTitleElement = tripEventsElement.querySelector(`.trip-events-title`);

const tripEvents = new Array(10).fill().map(generateEvent);
// console.log(tripEvents);
// console.log(tripEvents[0].dateStart.toLocaleString(), `toLocaleString`);
// console.log(tripEvents[0].dateStart.toLocaleTimeString(), `toLocaleTimeString`);
// console.log(tripEvents[0].dateStart.toUTCString(), `toUTCString`);
// console.log(tripEvents[0].dateStart.toTimeString(), `toTimeString`);
// console.log(tripEvents[0].dateStart.toISOString(), `toISOString`);
// console.log(tripEvents[0].dateStart.toDateString(), `toDateString`);

const groupsEventsByDay = groupArrayOfObjects(tripEvents, `dateStart`);

const entries = Object.entries(groupsEventsByDay);
console.log(entries);

render(tripMainElementInHeader, getHeaderElementTripInfoContainer(), `afterbegin`);

render(tripViewElement, getHeaderElementTripTabsContainer(), `afterend`);
render(filterEventsElement, getHeaderFiltersContainer(), `afterend`);
render(tripEventsTitleElement, getTripSortContainer(), `afterend`);

render(tripEventsElement, getTripEventItemEditTemplate(tripEvents[0], DESTINATION_POINTS), `beforeend`);

render(tripEventsElement, getTripDaysTemplate(tripEvents), `beforeend`);

// const tripDaysContainer = tripEventsElement.querySelector(`.trip-days`);
/*
for (let i = 0; i < 3; i++) {
  render(tripDaysContainer, getTripDaysItem(), `beforeend`);
}*/
/*

const tripEventsInTripDay = tripDaysContainer.querySelector(`.trip-events__list`);

for (let i = 0; i < tripEvents.length; i++) {
  render(tripEventsInTripDay, getTripEventItemTemplateForTripDays(tripEvents[i]), `beforeend`);
}
*/
