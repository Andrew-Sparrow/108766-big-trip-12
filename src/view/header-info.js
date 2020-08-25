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
  const dateString = tripEvents.length !== 0 ? getDateStringForHeader(tripEvents) : null;

  return (`<section class="trip-main__trip-info  trip-info">
            ${tripEvents.length !== 0 ? `
              <div class="trip-info__main">
                ${getHeaderElementTripInfoTitleContainer(ungroupedTripEvents)}
                <p class="trip-info__dates">${dateString.startTrip}&nbsp;—&nbsp;${dateString.endTrip}</p>
              </div>
              ` : ``}

            <p class="trip-info__cost">
              Total: €&nbsp;<span class="trip-info__cost-value">${calculateTotalPrice(tripEvents)}</span>
            </p>
          </section>`);
};

export default class HeaderElementTripInfo {
  constructor(sortedDays, sortedEvents) {
    this._sortedDays = sortedDays;
    this._sortedEvents = sortedEvents;
    this._element = null;
  }

  getTemplate() {
    return createHeaderElementTripInfoTemplate(this._sortedDays, this._sortedEvents);
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
