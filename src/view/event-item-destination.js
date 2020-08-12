export const getEventItemDestination = (event) => {
  return (`<section class="event__section  event__section--destination">
              <h3 class="event__section-title  event__section-title--destination">Destination</h3>
              <p class="event__destination-description">${event.description}</p>

              <div class="event__photos-container">
                <div class="event__photos-tape">
                </div>
              </div>
            </section>`);
};
