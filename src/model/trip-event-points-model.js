import Observer from "../utils/observer.js";

export default class TripEventPointsModel extends Observer {
  constructor() {
    super();
    this._tripEvents = [];
  }

  setTripEvents(tripEvents) {
    this._tripEvents = tripEvents.slice();
  }

  getTripEvents() {
    return this._tripEvents;
  }

  updateTripEventPoint() {

  }
}
