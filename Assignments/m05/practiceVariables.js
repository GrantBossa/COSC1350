/*  Grant Bossa
    September 20, 2024
    practiceVariables.js
    COSC 1350 NT
*/
/* Instructions Part 2
This part will help reinforce data types and how to manipulate them. You will use the console.log function and the typof operator to output (to terminal) variables and also to see how JavaScript treats each type when conflicting types are used.

1. Under the new m05 subfolder, create a file named practiceVariables.js (no spaces).
2. Add a multi-line comment with your name, the filename, and the date.
3. Declare the following variables (use programming best practices here... like let hiDrT = "Hi Dr. T"; ...for the first one):
    "Hi Dr. T!"
    4.5
    0
    -10
    true
4. For each variable above, print to the terminal window the type of each variable (use console.log(typeof variable); 
    where variable is replaced with your variable name. You should have five let statements followed by five console.log statements.
5. Next, run the following statements:
    1. console.log("Hi Dr. T!\nLet's get started!");
    2. console.log(`half of 100 is ${100 / 2}`);
    3. console.log("con" + "cat" + "e" + "nate");
    4. console.log(8 * null);
    5. console.log("5" - 1);
    6. console.log("5" + 1);
    7. console.log("five" * 2);
    8. console.log(false == true);
6. In a document, copy and paste your terminal output (or screenshot it) from steps 3-5.
7. Answer the following questions:
    1. Did any of the typeof outputs surprise you?
    2. What is happening in step 5.1 that is causing the line break?
    3. What do you think is happening in 5.2? You might need to research this one. :)
    4. Tell me why the output is what is is for 5.2 - 5.8.
8. Save the document as m05Assignment.docx and save it to your COSC1350 folder (not to your myWebsite folder).
*/
// Declare variables Step 3
let hiDrT = "Hi Dr. T!";
let num5point5 = 4.5;
let zero = 0;
let negTen = -10;
let boolTrue = true;

// Print variable types Step 4
console.log(typeof num5ptepoint5);
console.log(typeof zero);
console.log(typeof negTen);
console.log(typeof boolTrue);

// Print statements 5.1 through 5.8 Step 5
console.log("Hi Dr. T!\nLet's get started!");
console.log(`half of 100 is ${100 / 2}`);
console.log("con" + "cat" + "e" + "nate");
console.log(8 * null);
console.log("5" - 1);
console.log("5" + 1);
console.log("five" * 2);
console.log(false == true);