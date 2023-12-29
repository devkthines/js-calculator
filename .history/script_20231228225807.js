
// do this at the top of the file if possible, the constructor is for the display, and the functions are all that the calculator
// will do
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }
    // to remove all the values in the display
    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {
        // this will keep all the numbers except the last number, essentially cutting or "SLICING" it off
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        // essentially all we want to do is update the current operand on screen to reflect what we are clicking and append the
        // correct button
        // have to convert to string so they just add together and concatenate/append as a string not a number

        // only allowing . to be appended once
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
        console.log(this.currentOperand)
    }

    chooseOperation(operation) {
        // won't allow us to move up an empty value unless something is being operated on
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            // this will allow numbers to be computed as soon as the next operation is hit
            this.compute()
        }
        this.operation = operation
        // this will move the old operand and clear the current so we can type the new number after the current operation
        // that was chosen
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        // check to make sure that there is a number that can be computed
        if (isNaN(prev) || isNaN(current)) return
        // just like if we were to do an if else chain for all operations
        switch (this.operation) {
            case '+':
                computation = prev + current
                break;
            case '-':
                computation = prev - current
                break;
            case '*':
                computation = prev * current
                break;
            case '÷':
                computation = prev / current
                break;
            // exit if invalid computation
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }
    // helper function that is called
    // in update display function below to help display numbers in a correct style with comma separation
    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDigits = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        }
        else {
            return integerDisplay
        }
    }


    updateDisplay() {
        this.currentOperandTextElement.innerText =
        this.getDisplayNumber(this.currentOperand);
        // this will append the operation to the end of the string on the display
        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }
        else {
            this.previousOperandTextElement.innerText = ''
        }
    }

}


// all of the selectors for the html elements set in variables
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

// hooking up variables to calculator class we set up above
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);


numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        // click event listener appending value based on what is clicked
        calculator.appendNumber(button.innerText)
        // so the display values are onstant updated based on what is clicked.
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        // click event listener appending value based on what is clicked
        calculator.chooseOperation(button.innerText)
        // so the display values are onstant updated based on what is clicked.
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {

    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {

    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {

    calculator.delete()
    calculator.updateDisplay()
})