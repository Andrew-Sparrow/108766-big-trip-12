import Observer from "../utils/observer.js";

export default class TripEventOffersModel extends Observer {
  constructor() {
    super();
    this._tripEventOffers = [];
  }

  setTripEventOffers(tripEventOffers) {
    this._tripEventOffers = tripEventOffers.slice();
  }

  getTripEventOffers() {
    return this._tripEventOffers;
  }

  addTripEventOffer(updateTypeForRerender, updatedItem) {
    this._tripEvents = [
      updatedItem,
      ...this._tripEvents
    ];

    this._notify(updateTypeForRerender, updatedItem);
  }

  deleteTripEventOffer(updateTypeForRerender, updatedItem) {
    const index = this._tripEventOffers.findIndex((tripEventOffer) => tripEventOffer.name === updatedItem.name);

    if (index === -1) {
      throw new Error(`Can't delete nonexistent trip event offer`);
    }

    this._tripEvents = [
      ...this._tripEvents.slice(0, index),
      ...this._tripEvents.slice(index + 1)
    ];
    this._notify(updateTypeForRerender);
  }
}
