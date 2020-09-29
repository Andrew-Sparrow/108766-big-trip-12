import FiltersView from "../view/filters-view.js";

import {
  RenderPosition,
  replace,
  remove, renderDOMElement,
} from "../utils/render-utils.js";

import {filterTripEvents} from "../utils/utils.js";

import {
  FilterType,
  UpdateTypeForRerender
} from "../const.js";

export default class FilterPresenter {
  constructor(filterContainer, filterModel, tasksModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._tasksModel = tasksModel;
    this._currentFilter = null;

    this._filterComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._tasksModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._currentFilter = this._filterModel.getFilter();

    const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new FiltersView(filters, this._currentFilter);
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    if (prevFilterComponent === null) {
      renderDOMElement(this._filterContainer, this._filterComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._currentFilter === filterType) {
      return;
    }

    this._filterModel.setFilter(UpdateTypeForRerender.MAJOR, filterType);
  }

  _getFilters() {
    const tripEvents = this._tasksModel.getTripEvents();

    return [
      {
        type: FilterType.EVERYTHING,
        name: `Everything`,
        count: filterTripEvents[FilterType.EVERYTHING](tripEvents).length
      },
      {
        type: FilterType.FUTURE,
        name: `Future`,
        count: filterTripEvents[FilterType.FUTURE](tripEvents).length
      },
      {
        type: FilterType.PAST,
        name: `Past`,
        count: filterTripEvents[FilterType.PAST](tripEvents).length
      }
    ];
  }
}
