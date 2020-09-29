import SmartView from "./smart.js";
import {getCurrentDate} from "../utils/trip-event-utils.js";

const DAYS_TO_FULLWEEK = 6;

const renderColorsChart = (colorsCtx, tasks) => {
  // Функция для отрисовки графика по цветам
};

const renderDaysChart = (daysCtx, tasks, dateFrom, dateTo) => {
  // Функция для отрисовки графика по датам
};

const createStatisticsTemplate = () => {
  const {tasks, dateFrom, dateTo} = data;
  const completedTaskCount = countCompletedTaskInDateRange(tasks, dateFrom, dateTo);

  return `<section class="statistics">
          <h2 class="visually-hidden">Trip statistics</h2>

          <div class="statistics__item statistics__item--money">
            <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
          </div>

          <div class="statistics__item statistics__item--transport">
            <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
          </div>

          <div class="statistics__item statistics__item--time-spend">
            <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
          </div>
        </section>`;
};

export default class StatisticsView extends SmartView {
  constructor(tripEvents) {
    super();

    this._data = {
      tripEvents,
      dateFrom: (() => {
        const date = getCurrentDate();
        date.setDate(date.getDate() - DAYS_TO_FULLWEEK);
        return date;
      })(),
      dateTo: getCurrentDate()
    };

    this._colorsCart = null;
    this._daysChart = null;

    this._dateChangeHandler = this._dateChangeHandler.bind(this);

    this._setCharts();
  }

  removeElement() {
    super.removeElement();

    if (this._colorsCart !== null || this._daysChart !== null) {
      this._colorsCart = null;
      this._daysChart = null;
    }
  }

  getTemplate() {
    return createStatisticsTemplate(this._data);
  }

  restoreHandlers() {
    this._setCharts();
  }

  _setCharts() {
    if (this._colorsCart !== null || this._daysChart !== null) {
      this._colorsCart = null;
      this._daysChart = null;
    }

    const {tasks, dateFrom, dateTo} = this._data;
    const colorsCtx = this.getElement().querySelector(`.statistic__colors`);
    const daysCtx = this.getElement().querySelector(`.statistic__days`);

    this._colorsCart = renderColorsChart(colorsCtx, tasks);
    this._daysChart = renderDaysChart(daysCtx, tasks, dateFrom, dateTo);
  }
}
