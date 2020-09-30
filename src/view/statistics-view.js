import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import SmartView from "./smart.js";
import {
  calculateMoneyForTypes,
  getTypesForLabels
} from "../utils/statistics-utils.js";

const renderMoneySpentChart = (moneyContext, tripEvents) => {
  const matchingTripEventsTypesToMoney = calculateMoneyForTypes(tripEvents);

  const uniqueTripEventsTypes = matchingTripEventsTypesToMoney.typesOfTripEvents;
  const uniqueTypesWithIcons = getTypesForLabels(uniqueTripEventsTypes);
  const amountOfMoneyForEachTypeOfTrip = matchingTripEventsTypesToMoney.totalSumsForEachTripEvents;

  return new Chart(moneyContext, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: uniqueTypesWithIcons,
      datasets: [{
        data: amountOfMoneyForEachTypeOfTrip,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `€ ${val}`
        }
      },
      title: {
        display: true,
        text: `MONEY`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderTransportChart = (transportContext) => {
  return new Chart(transportContext, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: [`???? DRIVE`, `???? RIDE`, `✈️ FLY`, `????️ SAIL`],
      datasets: [{
        data: [4, 3, 2, 1],
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}x`
        }
      },
      title: {
        display: true,
        text: `TRANSPORT`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const createStatisticsTemplate = (data) => {
  const {} = data;

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
    };

    this._moneyCart = null;
    this._transportChart = null;

    this._setCharts();
  }

  removeElement() {
    super.removeElement();

    if (this._moneyCart !== null || this._transportChart !== null) {
      this._moneyCart = null;
      this._transportChart = null;
    }
  }

  getTemplate() {
    return createStatisticsTemplate(this._data);
  }

  restoreHandlers() {
    this._setCharts();
  }

  _setCharts() {
    if (this._moneyCart !== null || this._transportChart !== null) {
      this._moneyCart = null;
      this._transportChart = null;
    }

    const {tripEvents} = this._data;

    const BAR_HEIGHT = 55;

    const moneyCtx = this.getElement(`.statistics__chart--money`);
    const transportCtx = this.getElement(`.statistics__chart--transport`);
    // const timeSpendCtx = this.getElement(`.statistics__chart--time-spend`);

    moneyCtx.height = BAR_HEIGHT * 6;
    transportCtx.height = BAR_HEIGHT * 4;
    // timeSpendCtx.height = BAR_HEIGHT * 4;

    this._moneyCart = renderMoneySpentChart(moneyCtx, tripEvents);
    this._transportChart = renderTransportChart(transportCtx, tripEvents);
    // this._timeSpentChart = renderTimeSpentChart(daysCtx, tasks, dateFrom, dateTo);
  }
}
