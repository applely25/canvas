const pos = {
  drawable: false,
  x: -1,
  y: -1,
};

const canvas = document.getElementById("canvas");
const size = document.getElementById("size");
const eraser = document.getElementById("eraser");
const color = document.getElementById("color");
const allClear = document.getElementById("allClear");
const pen = document.getElementById("pen");
const download = document.getElementById("download");

const ctx = canvas.getContext("2d");
const rect = canvas.getBoundingClientRect(); //터치 스크린

//캠버스 사이즈 조절
const CANVAS_SIZE = 500;

ctx.fillStyle = "white";
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;


eraser.addEventListener("click", Erase);
size.addEventListener("input", (e) => {
  ctx.lineWidth = e.target.value;
});
color.addEventListener("input", (e) => {
  ctx.strokeStyle = e.target.value;
});
allClear.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
pen.addEventListener("click", () => {
  ctx.strokeStyle = color.value;
});
download.addEventListener("click", () => {
  const link = document.createElement("a");

  link.download = "canvas.png";
  link.href = canvas.toDataURL("image/png");

  link.click();
});
canvas.addEventListener("mousedown", listener);
canvas.addEventListener("mousemove", listener);
canvas.addEventListener("mouseup", listener);
canvas.addEventListener("mouseout", listener);

//터치 스크린
canvas.addEventListener("touchstart", listener);
canvas.addEventListener("touchmove", listener);
canvas.addEventListener("touchend", listener);

function listener(e) {
  switch (e.type) {
    case "mousedown":
      drawStart(e);
      break;
    case "mousemove":
      if (pos.drawable) draw(e);
      break;
    case "mouseout":
    case "mouseup":
      drawEnd();
      break;
    case "touchstart":
      touchStart(e);
      break;
    case "touchmove":
      if (pos.drawable) touch(e);
      break;
    case "touchend":
      drawEnd();
      break;
  }
}

function drawStart(e) {
  pos.drawable = true;
  ctx.beginPath();
  pos.x = e.offsetX;
  pos.y = e.offsetY;
  ctx.moveTo(pos.x, pos.y);
}

function draw(e) {
  ctx.lineTo(e.offsetX, e.offsetY);
  pos.x = e.offsetX;
  pos.y = e.offsetY;
  ctx.stroke();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
}

function drawEnd() {
  pos.drawable = false;
  pos.x = -1;
  pos.y = -1;
}

//터치스크린
function touchStart(e) {
  pos.drawable = true;
  ctx.beginPath();
  pos.x = e.touches[0].pageX - rect.left;
  pos.y = e.touches[0].pageY - rect.top;
  ctx.moveTo(pos.x, pos.y);
}

//터치스크린
function touch(e) {
  ctx.lineTo(e.touches[0].pageX - rect.left, e.touches[0].pageY - rect.top);
  pos.x = e.touches[0].pageX - rect.left;
  pos.y = e.touches[0].pageY - rect.top;
  ctx.stroke();
}

function Erase() {
  ctx.strokeStyle = "white";
  console.log("da");
}
