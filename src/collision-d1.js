// Gettiing the canvas Element from the DOM.
const canvas = document.getElementById("canvas1");
const context = canvas.getContext("2d");

// Define the width and height of the canvas element
canvas.width = 500;
canvas.height = 700;

// explosions variable that is assign to an Array.
const explosions = [];
// canvasPosition variable.
let canvasPosition = canvas.getBoundingClientRect();

class Explosion {
  constructor(x, y) {
    this.spriteWidth = 200;
    this.spriteHeight = 170;
    this.width = this.spriteWidth * 0.7;
    this.height = this.spriteHeight * 0.7;
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.image.src = "images/boom.png";
    this.frame = 0;
    this.timer = 0;
    this.angle = Math.random() * 6.2;
  }
  update() {
    this.timer++;
    if (this.timer % 10 === 0) {
      this.frame++;
    }
  }
  draw() {
    // source stands for s:, destination stands for d::
    // image, sx ,sy, sw, sh dx, dy, dw, dh
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.angle);
    context.drawImage(
      this.image,
      this.spriteWidth * this.frame,
      0,
      this.spriteWidth,
      this.spriteHeight,
      0 - this.width / 2,
      0 - this.height / 2,
      this.x,
      this.y,
      this.width,
      this.height
    );
    context.restore();
  }
}

window.addEventListener("click", function (event) {
  createAnimation(event);
});
window.addEventListener("mousemove", function (event) {
  createAnimation(event);
});

function createAnimation(event) {
  let positionX = event.x - canvasPosition.left;
  let positionY = event.y - canvasPosition.top;
  explosions.push(new Explosion(positionX, positionY));
}

function animate() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < explosions.length; i++) {
    explosions[i].update();
    explosions[i].draw();
    if (explosions[i].frame > 5) {
      explosions.splice(i, 1);
      i--;
    }
  }
  requestAnimationFrame(animate);
}
animate();
