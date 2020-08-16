import {getTripEventItemHeaderTemplate} from "./trip-event-item-header";

export const getTripEventItemEditTemplate = (travelEvent) => {
  return (`<form class="trip-events__item  event  event--edit" action="#" method="post">
            ${getTripEventItemHeaderTemplate(travelEvent)}
          </form>`);
};
