import {ROUTE_POINT_TYPES} from "../const.js";
import {getTripEventItemHeaderEditTemplate} from "./trip-event-item-header.js";
import {getEventItemDestination} from "./event-item-destination.js";
import {getEventOffersTemplateInEditForm} from "./event-offers-in-edit";
import {createDOMElement} from "./util/utils.js";

const BLANK_TRIP_EVENT = {
  destination: null,
  routPointTypeGroupName: null,
  routPointType: null,
  dateStart: null,
  dateEnd: null,
  price: null
};

export const createTripEventItemEditTemplate = (travelEvent, destinationPoints) => {
  const {
    destination,
    routPointType
  } = travelEvent;

  return (`<form class="trip-events__item  event  event--edit" action="#" method="post">
            ${getTripEventItemHeaderEditTemplate(travelEvent, destinationPoints)}
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

  getElement(travelEvent, destinationPoints) {
    if (!this._element) {
      this._element = createDOMElement(TripEventItemEdit.getTemplate(travelEvent, destinationPoints));
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  static getTemplate(travelEvent, destinationPoints) {
    return createTripEventItemEditTemplate(travelEvent, destinationPoints);
  }
}
