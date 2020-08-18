import {getTripEventItemTemplateForTripDays} from "./trip-event-item-in-trip-days.js";

const getTripDaysItem = (tripDaysItems) => {
  const blockTripDaysItem = tripDaysItems;
  return (`<li class="trip-days__item  day">
              <div class="day__info">
                <span class="day__counter">1</span>
                <time class="day__date" datetime="2019-03-18">MAR 18</time>
              </div>

              <ul class="trip-events__list">
                ${blockTripDaysItem}
              </ul>
            </li>`);
};

export const getTripDaysTemplate = (tripDays) => {
  const blockTripDaysItems = tripDays.map((tripDay) => getTripDaysItem(tripDay)).join(``);

  return (`<ul class="trip-days">
            ${blockTripDaysItems}
           </ul>`);
};
