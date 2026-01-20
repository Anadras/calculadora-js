const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]",
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]",
);

class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  formatDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;

    if (isNaN(integerDigits)) {
      integerDisplay = " ";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  deleteButton() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  calculator() {
    let result;

    const _previousOperand = parseFloat(this.previousOperand);
    const _currentOperand = parseFloat(this.currentOperand);

    if (isNaN(_previousOperand) || isNaN(_currentOperand)) return;

    switch (this.operation) {
      case "+":
        result = _previousOperand + _currentOperand;
        break;
      case "-":
        result = _previousOperand - _currentOperand;
        break;
      case "×":
        result = _previousOperand * _currentOperand;
        break;
      case "÷":
        result = _previousOperand / _currentOperand;
        break;
      default:
        return;
    }

    this.currentOperand = result;
    this.operation = undefined;
    this.previousOperand = " ";
  }

  chooseOperation(operation) {
    if (this.currentOperand === " ") return;

    if (this.previousOperand !== " ") {
      this.calculator();
    }

    this.operation = operation;

    this.previousOperand = this.currentOperand;
    this.currentOperand = " ";
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  clear() {
    this.currentOperand = " ";
    this.previousOperand = " ";
    this.operation = undefined;
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.formatDisplayNumber(
      this.currentOperand,
    );
    this.previousOperandTextElement.innerText =
      this.formatDisplayNumber(this.previousOperand) + (this.operation || " ");
  }
}

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement,
);

allClearButton.addEventListener("click", () => {
  console.log("oi");
  calculator.clear();
  calculator.updateDisplay();
});

for (const button of numberButtons) {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
}

for (const button of operationButtons) {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
}

equalsButton.addEventListener("click", () => {
  calculator.calculator();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.currentOperand = calculator.currentOperand.toString().slice(0, -1);
  calculator.updateDisplay();
});
