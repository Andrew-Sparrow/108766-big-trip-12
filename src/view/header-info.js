import {
  FIRST_ELEMENT,
  SECOND_ELEMENT,
  THIRD_ELEMENT
} from "../const";

import {
  getDateStringForHeader,
  calculateTotalPrice,
  createDOMElement
} from "./util/utils.js";

const getHeaderElementTripInfoTitleContainer = (tripEvents) => {
  // console.log(tripEvents);
  if (tripEvents.length === 1) {
    return (`<h1 class="trip-info__title">${tripEvents[FIRST_ELEMENT].destination.city}</h1>`);
  } else if (tripEvents.length === 2) {
    return (`<h1 class="trip-info__title">${tripEvents[FIRST_ELEMENT].destination.city} — ${tripEvents[SECOND_ELEMENT].destination.city}</h1>`);
  } else if (tripEvents.length === 3) {
    return (`<h1 class="trip-info__title">${tripEvents[FIRST_ELEMENT].destination.city} — ${tripEvents[SECOND_ELEMENT].destination.city} — ${tripEvents[THIRD_ELEMENT].destination.city}</h1>`);
  } else {
    return (`<h1 class="trip-info__title">${tripEvents[FIRST_ELEMENT].destination.city} — ... — ${tripEvents[tripEvents.length - 1].destination.city}</h1>`);
  }
};

/**
 * Returns a markup list of header.
 * @param {Object[]} tripEvents - The travelEvents.
 * @param {Object[]} ungroupedTripEvents - The unsorted travelEvents.
 * @return {String} Returns markup block
 */
const createHeaderElementTripInfoTemplate = (tripEvents, ungroupedTripEvents) => {
  const dateString = getDateStringForHeader(tripEvents);

  return (`<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
            ${getHeaderElementTripInfoTitleContainer(ungroupedTripEvents)}
              <p class="trip-info__dates">${dateString.startTrip}&nbsp;—&nbsp;${dateString.endTrip}</p>
            </div>

            <p class="trip-info__cost">
              Total: €&nbsp;<span class="trip-info__cost-value">${calculateTotalPrice(tripEvents)}</span>
            </p>
          </section>`);
};

export default class HeaderElementTripInfo {
  constructor() {
    this._element = null;
  }

  getElement(sortedDays, sortedEvents) {
    if (!this._element) {
      this._element = createDOMElement(HeaderElementTripInfo.getTemplate(sortedDays, sortedEvents));
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  static getTemplate(sortedDays, sortedEvents) {
    return createHeaderElementTripInfoTemplate(sortedDays, sortedEvents);
  }
}
