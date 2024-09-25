/*  Grant Bossa
    September 24, 2024
    fizzBuzz.js
    COSC 1350 NT
*/
/* Instructions Part 1
Write a program that uses console.log to print all the numbers from 1 to 100, with two exceptions. 
For numbers divisible by 3, print "Fizz" instead of the number, and 
for numbers divisible by 5 (and not 3), print "Buzz" instead. 
Name the file fizzBuzz,js, include a multi-line comment with your name, filename, and date, 
and be sure to run your code. 
*/
// Declare Variables
let message = "";    // declare message variable and assign it a blank value
let index = 0        // declare looping variable and assign it a 0 value

// Print all the numbers from 1 to 100, with two exceptions
for (index = 1; index <= 100; index++) {
    // For numbers divisible by 3, messge equals "Fizz" 
    if ((index) % 3 == 0) {
        message = "fizz"
    // For numbers divisible by 5 (and not 3), messge equals "Buzz" instead
    } else if ((index) % 5 == 0){ 
        message = "Buzz";
    // messge equals the number
    } else {message = index}
    
    // use console.log to print
    console.log(message)
}
// end program