import {createDOMElement} from "./util/utils.js";

const FIRST_EVENT = 0;
const MONTH_OF_EVENT = 1;
const DAY_OF_EVENT = 2;

const createEventDayTemplate = (day, index) => {
  const [
    date,
    tripEventsInDay
  ] = day;

  // template for day
  return (`<li class="trip-days__item  day">
             <div class="day__info">
               <span class="day__counter">${index + 1}</span>
               <time class="day__date" datetime="${tripEventsInDay[FIRST_EVENT].dateStart.toISOString()}">${date.split(` `)[MONTH_OF_EVENT]} ${date.split(` `)[DAY_OF_EVENT]}</time>
             </div>
             <!-- place for list of events in day-->
           </li>`);
};

export default class TripDay {
  constructor(day, index) {
    this._day = day;
    this._index = index;
    this._element = null;
  }

  getTemplate() {
    return createEventDayTemplate(this._day, this._index);
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
