import {
  FIRST_ELEMENT,
  SECOND_ELEMENT,
  THIRD_ELEMENT,
} from "../const";

import {createDOMElement} from "./util/utils.js";

// import TripEventsForDay from "./trip-event-item-in-trip-days-board.js";

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

// get day template in list of days
const createEventDayTemplate = (date, tripEventsInDay, counter) => {

  const blockEventsInTripDaysItem = tripEventsInDay.map((tripEvent) => {
    return createTripEventForDayTemplate(tripEvent);
  }).join(``);

  // template for day
  return (`<li class="trip-days__item  day">
              <div class="day__info">
                <span class="day__counter">${counter + 1}</span>
                <time class="day__date" datetime="${tripEventsInDay[FIRST_ELEMENT].dateStart.toISOString()}">${date.split(` `)[SECOND_ELEMENT]} ${date.split(` `)[THIRD_ELEMENT]}</time>
              </div>

              <ul class="trip-events__list">
                <!-- block of events in day is inserted here -->
                 ${blockEventsInTripDaysItem} 
              </ul>
            </li>`);
};

// get block of days
const createTripDaysBoardTemplate = (tripDays) => {
  const blockTripDaysItems = tripDays.map((tripDay, index) => createEventDayTemplate(tripDay[FIRST_ELEMENT], tripDay[SECOND_ELEMENT], index)).join(``);

  return (`<ul class="trip-days">
            ${blockTripDaysItems}
           </ul>`);
};

export default class TripDaysBoard {
  constructor(tripDays) {
    this._days = tripDays;
    this._element = null;
  }

  getTemplate() {
    return createTripDaysBoardTemplate(this._days);
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
