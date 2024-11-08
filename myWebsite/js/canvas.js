//
//	Student Name:  Grant Bossa
//	File Name: canvas.js
//	Date Created: Nov 6, 2024


// VARIABLES
let cs = document.querySelector("canvas").getContext("2d");

function main() {
   
	// Trapeziod
   trapeziod()
   // Red Diamond
   redDiamond(325, 150,"red", "red", 45 )
   
   // Zigzagging line
   ZigzaggingLine(225, 30, 15,50,15)

	// Spiral made up of 100 straight lines
   spiral(350,80)

	// Yellow Star
   //yellowStar(50,100 )

   star(500, 80, 25, 8, 1/16);

}
function trapeziod() {

   // Define trapezoid vertices (adjust as needed)
	const x1 = 10;
	const y1 = 100;
	const x2 = 100;
	const y2 = 100;
	const x3 = 75;
	const y3 = 50;
	const x4 = 30;
	const y4 = 50;

	
   // Start drawing the path
	cs.beginPath();

	// Move to the first vertex
	cs.moveTo(x1, y1);

	// Connect the vertices to form the trapezoid
	cs.lineTo(x2, y2);
	cs.lineTo(x3, y3);
	cs.lineTo(x4, y4);
	cs.closePath(); // Optional, closes the path

	// Draw the trapezoid
	cs.stroke(); // Outline only 
}
function trapeziod2() {	
   xy = [50, 100, 200, 100, 150, 50, 100, 50]

   //let cs = document.querySelector("canvas").getContext("2d");
	// Start drawing the path
	cs.beginPath();

	for (i in xy){
		if (i==0) {
			// Move to the first vertex
			cs.moveTo(xy[i], xy[i+1]);						
		} else if (i % 2==0) {
		   // Connect the vertices to form the trapezoid
			cs.lineTo(xy[i], xy[i+1]) 
		}
	}

	cs.closePath(); // Optional, closes the path

	// Draw the trapezoid
	cs.stroke(); // Outline only 
}
   // Red Diamond
function redDiamond(startX=0, startY=0, strokeStyle="black", fillStyle="black", angle=0) {
   
   const centerX = startX / 2;
   const centerY = startY / 2;
   const sideLength = 75;
   
   cs.save()   // save transformation [2, 3, 6]
   cs.fillStyle = fillStyle
   cs. strokeStyle = strokeStyle

   // Draw a square using the fillRect() method and fill it with the colour specified by the fillStyle attribute

   cs.translate(centerX, centerY); // Move to center [2, 3, 11]
 
   cs.rotate(angle); // Rotate by desired angle [2, 3, 4]
 
   //cs.fillRect(-sideLength / 2, -sideLength / 2, sideLength, sideLength, ); // Draw square
   cs.fillRect(-sideLength / 2, -sideLength / 2, sideLength, sideLength, ); // Draw square
   cs.restore(); // Reset transformation [2, 3, 6]
}

function drawRotatingSquare(angle) {

   const centerX = document.querySelector("canvas").width / 2;
 
   const centerY = document.querySelector("canvas").height / 2;
 
   const sideLength = 50;
 
 
 
   cs.save(); // Preserve current state [2, 3, 6]
 
   cs.translate(centerX, centerY); // Move to center [2, 3, 11]
 
   cs.rotate(angle); // Rotate by desired angle [2, 3, 4]
 
   cs.fillRect(-sideLength / 2, -sideLength / 2, sideLength, sideLength); // Draw square
 
   cs.restore(); // Reset transformation [2, 3, 6]
 
 }
 
// Zigzagging line
function ZigzaggingLine(startX, startY, numLines, sideLength, angleIncrement) {
   
   //startX = document.querySelector("canvas").width / 2;
   //startY = document.querySelector("canvas").height / 2;
   x = startX
   y = startY 
   cs.save()   // save transformation [2, 3, 6]
   cs.beginPath();
   cs.moveTo(startX, startY);   
   for (let i = 0; i < numLines; i++) {
      if (i%2==0){
         cs.lineTo(x+ sideLength, y ); 
      } else {
         cs.lineTo(x, y + 15         );
         y+=10
      }
   }
   cs.stroke();
   cs.restore(); // Reset transformation [2, 3, 6]
}

// Spiral made up of 100 straight lines
function spiral(startX=0, startY=0) {
    var radius = 0;
    var angle = 0;
    cs.save()   // save transformation [2, 3, 6]

    // Set the spiral style:
   cs.lineWidth = 1;
   cs.strokeStyle = "red"; // blue-ish color
   cs.beginPath();
   //cs.moveTo(document.querySelector("canvas").width / 2, document.querySelector("canvas").height / 2);
   cs.moveTo(startX, startY);

   //Rotate about the center of the canvas three times (50 iterations per full revolution) while increasing the radius by 0.75 for each iteration and draw a line segment to the current point from the previous point with lineTo(). Finally, make the spiral visible with stroke():

   for (var n = 0; n < 100; n++) {
      radius += 0.60;
      // make a complete circle every 50 iterations
      angle += (Math.PI * 2) / 33;
      //var x = document.querySelector("canvas").width / 2 + radius * Math.cos(angle);
      //var y = document.querySelector("canvas").height / 2 + radius * Math.sin(angle);
      
      var x = startX + radius * Math.cos(angle);
      var y = startY + radius * Math.sin(angle);
      
      cs.lineTo(x, y);
   }
    
   cs.stroke();
   cs.restore(); // Reset transformation [2, 3, 6]
};

// Yellow Star
function yellowStar(startX=0, startY=0){
   const canv = document.querySelector("canvas");
   const cs = canv.getContext('2d');
   const w = window.innerWidth;
   const h = window.innerHeight
   canv.width = w;
   canv.height = h;
   //cs.clearRect(0,0,w,h);
}   //offset x,y, size, spokes, rotation 0 to 1.
function star(ox, oy, s = 10, n = 5, r = 0.25){
      cs.fillStyle="yellow"
      cs.beginPath();
  
      for(let i=0;i<n*2;i++){
         let rotation = Math.PI*2*r;
         let angle = (i/(n*2))*Math.PI*2+rotation;
         let dist = s*(i%2)+s;
         let x = ox+Math.cos(angle)*dist;
         let y = oy+Math.sin(angle)*dist;
         if(i === 0) {
            cs.moveTo(x, y);
            continue; //skip
         }
         cs.lineTo(x, y);
      }
      cs.closePath();
      cs.fill()
}

main()
