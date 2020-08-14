export const getEventOffersItemTemplateInEditForm = (offer) => {
  return `<div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-${offer.name}" checked="">
            <label class="event__offer-label" for="event-offer-luggage-1">
              <span class="event__offer-title">${offer.title}</span>
              +
              €&nbsp;<span class="event__offer-price">${offer.price}</span>
            </label>
          </div>`;
};
