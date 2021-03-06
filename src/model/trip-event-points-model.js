import ObserverUtils from "../utils/observer-utils.js";

import {capitalizeFirstLetter} from "../utils/utils.js";
import {generateId} from "../mock/trip-event-mock.js";
import {getGroupOfTripEventType} from "../utils/trip-event-utils.js";

export default class TripEventPointsModel extends ObserverUtils {
  constructor() {
    super();
    this._tripEvents = [];
  }

  setTripEvents(updateType, tripEvents) {
    this._tripEvents = tripEvents.slice();

    this._notify(updateType);
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

  static getAdaptedTripEventForClient(tripEventFromServer) {
    const adaptedDestination = Object.assign(
        {},
        tripEventFromServer.destination,
        {
          city: tripEventFromServer.destination.name,
          photos: tripEventFromServer.destination.pictures
        });

    const getAdaptedOffers = (offersFromServer) => {
      return offersFromServer.map((offerFromServer) => {
        return Object.assign(
            {},
            offerFromServer,
            {
              id: generateId(),
            });
      });
    };

    const adaptedRoutPointType = Object.assign(
        {},
        tripEventFromServer.routPointType,
        {
          name: capitalizeFirstLetter(tripEventFromServer.type),
          type: tripEventFromServer.type,
          offers: getAdaptedOffers(tripEventFromServer.offers),
        });

    const adaptedTripEvent = Object.assign(
        {},
        tripEventFromServer,
        {
          id: tripEventFromServer.id,
          dateStart: tripEventFromServer.date_from !== null ? new Date(tripEventFromServer.date_from) : tripEventFromServer.date_from,
          dateEnd: tripEventFromServer.date_to !== null ? new Date(tripEventFromServer.date_to) : tripEventFromServer.date_to,
          destination: adaptedDestination,
          price: tripEventFromServer.base_price,
          isFavorite: tripEventFromServer.is_favorite,
          routPointType: adaptedRoutPointType,
          routPointTypeGroupName: getGroupOfTripEventType(tripEventFromServer.type),
        }
    );

    delete adaptedTripEvent.date_from;
    delete adaptedTripEvent.date_to;
    delete adaptedTripEvent.base_price;
    delete adaptedTripEvent.is_favorite;
    delete adaptedTripEvent.destination.name;
    delete adaptedTripEvent.destination.pictures;
    delete adaptedTripEvent.offers;
    delete adaptedTripEvent.type;

    return adaptedTripEvent;
  }

  static getAdaptedTripEventForServer(tripEventFromClient) {
    const getAdaptedOffersForServer = (offersFromClient) => {
      return offersFromClient.map((offerFromClient) => {
        delete offerFromClient.id;
        delete offerFromClient.name;
        return offerFromClient;
      });
    };

    const adaptedDestination = Object.assign(
        {},
        tripEventFromClient.destination,
        {
          name: tripEventFromClient.destination.city,
          pictures: tripEventFromClient.destination.photos,
        });

    const adaptedTripEventForServer = Object.assign(
        {},
        tripEventFromClient,
        {
          "base_price": tripEventFromClient.price,
          "date_from": tripEventFromClient.dateStart.toISOString(),
          "date_to": tripEventFromClient.dateStart.toISOString(),
          "is_favorite": tripEventFromClient.isFavorite,
          "type": tripEventFromClient.routPointType.type,
          "offers": getAdaptedOffersForServer(tripEventFromClient.routPointType.offers),
          "destination": adaptedDestination,
        }
    );

    delete adaptedTripEventForServer.price;
    delete adaptedTripEventForServer.dateStart;
    delete adaptedTripEventForServer.dateEnd;
    delete adaptedTripEventForServer.isFavorite;
    delete adaptedTripEventForServer.routPointType;
    delete adaptedTripEventForServer.routPointTypeGroupName;
    delete adaptedTripEventForServer.destination.city;
    delete adaptedTripEventForServer.destination.photos;

    return adaptedTripEventForServer;
  }
}
