import {
  render,
  groupArrayOfObjects,
  defaultSortEventsByGroupDays,
  defaultSortEventsItems
} from "./view/util/utils.js";

import {getHeaderElementTripInfoContainer} from "./view/header-info.js";
import {getHeaderElementTripTabsContainer} from "./view/header-trip-tabs.js";
import {getHeaderFiltersContainer} from "./view/header-filters.js";
import {getTripSortContainer} from "./view/trip-sort.js";
import {getTripEventItemEditTemplate} from "./view/trip-event-item.js";
import {getTripDaysTemplate} from "./view/trip-days.js";
import {generateEvent} from "./mock/trip-event";
import {
  CITIES,
  FIRST_ELEMENT,
} from "./const";

const headerElement = document.querySelector(`.page-header`);
const tripMainElementInHeader = headerElement.querySelector(`.trip-main`);
const tripViewElement = tripMainElementInHeader.querySelector(`.trip-view`);
const filterEventsElement = tripMainElementInHeader.querySelector(`.filter-events`);
const pageMainElement = document.querySelector(`.page-main`);
const pageBodyContainerElement = pageMainElement.querySelector(`.page-body__container`);
const tripEventsElement = pageBodyContainerElement.querySelector(`.trip-events`);
const tripEventsTitleElement = tripEventsElement.querySelector(`.trip-events-title`);

const tripEvents = new Array(10).fill().map(generateEvent);

const groupsEventsByDay = groupArrayOfObjects(tripEvents, `dateStart`);

const defaultSortedDays = defaultSortEventsByGroupDays(groupsEventsByDay);
const defaultSortedEvents = defaultSortEventsItems(tripEvents);

render(tripMainElementInHeader, getHeaderElementTripInfoContainer(defaultSortedDays, defaultSortedEvents), `afterbegin`);

render(tripViewElement, getHeaderElementTripTabsContainer(), `afterend`);
render(filterEventsElement, getHeaderFiltersContainer(), `afterend`);
render(tripEventsTitleElement, getTripSortContainer(), `afterend`);

render(tripEventsElement, getTripEventItemEditTemplate(tripEvents[FIRST_ELEMENT], CITIES), `beforeend`);

render(tripEventsElement, getTripDaysTemplate(defaultSortedDays), `beforeend`);
