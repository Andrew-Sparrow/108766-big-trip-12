import {
  FIRST_ELEMENT,
  SECOND_ELEMENT,
  THIRD_ELEMENT,
} from "../const";

import {createDOMElement} from "./util/utils.js";

// import TripEventsForDay from "./trip-event-item-in-trip-days.js";

// get day template in list of days
/*
const createEventDayTemplate = (date, tripEventsInDay, counter) => {

  const blockEventsInTripDaysItem = tripEventsInDay.map((tripEvent) => {
    return createTripEventForDayTemplate(tripEvent);
  }).join(``);

  // template for day
  return (`<li class="trip-days__item  day">
              <div class="day__info">
                <span class="day__counter">${counter + 1}</span>
                <time class="day__date" datetime="${tripEventsInDay[FIRST_ELEMENT].dateStart.toISOString()}">${date.split(` `)[SECOND_ELEMENT]} ${date.split(` `)[THIRD_ELEMENT]}</time>
              </div>

              <ul class="trip-events__list">
                <!-- block of events in day is inserted here -->
                 ${blockEventsInTripDaysItem}
              </ul>
            </li>`);
};
*/


// get block of days
/*
const createTripDaysTemplate = (tripDays) => {
  const blockTripDaysItems = tripDays.map((tripDay, index) => createEventDayTemplate(tripDay[FIRST_ELEMENT], tripDay[SECOND_ELEMENT], index)).join(``);

  return (`<ul class="trip-days">
            ${blockTripDaysItems}
           </ul>`);
};*/

// get block of days
const createTripDaysTemplate = () => {
  // const blockTripDaysItems = tripDays.map((tripDay, index) => createEventDayTemplate(tripDay[FIRST_ELEMENT], tripDay[SECOND_ELEMENT], index)).join(``);

  return (`<ul class="trip-days">
           </ul>`);
};

export default class TripDays {
  // constructor(tripDays) {
  constructor() {
    // this._days = tripDays;
    this._element = null;
  }

  getTemplate() {
    return createTripDaysTemplate();
    // return createTripDaysTemplate(this._days);
  }

  getElement() {
    if (!this._element) {
      this._element = createDOMElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
