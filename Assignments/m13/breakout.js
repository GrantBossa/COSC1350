/* ..:: B R E A K O U T   G A M E ::..
 *
 * breakout.js
 * Grant Bossa
 * November 13, 2024
 * Project for COSC 1350
 *
 */

// get the canvas element from the DOM.
const canvas = document.getElementById("myCanvas");

/*  create a "2d rendering context".
 *  I suggest looking up and reading about the canvas.getContext function.
 *  You don't have to understand everything about canvas rendering contexts,
 *  but it help you get to know what the ctx object can and can't draw.
 */
const ctx = canvas.getContext("2d");




//drawing a ball requires the x position, y position, and radius
let ball_Radius = 15, ball_xPos = canvas.width / 2, ball_yPos = canvas.height / 2;

//drawing a paddle requires the x position, y position
let paddle_xPos = canvas.width / 2, paddle_yPos = canvas.height-20; paddle_height = 15, paddle_width = 100

//xy move distance. These values are used to move the ball around.
let ball_xMoveDist = 3, ball_yMoveDist = 3;

//x move distance. These values are used to move the paddle around.
let paddle_xMoveDist = 3, paddle_moveLeft = false, paddle_moveRight = true;




// Add keydown and keyup event listeners to the DOM
document.addEventListener('keydown', function(event) {
  // Handle keydown event
  console.log('Keydown:', event.key);
  paddle_moveLeft = true;
  paddle_moveRight = false;
});

document.addEventListener('keyup', function(event) {
  // Handle keyup event
  console.log('Keyup:', event.key);
  paddle_moveLeft = false;
  paddle_moveRight = true;
});

//function that draws the ball on the canvas
ball_Render=()=>{
  
  ctx.beginPath();
  //arc creates circular arc starting at 0, ending at 2pi (360 degrees)
  ctx.arc(ball_xPos, ball_yPos, ball_Radius, 0, Math.PI * 2);
  //fill in the circular path with default color

  ctx.fill();
  ctx.closePath();
}

//function that draws the paddle on the canvas
paddle_Render=()=>{
  ctx.fillstyle = "red";
  ctx.fillRect(paddle_xPos, paddle_yPos, paddle_width, paddle_height);
}


/*
* draw() can be thought of as our main function.
* We execute draw every few milliseconds to give our
* canvas the appearance of being animated. Notice how in the draw function
* the first thing done is ctx.clearRect(), which clears the whole canvas
* before drawing the next frame of animation.
*
* Right now, it only calls ball_Render() over and over again.
* Changing the ball_xPos and ball_yPos will cause the ball to be drawn somewhere else
* next time the function is called.
*/
draw=()=> {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ball_Render();
  paddle_Render();

  // compare ball to boundaries of canvas
  if((ball_xPos > canvas.width - ball_Radius) || (ball_xPos <=0 + ball_Radius)) ball_xMoveDist = -ball_xMoveDist;
  if((ball_yPos > canvas.height - ball_Radius) || (ball_yPos <= 0 + ball_Radius)) ball_yMoveDist = -ball_yMoveDist;

  // send the ball flying!
  ball_xPos += ball_xMoveDist;
  ball_yPos += ball_yMoveDist;

   // compare paddle to boundaries of canvas
  if(paddle_xPos >= canvas.width - paddle_width) {
    // paddle_moveLeft = true 
    paddle_moveRight = false
  }
  if (paddle_xPos <= 0) {
    //paddle_moveRight = true 
    paddle_moveLeft = false;
  }
  if (paddle_moveRight)
    paddle_xPos += paddle_xMoveDist;
  if (paddle_moveLeft) 
    paddle_xPos += -paddle_xMoveDist;
  
};

/*
 * setInterval(func, delay)
 * this built-in global JavaScript function executes 'func' function every
 * 'delay' milliseconds, and returns an interval ID. We won't really use intervalID
 * so don't worry to much about that for now.
 *
 * Try playing around with the refreshRate value.
 */
const refreshRate = 40;
const intervalID = setInterval(draw, refreshRate);
