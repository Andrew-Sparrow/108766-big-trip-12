import {getDateStringForHeader} from "./util/utils";

const getHeaderElementTripInfoTitleContainer = () => {
  return (`<h1 class="trip-info__title">Amsterdam — Chamonix — Geneva</h1>`);
};

/**
 * Returns a markup list of header.
 * @param {Object[]} tripEvents - The travelEvents.
 * @return {String} Returns markup block
 */
export const getHeaderElementTripInfoContainer = (tripEvents) => {
  return (`<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
            ${getHeaderElementTripInfoTitleContainer()}
              <p class="trip-info__dates">${getDateStringForHeader(tripEvents).startTrip}&nbsp;—&nbsp;${getDateStringForHeader(tripEvents).endTrip}</p>
            </div>

            <p class="trip-info__cost">
              Total: €&nbsp;<span class="trip-info__cost-value">1230</span>
            </p>
          </section>`);
};
