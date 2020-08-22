import {
  FIRST_ELEMENT,
  SECOND_ELEMENT,
  THIRD_ELEMENT
} from "../const";

import {createElement} from "./util/utils.js";

import {getTripEventTemplateForDays} from "./trip-event-item-in-trip-days.js";

// get day template in list of days
const createEventDayTemplate = (date, tripEventsInDay, counter) => {
  const blockEventsInTripDaysItem = tripEventsInDay.map((tripEvent) => getTripEventTemplateForDays(tripEvent)).join(``);

  return (`<li class="trip-days__item  day">
              <div class="day__info">
                <span class="day__counter">${counter + 1}</span>
                <time class="day__date" datetime="${tripEventsInDay[FIRST_ELEMENT].dateStart.toISOString()}">${date.split(` `)[SECOND_ELEMENT]} ${date.split(` `)[THIRD_ELEMENT]}</time>
              </div>

              <ul class="trip-events__list">
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
      this._element = createElement(TripDays.getTemplate(tripDays));
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
