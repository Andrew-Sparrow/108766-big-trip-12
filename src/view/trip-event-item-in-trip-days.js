import {createElement} from "./util/utils.js";

const getEventOfferTemplateInTripDay = (offer) => {
  const {price, title} = offer;

  return (`<li class="event__offer">
            <span class="event__offer-title">${title}</span>€&nbsp;<span class="event__offer-price">${price}</span>
           </li>`);
};

// get event item template in day
const createTripEventForDayTemplate = (travelEvent) => {
  const {
    dateStart,
    dateEnd,
    destination,
    routPointType,
    price} = travelEvent;

  const offersTemplates = routPointType.offers
    .map((offer) => getEventOfferTemplateInTripDay(offer));

  // not more than three offers should be displayed in block of offers
  const offersTemplatesSliced = offersTemplates.slice(0, 3);

  const offersBlockTemplate = offersTemplatesSliced.join(``);

  return (`<li class="trip-events__item">
              <div class="event">
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${travelEvent.routPointType.name.toLowerCase()}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${routPointType.name} ${travelEvent.routPointTypeGroupName === `transfer` ? ` to` : ` in`} ${destination.city}</h3>

                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="${dateStart.toISOString()}">${dateStart.getHours()}:${dateStart.getMinutes()}</time>
                    —
                    <time class="event__end-time" datetime="${dateEnd.toISOString()}">${dateEnd.getHours()}:${dateEnd.getMinutes()}</time>
                  </p>
                  <p class="event__duration">30M</p>
                </div>

                <p class="event__price">
                  €&nbsp;<span class="event__price-value">${price}</span>
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

export default class TripEventsForDay {
  constructor() {
    this._element = null;
  }

  getElement(tripEvent) {
    if (!this._element) {
      this._element = createElement(TripEventsForDay.getTemplate(tripEvent));
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  static getTemplate(travelEvent) {
    return createTripEventForDayTemplate(travelEvent);
  }
}
