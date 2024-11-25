/* ..:: B R E A K O U T   G A M E ::..
 *
 * breakout.js
 * Grant Bossa
 * November 13, 2024
 * 24/FA COSC 1350 NT
 *
 * I started this with just using a drawing canvas and variables for drawing the ball and paddle.
 * I spoke with Mr. Depoyster about trying to do it with classes.
 * 
 * I ended up with a bunch of code that is combined at the moment.
 * There is code for the classes and code for the variables.
 * I will clean this up once I have finished the rest of the homework 
 * for my other classes. 
 * 
 * I am submitting this as a complete program as it does work,
 * I am just not happy with the combined code. I will clean it up over 
 * Thanksgiving break.
 */


let gameOver = false;
// get the canvas element from the DOM.
const canvas = document.getElementById("myCanvas");

//  create a "2d rendering context".
const ctx = canvas.getContext("2d");

class Ball {
   constructor(x, y, radius, dx, dy) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.dx = dx; //  Change in x direction
      this.dy = dy; // Change in y direction
      this.isHit = false;
   }
 
   draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = "yellow"; 
      ctx.fill();
      ctx.closePath();
   }
 
   updateLoc() {
      if (ball.isHit) {
      //   ball.dx = -ball.dx;
         ball.dy = -ball.dy;
         ball.isHit = false;
      } else {
         if((ball.x + ball.radius > canvas.width) || (ball.x - ball.radius<=0 )) {
            ball.dx = -ball.dx;
         } 
         //   if((ball.y + ball.radius > canvas.height) || (ball.y - ball.radius <= 0) || (paddle.isHit() ) )  {
         if((ball.y - ball.radius <= 0) || (paddle.isHit() ) )  {
            ball.dy = -ball.dy;
         }
         if(ball.y + ball.radius > canvas.height-paddle.height && 
            !(ball.x + ball.radius > paddle.x && 
            ball.x - ball.radius < paddle.x + paddle.width && 
            ball.y + ball.radius > paddle.y &&
            ball.y - ball.radius < paddle.y + paddle.height)
         ) {
            gameOver = true;
         }
      }
      
      this.x += this.dx;
      this.y += this.dy;
   }
}

class Brick {
   constructor(x, y, width, height, color) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.color = color;
      this.isVisible = true;   
   }
 
   draw() {
      this.isHit()
      if (this.isVisible) {
         ctx.fillStyle = this.color;
         ctx.fillRect(this.x, this.y, this.width, this.height);
         ctx.stokeStyle = "black";
         ctx.strokeRect(this.x, this.y, this.width, this.height);
      }
   }
   
   isHit() {
      if(ball.x + ball.radius > this.x && 
         ball.x - ball.radius < this.x + this.width && 
         ball.y + ball.radius > this.y &&
         ball.y - ball.radius < this.y + this.height &&
         this.isVisible
      ){
         this.isVisible= false;
         //add bounce processing here (set bounce)
         ball.isHit = true;
         brickCountLeft += -1
         return true;
      }
      return false;
   }
}

class Paddle {
   constructor(x, y, width, height, xMoveDist) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.xMoveDist = xMoveDist;
   }
 
   // Method to move the paddle left
   moveLeft() {
      this.x -= this.xMoveDist;
      // Prevent paddle from going off the left edge of the canvas
      if (this.x < 0) {
         this.x = 0;
      }
   }
 
   // Method to move the paddle right
   moveRight() {
      this.x += this.xMoveDist;
      // Prevent paddle from going off the right edge of the canvas
      if (this.x + this.width > canvas.width) {
         this.x = canvas.width - this.width;
      }
   }
 
   // Method to draw the paddle on the canvas
   draw() {
      ctx.fillStyle = "white"; 
      ctx.fillRect(this.x, this.y, this.width, this.height);
   }

   isHit() {
      if(ball.x + ball.radius > this.x && 
         ball.x - ball.radius < this.x + this.width && 
         ball.y + ball.radius > this.y &&
         ball.y - ball.radius < this.y + this.height
      ) {
         return true;
      }
      return false;
   }
}
   
const ball = new Ball(canvas.width / 2, canvas.height / 2, 15, 3, 3);
const paddle = new Paddle(canvas.width / 2, canvas.height - 20, 100, 15, 3);

// Colored ball stats: x position, y position, radius, color
let ball_Radius = 15, ball_xPos = canvas.width / 2, ball_yPos = canvas.height / 2, ballColor="#000000";

// Paddle stats: x position, y position, height, width, color
let paddle_xPos = canvas.width / 2, paddle_yPos = canvas.height-20; paddle_height = 15, paddle_width = 100, paddleColor="#000000";

// Balls move distances for x & y, used to move the ball around.
let ball_xMoveDist = 3, ball_yMoveDist = 3;

// Paddle move distances, x only as the paddle y position doesnt change  move distance. 
let paddle_xMoveDist = 3, paddle_moveLeft = false, paddle_moveRight = false;

brickColumns = 6
brickRows = 4
brickWidth = 90
brickHeight = 25
brickPadding = 10
brickTopOffset = 40
brickLeftOffset = 5
brickCountLeft = brickRows * brickColumns

// Create an array of bricks
let bricks = [];
for (let c = 0; c < brickColumns; c++) {
   bricks[c] = [];
   for (let r = 0; r < brickRows; r++) {
      bricks[c][r] = new Brick(c * (brickWidth + brickPadding) + brickLeftOffset,
                              r * (brickHeight + brickPadding) + brickTopOffset,
                              brickWidth, brickHeight, randomColor());
   }
}

// Draw the bricks
function drawBricks() {
   for (let c = 0; c < brickColumns; c++) {
      for (let r = 0; r < brickRows; r++) {
         bricks[c][r].draw();
      }
   }
}

// Add keydown event listener to the DOM
document.addEventListener('keydown', function(event) {
   // Set moveLeft, moveRight to true when the respective key is down
   if (event.key === 'ArrowLeft') {
      paddle_moveLeft = true;
      paddle.moveLeft();
   } else if (event.key === 'ArrowRight'){
      paddle_moveRight = true;
      paddle.moveRight();
   }
});

// Add keydown event listener to the DOM
document.addEventListener('keyup', function(event) {
   // Set moveLeft, moveRight to fakse when the respective key is up
   if (event.key === 'ArrowLeft') {
      paddle_moveLeft = false;
   }
   if (event.key === 'ArrowRight') {
      paddle_moveRight = false;
   }
});

let prevX = 0;
let prevY = 0;

document.addEventListener('mousemove', (event) => {
   const x = event.clientX;
   const y = event.clientY;

   paddle.x = x;
   paddle.moveRight()
   prevX = x;
   prevY = y;
});

// Draws the ball on the canvas
ball_Render=()=>{

   ctx.beginPath();
   //arc creates circular arc starting at 0, ending at 2pi (360 degrees)
   ctx.arc(ball_xPos, ball_yPos, ball_Radius, 0, Math.PI * 2);
   //fill in the circular path with color
   ctx.fillStyle = ballColor
   ctx.fill();
   ctx.closePath();
}
bounce_ball=()=>{
   /* Compare ball to boundaries of canvas, if contact is made on borders, 
    * randomly changes the color of the paddle and the ball.
    * It also changes the x and y move distance as the borders are hit.
    */ 
   if((ball_xPos + ball_Radius >= canvas.width) || (ball_xPos - ball_Radius <=0)){
      ball_xMoveDist = -ball_xMoveDist;
      randomColor()
   }
   if((ball_yPos + ball_Radius >= canvas.height) || (ball_yPos - ball_Radius <= 0)) {
      ball_yMoveDist = -ball_yMoveDist;
      randomColor()
   }

   // Change the balls x and y position for next rendering.
   ball_xPos += ball_xMoveDist;
   ball_yPos += ball_yMoveDist;


}
// Draws the paddle on the canvas
paddle_Render=()=>{
   //fill in the paddle with color and draw
   ctx.fillStyle = paddleColor;
   ctx.fillRect(paddle_xPos, paddle_yPos, paddle_width, paddle_height);
}

// Changes the color of each object to random color
function randomColor() { 
   ballColor = '#' + Math.floor(Math.random() * 0x1000000).toString(16).padStart(6, '0'); 
   paddleColor = '#' + Math.floor(Math.random() * 0x1000000).toString(16).padStart(6, '0'); 
   return '#' + Math.floor(Math.random() * 0x1000000).toString(16).padStart(6, '0');
}

// Main draw function.
draw=()=> {
   if ((brickCountLeft <= 0) || gameOver) {
      alert("Game Over!\nThank You For Playing!"); 
      clearInterval(intervalID);
   }
   // Clear drawing canvas
   ctx.clearRect(0, 0, canvas.width, canvas.height);

   // Temp ball_Render();    // Render Ball
   ball.draw();
// Temp paddle_Render();  // Render Paddle
   paddle.draw();
   drawBricks();


   ball.updateLoc();
// Temp bounce_ball();

   /* Compare paddle to boundaries of canvas.
    * If the paddle is to the left or right it is limited so that it cannot go off screen
    * In the assignment, xPaddle is supposed to be used in place of paddle_xPos
    * I am using paddle_xPos to stay consistent with ball_xPos and ball_yPos.
    */
//   if(paddle_xPos >= canvas.width - paddle_width) paddle_moveRight = false;
//   if (paddle_xPos <= 0) paddle_moveLeft = false;
   
   // Check if the keypress booleans moveRight & moveLeft are enabled, set move position for the paddle.
//   if (paddle_moveRight) paddle_xPos += paddle_xMoveDist;
//   if (paddle_moveLeft) paddle_xPos += -paddle_xMoveDist;
   
};

/*
 * setInterval(func, delay)
 * this built-in global JavaScript function executes 'func' function every
 * 'delay' milliseconds, and returns an interval ID. We won't really use intervalID
 * so don't worry to much about that for now.
 *
 * The refreshRate changes the redrawing speed in a reverse correlation, the smaller the number, the faster the redraw. 
 */
const refreshRate = 40;
const intervalID = setInterval(draw, refreshRate);
