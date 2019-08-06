sessionStorage.setItem("coin", "BTC");

const colors = {
  BTC: "rgb(255, 123, 0)",
  ETH: "rgb(9, 189, 15)",
  XRP: "rgb(9, 54, 189)",
  LTC: "rgba(96,96,96,0.6)"
};

const defaultSettings = {
  fill: false,
  borderWidth: 3,
  lineTension: 0,
  pointRadius: 0,
  pointHitRadius: 30
};

function addLine(chart, data) {
  const coin = sessionStorage.getItem("coin");
  const newDataset = Object.assign(defaultSettings, {
    label: coin,
    data: [],
    borderColor: colors[coin]
  });
  console.log(chart.data.datasets);
  chart.data.datasets.push(newDataset);
  data.forEach(point => {
    addData(chart, point);
  });
}

function addData(chart, point) {
  const { time, value } = point;
  chart.data.labels.push(time);
  chart.data.datasets.forEach(dataset => {
    dataset.data.push(value);
  });
  chart.update();
}

function removeLine(chart) {
  chart.data.labels = new Array();
  chart.data.datasets = new Array();
  chart.update();
}

function removeData(chart) {
  chart.data.labels.pop();
  chart.data.datasets.forEach(dataset => {
    dataset.data.pop();
  });
  chart.update();
}

const ctx = document.getElementById("myChart").getContext("2d");

const myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [],
    datasets: []
  },
  options: {
    legend: { display: false },
    tooltips: {
      displayColors: false,
      callbacks: {
        title: function(tooltipItem, data) {
          const time = data.labels[tooltipItem[0].index];
          return time.format("Do MMM HH:mm");
        },
        label: function(tooltipItem, data) {
          return (
            data.datasets[tooltipItem.datasetIndex].label +
            ` $${tooltipItem.yLabel.toLocaleString()}`
          );
        }
      }
    },
    scales: {
      yAxes: [
        {
          gridLines: { borderDash: [5, 5] },
          ticks: {
            fontColor: "#007bff",
            callback: function(value, index, values) {
              return "$" + value.toLocaleString();
            }
          }
        }
      ],
      xAxes: [
        {
          gridLines: { display: false },
          ticks: {
            fontColor: "#007bff",
            callback: function(item, index) {
              if (!(index % 24)) return item.format("Do MMM");
              else return "";
            },
            autoSkip: false
          }
        }
      ]
    }
  }
});

function newLine(chart) {
  const request = axios({
    method: "get",
    url: "/data",
    params: {
      coin: sessionStorage.getItem("coin"),
      currency: sessionStorage.getItem("currency")
    }
  });

  request
    .then(response => {
      const data = response.data.map(day => {
        const time = moment.unix(day.timestamp);
        const { value } = day;
        return { time, value };
      });
      addLine(chart, data);
    })
    .catch(error => {
      console.log(error);
    });
}

newLine(myChart);
