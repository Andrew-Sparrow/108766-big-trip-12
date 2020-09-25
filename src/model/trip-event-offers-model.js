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
}
