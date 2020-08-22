import {getTripEventItemHeaderTemplate} from "./trip-event-item-header.js";
import {getEventItemDestination} from "./event-item-destination.js";
import {getEventOffersTemplateInEditForm} from "./event-offers-in-edit";
import {createElement} from "./util/utils.js";

export const createTripEventItemEditTemplate = (travelEvent, destinationPoints) => {
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

export default class TripEventItemEdit {
  constructor() {
    this._element = null;
  }

  getTemplate(travelEvent, destinationPoints) {
    return createTripEventItemEditTemplate(travelEvent, destinationPoints);
  }

  getElement(travelEvent, destinationPoints) {
    if (!this._element) {
      this._element = createElement(this.getTemplate(travelEvent, destinationPoints));
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
