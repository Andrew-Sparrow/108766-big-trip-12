import {getTripEventTemplateForDays} from "./trip-event-item-in-trip-days.js";
let counter = 1;

// get day template in list of days
const getEventDayTemplate = (date, tripEventsInDay) => {
  const blockEventsInTripDaysItem = tripEventsInDay.map((tripEvent) => getTripEventTemplateForDays(tripEvent)).join(``);

  return (`<li class="trip-days__item  day">
              <div class="day__info">
                <span class="day__counter">${counter++}</span>
                <time class="day__date" datetime="${tripEventsInDay[0].dateStart.toISOString()}">${date.split(` `)[1]} ${date.split(` `)[2]}</time>
              </div>

              <ul class="trip-events__list">
                ${blockEventsInTripDaysItem}
              </ul>
            </li>`);
};

// get block of days
export const getTripDaysTemplate = (tripDays) => {
  const blockTripDaysItems = tripDays.map((tripDay) => getEventDayTemplate(tripDay[0], tripDay[1])).join(``);

  return (`<ul class="trip-days">
            ${blockTripDaysItems}
           </ul>`);
};
