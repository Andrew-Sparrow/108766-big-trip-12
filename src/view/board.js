import AbstractView from "./abstract.js";

const createBoardTemplate = () => {
  return `<section class="trip-events"></section>`;
};

export default class Board extends AbstractView {
  getTemplate() {
    return createBoardTemplate();
  }
}
