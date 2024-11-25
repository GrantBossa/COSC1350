/* ..:: B R E A K O U T   G A M E ::..
 *
 * breakout.js
 * Grant Bossa
 * November 13, 2024
 * 24/FA COSC 1350 NT
 *
*/

const canvas = document.getElementById("myCanvas");         // get the canvas element from the DOM.
const ctx = canvas.getContext("2d");                        // create a "2d rendering context".
const resetBtn = document.getElementById("btnReset");       // Reset button for game

let gameOver = false;   // Indicator for end of game processing
yourScore = 0;          // Keep track of score
yourLevel = 1;          // Keep track of level

// Add reset button event listener to the DOM
resetBtn.addEventListener("click", handleClick);

// Add keydown event listener to the DOM
document.addEventListener('keydown', function(event) {
   // execute paddle moveLeft & moveRight functions when the respective key is down
   if (event.key === 'ArrowLeft') {
      paddle.moveLeft();
   } else if (event.key === 'ArrowRight'){
      paddle.moveRight();
   }
});

// Removed keyup event listener when changed to classes as it would not be necessary

// Add mousemove event listener to the DOM
document.addEventListener('mousemove', (event) => {
   // execute paddle move Right or Left based in mouse movement
   if (event.movementX < 0) {
      paddle.moveLeft()
   } else if (event.movementX > 0) {
      paddle.moveRight()
   }
});
class Ball {                  // class variable for the ball
   constructor(x, y, radius, dx, dy, color = 'black') {
      this.x = x;             // x coordinate for ball
      this.y = y;             // y coordinate for ball
      this.radius = radius;   // radius of ball
      this.dx = dx;           // Change in x direction
      this.dy = dy;           // Change in y direction
      this.color = color      // color of ball
      this.isHit = false;     // collision indicator 
      this.reverseX = false;  // indicates whether the ball changes x direction
      this.reverseY = false;  // indicates whether the ball changes y direction

   }
 
   draw() {                // Draw Method for the ball
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color; 
      ctx.fill();
      ctx.closePath();
   }
 
   updateLoc() {           // Update location of the ball and respond to collisions
      
      if((this.x + this.radius >= canvas.width) || (this.x - this.radius<=0 )) { // Wall collision, reverse x direction
         this.reverseX = true
         this.isHit = true; 
      } 
      
      if((this.y - this.radius <= 0) || (paddle.isHit() ) )  {    // Roof or Paddle collision, reverse y direction
         this.reverseY= true
         this.isHit = true; 
      }
      if(this.y + this.radius >= canvas.height-paddle.height &&   // Bottom of the Canvas without paddle collision
         !(this.x + this.radius >= paddle.x && 
            this.x - this.radius <= paddle.x + paddle.width && 
            this.y + this.radius >= paddle.y &&
            this.y - this.radius <= paddle.y + paddle.height)
      ) {
         gameOver = true;                                         // End of game
      }
      
      if (this.isHit) { // If collision detected, execute hit function to process collision response
         this.hit()
      } 

      this.x += this.dx;   // set x position
      this.y += this.dy;   // set y position
   }

   hit() {  // If collision detected, execute hit function to process collision response
      if (this.reverseX) { ball.dx = -ball.dx; this.reverseX=false}  // reverse x position and reset indicators
      if (this.reverseY) { ball.dy = -ball.dy; this.reverseY=false}  // reverse y position and reset indicators
      ball.isHit = false;                                            // reset isHit indicator
   }
}

class Brick {                    // class variable for the bricks
   constructor(x, y, width, height, color) {
      this.x = x;                // x coordinate for brick
      this.y = y;                // y coordinate for brick
      this.width = width;        // width coordinate
      this.height = height;      // height coordinate
      this.color = color;        // color for brick
      this.isVisible = true;     // Visible state for brick
      this.points = 10           // Number of points for brick
   }
 
   draw() {                                                          // Draw Method for the brick
      this.isHit()                                                   // Brick collision detected?
      if (this.isVisible) {                                          // if visible, Draw the brick
         ctx.fillStyle = this.color;
         ctx.fillRect(this.x, this.y, this.width, this.height);
         ctx.stokeStyle = this.color;
         ctx.strokeRect(this.x, this.y, this.width, this.height);
      }
   }
   
   isHit() {                                                   // Collision Method detection for Brick
      if(ball.x + ball.radius >= this.x &&                     // Collision detection for Visible Brick
         ball.x - ball.radius <= this.x + this.width && 
         ball.y + ball.radius >= this.y &&
         ball.y - ball.radius <= this.y + this.height &&
         this.isVisible
      ){                                                       // Process the collision

         //add future bounce processing here (set bounce per side/direction of collision)

         if ((ball.x + ball.radius <= this.x +3) || (ball.x - ball.radius >= this.x+this.width-3) ) {  // Side collision detection
            ball.reverseX=true;                                                                        // Reverse ball x position
         }
         if ((ball.y + ball.radius <= this.y+3) || (ball.y - ball.radius >= this.y+this.height-3)) {  // Top/Bottom collision detection
            ball.reverseY=true;                                                                       // Reverse ball y position
         }         
         this.isVisible= false;                                      // Remove brick from display
         ball.isHit = true;                                          // Set ball.isHit flag to true
         ball.hit();                                                 // process ball.Hit function
         brickCountLeft += -1 ;                                      // Number of bricks left to display
         yourScore += this.points                                    // calculate your score
         document.getElementById("yourScore").innerHTML = yourScore; // Display your score
         return true;                                                // Return true for collision
      }
      return false;                 // Return false for collision
   }
}

class Paddle {                      // class variable for the Paddle
   constructor(x, y, width, height, xMoveDist, color='black') {
      this.x = x;                   // x coordinate for brick
      this.y = y;                   // y coordinate for brick
      this.width = width;           // width coordinate
      this.height = height;         // height coordinate
      this.xMoveDist = xMoveDist;   // move distance
      this.color = color            // color for Paddle
   }
 
   
   moveLeft() {                     // Method to move the paddle left
      this.x -= this.xMoveDist;     // move distance to the left
      
      if (this.x < 0) {             // Prevent paddle from going off the left edge of the canvas
         this.x = 0;
      }
   }
 
   
   moveRight() {                                   // Method to move the paddle right
      this.x += this.xMoveDist;                    // move distance to the right
      
      if (this.x + this.width >= canvas.width) {   // Prevent paddle from going off the right edge of the canvas
         this.x = canvas.width - this.width;
      }
   }
 
      draw() {                                     // Method to draw the paddle on the canvas

      ctx.fillStyle = this.color; 
      ctx.fillRect(this.x, this.y, this.width, this.height);
   }

   isHit() {                                                // Collision Method detection for paddle
      if(ball.x + ball.radius >= this.x &&                  // Collision detection for paddle
         ball.x - ball.radius <= this.x + this.width && 
         ball.y + ball.radius >= this.y &&
         ball.y - ball.radius <= this.y + this.height
      ) {                                                         // Proccess the collision
         ball.isHit = true;                                       // set collision indicator
         ball.reverseY = true;                                    // set ball direction
         if((ball.x + ball.radius <= this.x + .1 * this.width ||  // if ball collides with corner ie. first or last 10 percent of paddle width
            ball.x - ball.radius >= this.x + .9 * this.width) ) {
            ball.reverseX = true;                                 // reverse ball direction
         } 
         return true;                                             // return true for collision
      }
      return false;                                               // return false for collision
   }
}
   

function drawBricks() {                               // Draw the bricks
   for (let c = 0; c < brickColumns; c++) {           // columns
      for (let r = 0; r < brickRows; r++) {           // rows
         bricks[c][r].draw();                         // draw the brick
      }
   }
}

function handleClick() {                              // Reset button processing
  window.location.reload();                           // Reload the page
}

function randomColor() {                           // returns a random color
   return '#' + Math.floor(Math.random() * 0x1000000).toString(16).padStart(6, '0');
}

const ball = new Ball(canvas.width / 2, canvas.height / 2, 15, 3, 3, 'red');           // define the ball
const paddle = new Paddle(canvas.width / 2, canvas.height - 15, 100, 15, 3, "blue");   // define the paddle

brickColumns = 6                                // number of columns
brickRows = 4                                   // number of rows
brickWidth = 90                                 // Brick width 
brickHeight = 25                                // Brick height
brickPadding = 10                               // Brick padding
brickTopOffset = 40                             // Brick top offset
brickLeftOffset = 5                             // Brick left offset
brickCountLeft = brickRows * brickColumns       // Total brick count

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


// Main draw function.
draw=()=> {
   if  (gameOver) {                                      // If game over process end of game
      alert("Game Over!\nThank You For Playing!");       // Display game over
      clearInterval(intervalID);                         // Clear interval ID for display      
   }
   else if (brickCountLeft <= 0) {                       // if all bricks are hit - reset Display
      for (let c = 0; c < brickColumns; c++) {           
         for (let r = 0; r < brickRows; r++) {           
            bricks[c][r].isVisible=true;                 // reset visibility
            brickCountLeft++;                            // reset brick count
         }
      }                                            // Reset for next level
      ball.x=canvas.width / 2, canvas.height / 2   // reset ball position
      ball.y=ball_yPos = canvas.height / 2         // reset ball position
      ball.radius -= 2                             // change ball size per level
      if (ball.dx < 0) ball.dx = -ball.dx;         // reset ball to falling position
      if (ball.dy < 0) ball.dy = -ball.dy;         // reset ball to falling position
      ball.dx += 1                                 // add speed to ball per level
      ball.dy += 1                                 // add speed to ball per level
      paddle.xMoveDist = ball.dx                   // change paddle speed to match ball
      yourLevel += 1                               // increase level
      document.getElementById("yourLevel").innerHTML = yourLevel; // display new level
   }   
   // Clear drawing canvas
   ctx.clearRect(0, 0, canvas.width, canvas.height);

   ball.draw();         // Render Ball
   paddle.draw();       // Render Paddle
   drawBricks();        // Render bricks
   ball.updateLoc();    // Update ball position
};

/*
 * setInterval(func, delay)
 * this built-in global JavaScript function executes 'func' function every
 * 'delay' milliseconds, and returns an interval ID.
 *
 * The refreshRate changes the redrawing speed in a reverse correlation, the smaller the number, the faster the redraw. 
 */
const refreshRate = 40;
const intervalID = setInterval(draw, refreshRate);
