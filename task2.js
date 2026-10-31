let currentInput = "";
let previousInput = "";
let operator = null;

const display = document.getElementById("display");


// Add number to display
function appendNumber(number) {
    if (number === "." && currentInput.includes(".")) {
        return;
    }

    currentInput += number;
    display.value = currentInput;
}


// Select an operator
function chooseOperator(selectedOperator) {

    if (currentInput === "" && previousInput === "") {
        return;
    }

    if (currentInput !== "" && previousInput !== "") {
        calculate();
    }

    if (currentInput !== "") {
        previousInput = currentInput;
        currentInput = "";
    }

    operator = selectedOperator;
}


// Calculate result
function calculate() {

    if (previousInput === "" || currentInput === "" || operator === null) {
        return;
    }

    const firstNumber = parseFloat(previousInput);
    const secondNumber = parseFloat(currentInput);

    let result;

    switch (operator) {

        case "+":
            result = firstNumber + secondNumber;
            break;

        case "-":
            result = firstNumber - secondNumber;
            break;

        case "*":
            result = firstNumber * secondNumber;
            break;

        case "/":
            if (secondNumber === 0) {
                display.value = "Cannot divide by 0";
                currentInput = "";
                previousInput = "";
                operator = null;
                return;
            }

            result = firstNumber / secondNumber;
            break;

        case "%":
            result = firstNumber % secondNumber;
            break;

        default:
            return;
    }

    currentInput = result.toString();
    previousInput = "";
    operator = null;

    display.value = currentInput;
}


// Clear calculator
function clearDisplay() {
    currentInput = "";
    previousInput = "";
    operator = null;

    display.value = "0";
}


// Delete last character
function deleteLast() {
    currentInput = currentInput.slice(0, -1);

    if (currentInput === "") {
        display.value = "0";
    } else {
        display.value = currentInput;
    }
}


// Keyboard support
document.addEventListener("keydown", function(event) {

    const key = event.key;

    // Numbers
    if (key >= "0" && key <= "9") {
        appendNumber(key);
    }

    // Decimal
    else if (key === ".") {
        appendNumber(".");
    }

    // Operators
    else if (key === "+" || key === "-" || key === "*" || key === "/" || key === "%") {
        chooseOperator(key);
    }

    // Enter or =
    else if (key === "Enter" || key === "=") {
        calculate();
    }

    // Backspace
    else if (key === "Backspace") {
        deleteLast();
    }

    // Escape
    else if (key === "Escape") {
        clearDisplay();
    }
});