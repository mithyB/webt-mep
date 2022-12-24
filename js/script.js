const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

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
  } else {
    drawCircle(color, x, y, width);
  }
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
}
