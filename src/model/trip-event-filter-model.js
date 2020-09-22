import Observer from "../utils/observer.js";
import {FilterType} from "../const.js";

export default class FilterModel extends Observer {
  constructor() {
    super();

    this._activeFilter = FilterType.EVERYTHING;
  }

  setFilter(updateType, activeFilter) {
    this._activeFilter = activeFilter;
    this._notify(updateType, activeFilter);
  }

  getFilter() {
    return this._activeFilter;
  }
}
