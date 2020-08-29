import AbstractView from "./abstract.js";

const createTripEventsInDay = () => {
  return `<ul class="trip-events__list"></ul>`;
};

export default class TripEventsInDay extends AbstractView {
  getTemplate() {
    return createTripEventsInDay();
  }
}
