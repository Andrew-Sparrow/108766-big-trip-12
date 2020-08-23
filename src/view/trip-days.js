import {
  FIRST_ELEMENT,
  SECOND_ELEMENT,
  THIRD_ELEMENT,
} from "../const";

import {
  createDOMElement,
  renderDOMElement,
  RenderPosition
} from "./util/utils.js";

import TripEventsForDay from "./trip-event-item-in-trip-days.js";

// get day template in list of days
const createEventDayTemplate = (date, tripEventsInDay, counter) => {

  const blockEventsInTripDaysItem = tripEventsInDay.map((tripEvent) => {
    // console.log(tripEvent);
    return TripEventsForDay.getTemplate(tripEvent);
    // return tripEventForDayComponent.getElement(tripEvent);
  }).join(``);

  // console.log(blockEventsInTripDaysItem);

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

// get block of days
export const createTripDaysTemplate = (tripDays) => {
  const blockTripDaysItems = tripDays.map((tripDay, index) => createEventDayTemplate(tripDay[FIRST_ELEMENT], tripDay[SECOND_ELEMENT], index)).join(``);

  return (`<ul class="trip-days">
            ${blockTripDaysItems}
           </ul>`);
};

export default class TripDays {
  constructor() {
    this._element = null;
  }

  getElement(tripDays) {
    if (!this._element) {
      this._element = createDOMElement(TripDays.getTemplate(tripDays));
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  static getTemplate(tripDays) {
    return createTripDaysTemplate(tripDays);
  }
}
