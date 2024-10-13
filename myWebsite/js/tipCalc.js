//
//	Student Name:  Grant Bossa
//	File Name: tipCalc.js
//	Date Created: Oct 12, 2024
//	Last Modified: October 12, 2024
//
 function calculateTip() {
    // CONSTANTS
    TEN_PERCENT = .10
    FIFTEEN_PERCENT=.15
    TWENTY_PERCENT=.2
    TWENTYFIVE_PERCENT=.25
    
    // VARIABLES
    var billAmount
    var tipPercentage
    var tipPercent
    let tipAmount
    let totalAmount
   
    // set variable values from form
    billAmount = document.getElementById("billAmount").value;
    tipPercentage = document.getElementById("tipPercentage").value    
    
    // test billAmount to be greater than zero, else msg'Enter Bill Amount'
       
    if ( billAmount <= 0 || null ){
        alert("Please enter a Bill Amount")
    } else {
        // calc tip amount based on selected value 
        if (tipPercentage.includes("25%")) {
            tipPercent= TWENTYFIVE_PERCENT
        } else if (tipPercentage.includes("20%")) {
            tipPercent= TWENTY_PERCENT
        } else if (tipPercentage.includes("15%")) {
            tipPercent= FIFTEEN_PERCENT
        } else if (tipPercentage.includes("10%")) {
            tipPercent= TEN_PERCENT
        }
        tipAmount=billAmount*tipPercent
        
        // calc total amount
        totalAmount=(billAmount*1)+(tipAmount*1)

        // set form values from  variables 
        document.getElementById("tipAmount").innerHTML= tipAmount.toFixed(2);
        document.getElementById("totalAmount").innerHTML= totalAmount.toFixed(2);
        
        // for debugging, uncomment alert below
        // alert ("billAmount = " + billAmount +"\ntipPercentage = " + tipPercentage+"\ntipAmount = " + document.getElementById("tipAmount").innerHTML + "\ntotalAmount = " + document.getElementById("totalAmount").innerHTML)
    }
}
