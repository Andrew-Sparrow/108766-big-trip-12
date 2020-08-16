import {getTripEventItemHeaderTemplate} from "./trip-event-item-header.js";
import {getEventItemDestination} from "./event-item-destination.js";
import {getEventOffersTemplateInEditForm} from "./event-offers";

export const getTripEventItemEditTemplate = (travelEvent) => {
  const {destination, routPointType} = travelEvent;

  return (`<form class="trip-events__item  event  event--edit" action="#" method="post">
            ${getTripEventItemHeaderTemplate(travelEvent)}
            <section class="event__details">
              ${routPointType.offers.length !== 0 ? getEventOffersTemplateInEditForm(routPointType.offers) : ``}
              ${destination ? getEventItemDestination(travelEvent) : ``}
            </section>
          </form>`);
};
