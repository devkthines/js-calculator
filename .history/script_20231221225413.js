
// do this at the top of the file if possible, the constructor is for the display, and the functions are all that the calculator
// will do
class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear
    }
    // to remove all the values in the display
    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {

    }

    appendNumber(number) {
        console.log(this.currentOperand)
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {

    }

    compute() {

    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand
    }
}


// all of the selectors for the html elements set in variables
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allCelearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

// hooking up variables to calculator class we set up above
const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement);


numberButtons.forEach(button=>{
    button.addEventListener('click', ()=> {
        // click event listener appending value based on what is clicked
        calculator.appendNumber(button.innerText)
        // so the display values are onstant updated based on what is clicked.
        calculator.updateDisplay()
    })
})