// ##############################
// // // JavaScript library for creating charts
// #############################
var Chartist = require("chartist");

// ##############################
// // // Variables used to create animation on charts
// #############################
var delays = 80,
  durations = 500;
var delays2 = 80,
  durations2 = 500;

// ##############################
// // // User Registration Trend
// #############################
const userRegistrationTrendChart = {
  data: {
    labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    series: [[200, 300, 250, 400, 450, 500]],
  },
  options: {
    lineSmooth: Chartist.Interpolation.cardinal({
      tension: 0,
    }),
    low: 0,
    high: 600,
    chartPadding: {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20,
    },
  },
  animation: {
    draw: function (data) {
      if (data.type === "line" || data.type === "area") {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint,
          },
        });
      } else if (data.type === "point") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: "ease",
          },
        });
      }
    },
  },
};

// ##############################
// // // Active vs Inactive Users
// #############################
const activeInactiveUsersChart = {
  data: {
    labels: ["Active", "Inactive"],
    series: [70, 30],
  },
  options: {
    donut: true,
    donutWidth: 40,
    startAngle: 0,
    showLabel: true,
    chartPadding: 30,
  },
  animation: {
    draw: function (data) {
      if (data.type === "slice") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: Chartist.Svg.Easing.easeOutQuint,
          },
        });
      }
    },
  },
};

// ##############################
// // // Users by Region
// #############################
const usersByRegionChart = {
  data: {
    labels: ["North", "South", "East", "West"],
    series: [[150, 200, 100, 250]],
  },
  options: {
    axisX: {
      showGrid: false,
    },
    low: 0,
    high: 300,
    chartPadding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  },
  responsiveOptions: [
    [
      "screen and (max-width: 640px)",
      {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          },
        },
      },
    ],
  ],
  animation: {
    draw: function (data) {
      if (data.type === "bar") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: "ease",
          },
        });
      }
    },
  },
};

// ##############################
// // // Export Charts
// #############################
module.exports = {
  userRegistrationTrendChart,
  activeInactiveUsersChart,
  usersByRegionChart,
};

