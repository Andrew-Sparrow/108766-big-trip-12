import Abstract from "./abstract.js";

export default class Smart extends Abstract {
  constructor() {
    super();
    this._data = {};
  }

  // "Фокус" в том, что при генерации нового элемента
  // будет снова зачитано свойство _data.
  // И если мы сперва обновим его, а потом шаблон, то в итоге получим элемент с новыми данными
  updateElement() {
    let prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);

    // Чтобы окончательно "убить" ссылку на prevElement
    prevElement = null;
  }

  updateData(update, justDataUpdating) {
    if (!update) {
      return;
    }

    this._data = Object.assign(
        {},
        this._data,
        update
    );

    if (justDataUpdating) {
      return;
    }

    this.updateElement();

    this.restoreHandlers();
  }

  restoreHandlers() {
    throw new Error(`Abstract method not implemented: restoreHandlers`);
  }
}
