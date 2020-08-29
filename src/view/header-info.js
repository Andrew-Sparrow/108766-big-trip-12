import AbstractView from "./abstract.js";

import {
  getDateStringForHeader,
  calculateTotalPrice,
  createDOMElement
} from "./util/utils.js";

const FIRST_CITY = 0;
const SECOND_CITY = 1;
const THIRD_CITY = 2;


const createHeaderElementTripInfoTitleTemplate = (tripEvents) => {
  if (tripEvents.length === 1) {
    return (`<h1 class="trip-info__title">${tripEvents[FIRST_CITY].destination.city}</h1>`);
  } else if (tripEvents.length === 2) {
    return (`<h1 class="trip-info__title">${tripEvents[FIRST_CITY].destination.city} — ${tripEvents[SECOND_CITY].destination.city}</h1>`);
  } else if (tripEvents.length === 3) {
    return (`<h1 class="trip-info__title">${tripEvents[FIRST_CITY].destination.city} — ${tripEvents[SECOND_CITY].destination.city} — ${tripEvents[THIRD_CITY].destination.city}</h1>`);
  } else {
    return (`<h1 class="trip-info__title">${tripEvents[FIRST_CITY].destination.city} — ... — ${tripEvents[tripEvents.length - 1].destination.city}</h1>`);
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
                ${createHeaderElementTripInfoTitleTemplate(ungroupedTripEvents)}
                <p class="trip-info__dates">${dateString.startTrip}&nbsp;—&nbsp;${dateString.endTrip}</p>
              </div>
              ` : ``}

            <p class="trip-info__cost">
              Total: €&nbsp;<span class="trip-info__cost-value">${calculateTotalPrice(tripEvents)}</span>
            </p>
          </section>`);
};

export default class HeaderElementTripInfo extends AbstractView {
  constructor(sortedDays, sortedEvents) {
    super();
    this._sortedDays = sortedDays;
    this._sortedEvents = sortedEvents;
  }

  getTemplate() {
    return createHeaderElementTripInfoTemplate(this._sortedDays, this._sortedEvents);
  }
}
