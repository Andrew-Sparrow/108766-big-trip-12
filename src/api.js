import TripEventPointsModel from "./model/trip-event-points-model.js";

const Method = {
  GET: `GET`,
  PUT: `PUT`
};

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299
};

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getTripEvents() {
    return this._load({url: `points`})
      .then(Api.toJSON)
      .then((tripEvents) => tripEvents.map(TripEventPointsModel.adaptTripEventToClient));
  }

  updateTripEvent(tripEvent) {
    return this._load({
      url: `points/${tripEvent.id}`,
      method: Method.PUT,
      body: JSON.stringify(TripEventPointsModel.adaptTripEventToServer(tripEvent)),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then(Api.toJSON())
      .then(TripEventPointsModel.adaptTripEventToClient);
  }

  _load({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers()
  }) {
    headers.append(`Authorization`, this._authorization);

    return fetch(
        `${this._endPoint}/${url}`,
        {method, body, headers}


    )
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  getTripEventsDestinations() {
    return this._load({url: `destinations`})
      .then(Api.toJSON);
  }

  getTripEventsOffers() {
    return this._load({url: `offers`})
      .then(Api.toJSON);
  }

  static checkStatus(response) {
    if (
      response.status < SuccessHTTPStatusRange.MIN &&
      response.status > SuccessHTTPStatusRange.MAX
    ) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(err) {
    throw err;
  }
}
