/*
import {createDOMElement} from "./util/utils.js";

import {
  FIRST_ELEMENT,
  SECOND_ELEMENT
} from "../const.js";

// get day template in list of days
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
