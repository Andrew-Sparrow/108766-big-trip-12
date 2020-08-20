import {
  FIRST_ELEMENT,
  SECOND_ELEMENT,
  THIRD_ELEMENT
} from "../const";

import {getTripEventTemplateForDays} from "./trip-event-item-in-trip-days.js";

// get day template in list of days
const getEventDayTemplate = (date, tripEventsInDay, counter) => {
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
export const getTripDaysTemplate = (tripDays) => {
  const blockTripDaysItems = tripDays.map((tripDay, index) => getEventDayTemplate(tripDay[FIRST_ELEMENT], tripDay[SECOND_ELEMENT], index)).join(``);

  return (`<ul class="trip-days">
            ${blockTripDaysItems}
           </ul>`);
};
