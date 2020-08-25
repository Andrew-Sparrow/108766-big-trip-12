import {ROUTE_POINT_TYPES} from "../const.js";
import {getTripEventItemHeaderEditTemplate} from "./trip-event-item-header.js";
import {getEventItemDestinationInEditFormTemplate} from "./event-item-destination.js";
import {getEventOffersInEditFormTemplate} from "./event-offers-in-edit";
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
              ${routPointType.offers.length !== 0 ? getEventOffersInEditFormTemplate(routPointType.offers) : ``}
              ${destination.description === null ? `` : getEventItemDestinationInEditFormTemplate(travelEvent)}
            </section>
          </form>`);
};

export default class TripEventItemEdit {
  constructor(travelEvent, destinationPoints) {
    this._travelEvent = travelEvent;
    this._destinationPoints = destinationPoints;
    this._element = null;
  }

  getTemplate() {
    return createTripEventItemEditTemplate(this._travelEvent, this._destinationPoints);
  }

  getElement() {
    if (!this._element) {
      this._element = createDOMElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
