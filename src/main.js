import {
  render,
  groupArrayOfObjects,
  defaultSortEvents
} from "./view/util/utils.js";
import {getHeaderElementTripInfoContainer} from "./view/header-info.js";
import {getHeaderElementTripTabsContainer} from "./view/header-trip-tabs.js";
import {getHeaderFiltersContainer} from "./view/header-filters.js";
import {getTripSortContainer} from "./view/trip-sort.js";
import {getTripEventItemEditTemplate} from "./view/trip-event-item.js";
import {getTripDaysTemplate} from "./view/trip-days.js";
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

// console.log(tripEvents[0]);
// console.log(tripEvents[0].dateStart.toLocaleString());
// console.log(tripEvents[0].dateStart.toLocaleTimeString());
// console.log(tripEvents[0].dateStart.toUTCString());
// console.log(tripEvents[0].dateStart.toTimeString());
// console.log(tripEvents[0].dateStart.toISOString());
// console.log(tripEvents[0].dateStart.toDateString());

const groupsEventsByDay = groupArrayOfObjects(tripEvents, `dateStart`);
// console.log(groupsEventsByDay);

const defaultSortedDays = defaultSortEvents(groupsEventsByDay);
// console.log(defaultSortedDays);

// groupsEventsByDay.forEach((item) => console.log(item));

render(tripMainElementInHeader, getHeaderElementTripInfoContainer(defaultSortedDays), `afterbegin`);

render(tripViewElement, getHeaderElementTripTabsContainer(), `afterend`);
render(filterEventsElement, getHeaderFiltersContainer(), `afterend`);
render(tripEventsTitleElement, getTripSortContainer(), `afterend`);

render(tripEventsElement, getTripEventItemEditTemplate(tripEvents[0], DESTINATION_POINTS), `beforeend`);

// render(tripEventsElement, getTripDaysTemplate(groupsEventsByDay), `beforeend`);
render(tripEventsElement, getTripDaysTemplate(defaultSortedDays), `beforeend`);
