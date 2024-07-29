//Create the Calculator class
class Calculator {
    // Create constructor that takes the two displays as parameters
    constructor(currentOperationdisplay, prevOperationdisplay){
        this.currentOperationdisplay = currentOperationdisplay;
        this.prevOperationdisplay = prevOperationdisplay;
        this.clear();
    }

    // Create the clear function to clear the diplay when the calculator is first initialized/opened and when the AC button is pressed
    clear(){
        this.currentOperand = '';   // Initialized the currentOperand variable;
        this.previousOperand = '';  // Initialized the previousOperand variable;
        this.operation = undefined; // Initialized the operation variable;
    }

    // Create the Append button to append the number to current display when pressed.
    append(number){
        if(number === "." && this.currentOperand.includes(".")) return
        this.currentOperand = this.currentOperand.toString() + number.toString(); // converts the numbers to strings and then appends it to the current display
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1); // Convert the currentOperand into a string and then use slice to get the string from the start to the second last char
    }

    getOperator(operator){
        // Check if the current operand is not empty
        if(this.currentOperand === '') return
        // Call the calculate function if the previous operand is not empty
        if(this.previousOperand !== ''){
            this.calculate();
        }
        // Assign the operator to the operation variable
        this.operation = operator;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    calculate(){
        let total; // Initialize a varibale to hold the total
        let current = Number(this.currentOperand); // initiazed a varibale to hold the current number and convert he currentOperand to a number
        let previous = Number(this.previousOperand); // initialized a variable to hold the previous number and convert the previousOperand to a number
        if(isNaN(current) || isNaN(previous)) return // CHeck to see if any of the previous two variables is not a number
        switch(this.operation){ // Use a switch statement to handle the operation checking and the operation it self
            case '+':
                total = previous + current;
                break;
            case '-':
                total = previous - current;
                break;
            case '*':
                total = previous * current;
                break;
            case '÷':
                total = previous / current;
                break;
            default:
                console.log("There is an error");
        }
        this.currentOperand = total;    // reassign the total to the currentOperand
        this.operation = undefined;     // clear the operation variable
        this.previousOperand = '';      // clear the previousOperand variable
    }

    display(){
        this.currentOperationdisplay.textContent = this.currentOperand;
        if (this.operation != null){
            this.prevOperationdisplay.textContent = `${this.previousOperand} ${this.operation}`;
        }
        else {
            this.prevOperationdisplay.innerHTML = '';
        }
    }
}
// Select all the buttons
let ClearBtn = document.querySelector("[data-clear-all]");
let DeleteBtn = document.querySelector("[data-delete]");
let OperatorBtns = document.querySelectorAll("[data-operator]");
let NumberButtons = document.querySelectorAll("[data-number]");
let equalsButton = document.querySelector("[data-equals]");
let prevOperationdisplay = document.querySelector("[data-previous-operation]");
let currentOperationdisplay = document.querySelector("[data-current-operation]");

const calculator = new Calculator(currentOperationdisplay, prevOperationdisplay);

ClearBtn.addEventListener("click", () => {
    calculator.clear();
    calculator.display();
})

DeleteBtn.addEventListener("click", () => {
    calculator.delete();
    calculator.display();
})

equalsButton.addEventListener("click", () => {
    calculator.calculate();
    calculator.display();
})

NumberButtons.forEach(number => {
    number.addEventListener("click", () => {
        calculator.append(number.innerHTML); // .innerHTML is used here becuse we are getting the value from an html tag. .value is used with input fields.
        calculator.display();
    })
})

OperatorBtns.forEach((operator) => {
    operator.addEventListener("click", () => {
        calculator.getOperator(operator.innerHTML);
        calculator.display();
    })
})