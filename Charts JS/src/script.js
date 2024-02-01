// Bars Chart
class Rectangle {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

let data = [10, 25, 50, 30, 60];
const barWidth = 48;
const spacing = 10;
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let selectedBarIndex = -1;

function initCanvas() {
  canvas.addEventListener("wheel", handleScroll);
  canvas.addEventListener("mousemove", handleMouseMove);
  canvas.addEventListener("click", handleClick);
  drawBars();
}

function drawBars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const maxDataValue = Math.max(...data);
  let x = 10;

  for (let i = 0; i < data.length; i++) {
    const height = (data[i] / maxDataValue) * (canvas.height - 30);

    const backgroundBar = new Rectangle(
      x,
      0,
      barWidth,
      canvas.height - 30,
      "lightgray"
    );
    backgroundBar.draw(ctx);

    const fillColor = i === selectedBarIndex ? "red" : "blue";
    const frontBar = new Rectangle(
      x,
      canvas.height - height - 30,
      barWidth,
      height,
      fillColor
    );
    frontBar.draw(ctx);

    ctx.fillStyle = "#000";
    ctx.font = "14px Arial";
    ctx.fillText(data[i].toString(), x + barWidth / 2 - 10, canvas.height - 15);

    x += barWidth + spacing;
  }
}

function handleScroll(e) {
  e.preventDefault();
  const deltaY = e.deltaY;
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;

  let x = 20;
  let totalWidth = data.length * (barWidth + spacing);

  if (mouseX >= x && mouseX <= x + totalWidth) {
    for (let i = 0; i < data.length; i++) {
      if (mouseX >= x && mouseX <= x + barWidth) {
        if (deltaY < 0) {
          data[i] = Math.max(0, data[i] - 10);
        } else {
          data[i] += 10;
        }
        drawBars();
        break;
      }
      x += barWidth + spacing;
    }
  }
}

function handleMouseMove(e) {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  let x = 20;

  for (let i = 0; i < data.length; i++) {
    if (
      mouseX >= x &&
      mouseX <= x + barWidth &&
      mouseY >= canvas.height - data[i] - 30 &&
      mouseY <= canvas.height - 30
    ) {
      canvas.style.cursor = "pointer";
      return;
    }
    x += barWidth + spacing;
  }

  canvas.style.cursor = "default";
}

function handleClick(event) {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  let x = 20;

  for (let i = 0; i < data.length; i++) {
    if (
      mouseX >= x &&
      mouseX <= x + barWidth &&
      mouseY >= canvas.height - data[i] - 30 &&
      mouseY <= canvas.height - 30
    ) {
      selectedBarIndex = i;
      drawBars();
      break;
    }

    x += barWidth + spacing;
  }
}

window.onload = initCanvas;


// Lines Chart
class LineChart {
  constructor(canvasId, xValues, datasets) {
    this.canvasId = canvasId;
    this.xValues = xValues;
    this.datasets = datasets;
    this.chart = null;
    this.drawChart();
  }

  drawChart() {
    this.chart = new Chart(this.canvasId, {
      type: "line",
      data: {
        labels: this.xValues,
        datasets: this.datasets,
      },
      options: {
        legend: { display: false },
      },
    });
  }
}

function createDataset(data, borderColor) {
  return {
    data: data,
    borderColor: borderColor,
    fill: false,
  };
}

const xValues = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
const dataset1 = createDataset(
  [860, 1140, 1060, 1060, 1070, 1110, 1330, 2210, 7830, 2478],
  "red"
);
const dataset2 = createDataset(
  [1600, 1700, 1700, 1900, 2000, 2700, 4000, 5000, 6000, 7000],
  "green"
);
const dataset3 = createDataset(
  [300, 700, 2000, 5000, 6000, 4000, 2000, 1000, 200, 100],
  "blue"
);

const lineChart = new LineChart("canvas2", xValues, [
  dataset1,
  dataset2,
  dataset3,
]);


// Pie Chart
class PieChart {
  constructor(canvasId, labels, data, backgroundColors) {
    this.canvasId = canvasId;
    this.labels = labels;
    this.data = data;
    this.backgroundColors = backgroundColors;
    this.chart = null;
    this.drawChart();
  }

  drawChart() {
    this.chart = new Chart(this.canvasId, {
      type: "pie",
      data: {
        labels: this.labels,
        datasets: [
          {
            data: this.data,
            backgroundColor: this.backgroundColors,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: true,
            position: "bottom",
          },
          chartjsPlugin3d: {
            alpha: 45,
            beta: 0,
            enabled: true,
          },
        },
      },
    });
  }
}

const labels = ["Label 1", "Label 2", "Label 3", "Label 4"];
const dataP = [30, 20, 25, 25];
const backgroundColors = ["red", "green", "blue", "orange"];

const pieChart = new PieChart("canvas3", labels, dataP, backgroundColors);
