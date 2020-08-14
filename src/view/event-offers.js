const getEventOffersItemTemplateInEditForm = (offer) => {
  const {title, price} = offer;

  return `<div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-${offer.name}" checked="">
            <label class="event__offer-label" for="event-offer-luggage-1">
              <span class="event__offer-title">${title}</span>
              +
              €&nbsp;<span class="event__offer-price">${price}</span>
            </label>
          </div>`;
};

export const getEventOffersTemplateInEditForm = (offers) => {

  const offersBlockInEditForm = offers.map((offer) => getEventOffersItemTemplateInEditForm(offer)).join(``);

  return (`<section class="event__details">
              <section class="event__section  event__section--offers">
                <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                <div class="event__available-offers">
                    <!--container for available offers-->
                    ${offersBlockInEditForm}
                </div>
              </section>
            </section>`);
};
