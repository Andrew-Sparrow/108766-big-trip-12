// import {includesItem} from "./util/utils";

const getEventOfferTemplateInTripDay = (offer) => {
  const {price, title} = offer;

  return (`<li class="event__offer">
            <span class="event__offer-title">${title}</span>€&nbsp;<span class="event__offer-price">${price}</span>
           </li>`);
};

export const getTripEventItemTemplateForTripDays = (travelEvent) => {
  // console.log(travelEvent);
  const {dataStart, dataEnd, destination, offers, routPointType} = travelEvent;

  const offersBlockTemplate = offers
    .map((offer) => getEventOfferTemplateInTripDay(offer))
    .join(``);

  return (`<li class="trip-events__item">
              <div class="event">
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${routPointType}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${routPointType} ${destination.city}</h3>

                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="2019-03-18T10:30">${dataStart.getHours()}:${dataStart.getMinutes()}</time>
                    —
                    <time class="event__end-time" datetime="2019-03-18T11:00">${dataEnd.getHours()}:${dataEnd.getMinutes()}</time>
                  </p>
                  <p class="event__duration">30M</p>
                </div>

                <p class="event__price">
                  €&nbsp;<span class="event__price-value">20</span>
                </p>

                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                  <!--template offers of item-->
                  ${offersBlockTemplate}
                </ul>

                <button class="event__rollup-btn" type="button" data-select-like-a-boss="1">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`);
};
