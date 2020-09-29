import ObserverUtils from "../utils/observer-utils.js";

export default class TripEventPointsModel extends ObserverUtils {
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

  // event, payload
  updateTripEventPoint(updateTypeForRerender, updatedItem) {
    const index = this._tripEvents.findIndex((tripEvent) => tripEvent.id === updatedItem.id);

    if (index === -1) {
      throw new Error(`Can't update nonexistent trip event item`);
    }

    this._tripEvents = [
      ...this._tripEvents.slice(0, index),
      updatedItem,
      ...this._tripEvents.slice(index + 1)
    ];

    // event, payload
    this._notify(updateTypeForRerender, updatedItem);
  }

  addTripEvent(updateTypeForRerender, updatedItem) {
    this._tripEvents = [
      updatedItem,
      ...this._tripEvents
    ];

    this._notify(updateTypeForRerender, updatedItem);
  }

  deleteTripEvent(updateTypeForRerender, updatedItem) {
    const index = this._tripEvents.findIndex((tripEvent) => tripEvent.id === updatedItem.id);

    if (index === -1) {
      throw new Error(`Can't delete nonexistent trip event item`);
    }

    this._tripEvents = [
      ...this._tripEvents.slice(0, index),
      ...this._tripEvents.slice(index + 1)
    ];
    this._notify(updateTypeForRerender);
  }
}
