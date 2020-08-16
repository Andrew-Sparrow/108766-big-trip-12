const getEventPhoto = (photoSrc) => {
  return (`<img class="event__photo" src="${photoSrc}" alt="Event photo">`);
};


export const getEventItemDestination = (travelEvent) => {
  const {destination} = travelEvent;
  const {photos, description} = destination;

  const photosBlockTemplate = photos
    .map((photo) => getEventPhoto(photo))
    .join(``);

  return (`<section class="event__section  event__section--destination">
              <h3 class="event__section-title  event__section-title--destination">Destination</h3>
              <p class="event__destination-description">${description}</p>

              <div class="event__photos-container">
                <div class="event__photos-tape">
                ${photosBlockTemplate}
                </div>
              </div>
            </section>`);
};
