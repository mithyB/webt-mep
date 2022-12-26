const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let data = [];

canvas.addEventListener('mousedown', function (e) {
  const position = getPosition(canvas, e);

  addShape(position.x, position.y);
});

function getPosition(canvas, event) {
  const borderOffset = 4;
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left - borderOffset;
  const y = event.clientY - rect.top - borderOffset;

  return { x, y };
}

function addShape(x, y) {
  const shape = getValueFromInput('shape');
  const color = getValueFromInput('color');
  const width = getValueFromInput('width');
  const height = getValueFromInput('height');

  if (shape === 'rectangle') {
    drawRectangle(color, x, y, width, height);

    data.push({ shape, color, x, y, width, height });
  } else {
    drawCircle(color, x, y, width);

    data.push({ shape, color, x, y, width });
  }

  updateData();
}

function drawRectangle(color, x, y, width, height) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

function drawCircle(color, x, y, diameter) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x + diameter / 2, y + diameter / 2, diameter / 2, 0, 2 * Math.PI);
  ctx.fill();
}

function getValueFromInput(id) {
  return document.getElementById(id).value;
}

function onShapeChange() {
  const shape = getValueFromInput('shape');
  if (shape === 'rectangle') {
    document.getElementById('height-control').style.display = 'block';
  } else {
    document.getElementById('height-control').style.display = 'none';
  }
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawWalls();
}

function drawWalls() {
  drawLine(2, 2, canvas.width, 2);
  drawLine(2, 2, 2, canvas.height - 2);
  drawLine(2, canvas.height - 2, canvas.width / 2, canvas.height - 2);
  drawLine(canvas.width - 2, 2, canvas.width - 2, canvas.height / 2);
  drawLine(
    canvas.width,
    canvas.height / 2,
    canvas.width / 2,
    canvas.height / 2,
  );
  drawLine(
    canvas.width / 2,
    canvas.height / 2,
    canvas.width / 2,
    canvas.height,
  );

  data = [];
  updateData();
}

function drawLine(fromX, fromY, toX, toY) {
  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.strokeStyle = 'teal';
  ctx.lineWidth = 4;
  ctx.stroke();
}

window.addEventListener('resize', function (e) {
  setCanvasWidth();
  drawWalls();
});

function setCanvasWidth() {
  const newWidth = Math.min(document.body.clientWidth - 55, 500);

  if (newWidth !== canvas.width) {
    canvas.width = newWidth;
  }
}

function updateData() {
  document.getElementById('data').value = JSON.stringify(data);
}

setCanvasWidth();
drawWalls();
