import {
  getDateStringForHeader,
  calculateTotalPrice
} from "./util/utils.js";

const getHeaderElementTripInfoTitleContainer = (tripEvents) => {
  if (tripEvents.length === 1) {
    return (`<h1 class="trip-info__title">${tripEvents[0][1][0].destination.city}</h1>`);
  } else if (tripEvents.length === 2) {
    return (`<h1 class="trip-info__title">${tripEvents[0][1][0].destination.city} — ${tripEvents[1][1][0].destination.city}</h1>`);
  } else if (tripEvents.length === 3) {
    return (`<h1 class="trip-info__title">${tripEvents[0][1][0].destination.city} — ${tripEvents[1][1][0].destination.city} — ${tripEvents[2][1][0].destination.city}</h1>`);
  } else {
    return (`<h1 class="trip-info__title">${tripEvents[0][1][0].destination.city} — ... — ${tripEvents[tripEvents.length - 1][1][0].destination.city}</h1>`);
  }
};

/**
 * Returns a markup list of header.
 * @param {Object[]} tripEvents - The travelEvents.
 * @return {String} Returns markup block
 */
export const getHeaderElementTripInfoContainer = (tripEvents) => {
  const dateString = getDateStringForHeader(tripEvents);

  return (`<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
            ${getHeaderElementTripInfoTitleContainer(tripEvents)}
              <p class="trip-info__dates">${dateString.startTrip}&nbsp;—&nbsp;${dateString.endTrip}</p>
            </div>

            <p class="trip-info__cost">
              Total: €&nbsp;<span class="trip-info__cost-value">${calculateTotalPrice(tripEvents)}</span>
            </p>
          </section>`);
};
