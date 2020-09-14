import AbstractView from "./abstract.js";
import {WITHOUT_DAY} from "../const.js";

const FIRST_EVENT = 0;
const MONTH_OF_EVENT = 1;
const DAY_OF_EVENT = 2;

const createEventDayTemplate = (day, index) => {
  const [
    date,
    tripEventsInDay
  ] = day;

  if (date !== WITHOUT_DAY) {
    // template for day
    return (`<li class="trip-days__item  day">
             <div class="day__info">
               <span class="day__counter">${index + 1}</span>
               <time class="day__date" datetime="${tripEventsInDay[FIRST_EVENT].dateStart.toISOString()}">${date.split(` `)[MONTH_OF_EVENT]} ${date.split(` `)[DAY_OF_EVENT]}</time>
             </div>
             <!-- place for list of events in day-->
           </li>`);
  }
  return (`<li class="trip-days__item  day">
           <div class="day__info">
           </div>
           <!-- place for list of events in day-->
         </li>`);
};

export default class TripDay extends AbstractView {
  constructor(day = WITHOUT_DAY, index) {
    super();
    this._day = day;
    this._index = index;
  }

  getTemplate() {
    return createEventDayTemplate(this._day, this._index);
  }
}
