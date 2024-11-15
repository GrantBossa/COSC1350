/* ..:: B R E A K O U T   G A M E ::..
 *
 * breakout.js
 * Grant Bossa
 * November 13, 2024
 * 24/FA COSC 1350 NT
 *
 */


// get the canvas element from the DOM.
const canvas = document.getElementById("myCanvas");

//  create a "2d rendering context".
const ctx = canvas.getContext("2d");

// Colored ball stats: x position, y position, radius, color
let ball_Radius = 15, ball_xPos = canvas.width / 2, ball_yPos = canvas.height / 2, ballColor="#000000";

// Paddle stats: x position, y position, height, width, color
let paddle_xPos = canvas.width / 2, paddle_yPos = canvas.height-20; paddle_height = 15, paddle_width = 100, paddleColor="#000000";

// Balls move distances for x & y, used to move the ball around.
let ball_xMoveDist = 3, ball_yMoveDist = 3;

// Paddle move distances, x only as the paddle y position doesnt change  move distance. 
let paddle_xMoveDist = 3, paddle_moveLeft = false, paddle_moveRight = true;

// Add keydown event listener to the DOM
document.addEventListener('keydown', function(event) {
   // Report keydown to log. Set moveLeft to true when key is down
   console.log('Keydown:', event.key);
   paddle_moveLeft = true;
   paddle_moveRight = false;
});

// Add keyup event listener to the DOM
document.addEventListener('keyup', function(event) {
  // Report keyup to log. Set moveRight to true when key is down
  console.log('Keyup:', event.key);
  paddle_moveLeft = false;
  paddle_moveRight = true;
});

// Draws the ball on the canvas
ball_Render=()=>{

   ctx.beginPath();
   //arc creates circular arc starting at 0, ending at 2pi (360 degrees)
   ctx.arc(ball_xPos, ball_yPos, ball_Radius, 0, Math.PI * 2);
   //fill in the circular path with color
   ctx.fillstyle = ballColor
   ctx.fill();
   ctx.closePath();
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
}

// Main draw function.
draw=()=> {
   // Clear drawing canvas
   ctx.clearRect(0, 0, canvas.width, canvas.height);

   ball_Render();    // Render Ball
   paddle_Render();  // Render Paddle

   /* Compare ball to boundaries of canvas, if contact is made on borders, 
    * randomly changes the color of the paddle and the ball.
    * It also changes the x and y move distance as the borders are hit.
    */ 
   if((ball_xPos > canvas.width - ball_Radius) || (ball_xPos <=0 + ball_Radius)){
      ball_xMoveDist = -ball_xMoveDist;
      randomColor()
   }
   if((ball_yPos > canvas.height - ball_Radius) || (ball_yPos <= 0 + ball_Radius)) {
      ball_yMoveDist = -ball_yMoveDist;
      randomColor()
   }

   // Change the balls x and y position for next rendering.
   ball_xPos += ball_xMoveDist;
   ball_yPos += ball_yMoveDist;

   /* Compare paddle to boundaries of canvas.
    * If the paddle is to the left or right it is limited so that it cannot go off screen
    * In the assignment, xPaddle is supposed to be used in place of paddle_xPos
    * I am using paddle_xPos to stay consistent with ball_xPos and ball_yPos.
    */
   if(paddle_xPos >= canvas.width - paddle_width) paddle_moveRight = false;
   if (paddle_xPos <= 0) paddle_moveLeft = false;
   
   // Check if the keypress booleans moveRight & moveLeft are enabled, set move position for the paddle.
   if (paddle_moveRight) paddle_xPos += paddle_xMoveDist;
   if (paddle_moveLeft) paddle_xPos += -paddle_xMoveDist;
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
