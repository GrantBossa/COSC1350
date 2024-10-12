//
//	Student Name:  Grant Bossa
//	File Name: tipCalc.js
//	Date: Oct 12, 2024
//
 function validateMyForm() {
    ;

    if ( document.getElementById("billAmount").value <= 0 || null ){
        document.getElementById("btnCalcTip").preventDefault(); // Prevent form submission
        return false;
    } else {
        return true;    
    }
 }
 function calculateTip() {
    // CONSTANTS
    TEN_PERCENT = .10
    FIFTEEN_PERCENT=.15
    TWENTY_PERCENT=.2
    TWENTYFIVE_PERCENT=.25
    
    // VARIABLES
    var billAmount=0
    var tipPercentage=0
    var tipPercent = 0
    let tipAmount = 0
    let totalAmount=0

    
    // set variable values from form
    billAmount = document.getElementById("billAmount").value;
    tipPercentage = document.getElementById("tipPercentage").value    
    
    // test billAmount to be greater than zero, else msg'Enter Bill Amount'
       
     if ( billAmount <= 0 || null ){
        alert("Please enter a Bill Amount")
        document.getElementById("btnCalcTip").preventDefault(); // Prevent form submission
        // reset total amounts to zero
        document.getElementById("tipAmount").innerHTML= 0;
        document.getElementById("totalAmount").innerHTML= 0;
 
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
        document.getElementById("tipAmount").innerHTML= Math.trunc((tipAmount+.005)*100)/100;
        document.getElementById("totalAmount").innerHTML= Math.trunc((totalAmount+.005)*100)/100;
        
         alert ("billAmount = " + billAmount +"\ntipPercentage = " + tipPercentage+"\ntipAmount = " + document.getElementById("tipAmount").innerHTML + "\ntotalAmount = " + document.getElementById("totalAmount").innerHTML)
    }
}
