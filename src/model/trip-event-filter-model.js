import ObserverUtils from "../utils/observer-utils.js";
import {FilterType} from "../const.js";

export default class FilterModel extends ObserverUtils {
  constructor() {
    super();

    this._activeFilter = FilterType.EVERYTHING;
  }

  setFilter(updateType, activeFilter) {
    this._activeFilter = activeFilter;
    this._notify(updateType, activeFilter);
  }

  getActiveFilter() {
    return this._activeFilter;
  }
}
