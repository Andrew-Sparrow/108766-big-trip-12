import {getTripEventItemHeaderTemplate} from "./trip-event-item-header.js";
import {getEventItemDestination} from "./event-item-destination.js";
import {getEventOffersTemplateInEditForm} from "./event-offers-in-edit";

export const getTripEventItemEditTemplate = (travelEvent, destinationPoints) => {
  const {
    destination,
    routPointType
  } = travelEvent;

  return (`<form class="trip-events__item  event  event--edit" action="#" method="post">
            ${getTripEventItemHeaderTemplate(travelEvent, destinationPoints)}
            <section class="event__details">
              ${routPointType.offers.length !== 0 ? getEventOffersTemplateInEditForm(routPointType.offers) : ``}
              ${destination.description === null ? `` : getEventItemDestination(travelEvent)}
            </section>
          </form>`);
};
