const screen = document.querySelector(".screen")
// let screen.textContent = screen.textContent

const NUMBER_BTNS = document.querySelectorAll(".calc-btn-number")
const OPERATOR_BTNS = document.querySelectorAll(".calc-btn-operator")

// This is used to perform operations by converting screen text to number
let screenNumber = 0

let currentScore
let currentOperator = ""

// All calculation performed are stored here
const history = []

/*
Event listener for numbers 0 - 9
*/
NUMBER_BTNS.forEach((number_btn) => {
    number_btn.addEventListener("click", (e) => {
        // If the screen number is 0 or null, the next non-zero number is displayed i.e 05 -> 5, 02 -> 2
        if (!screenNumber) {
            screen.textContent = ""
        }
        screen.textContent += e.target.textContent
        screenNumber = Number(screen.textContent)
    })
})

OPERATOR_BTNS.forEach((element) => {
    element.addEventListener("click", (e) => {
        switch (e.target.id) {
            case "calc-del":
                deleteLastCharacter()
                break
            case "calc-plus":
                calculationFn("plus")
                break
            case "calc-minus":
                calculationFn("minus")
                break
            case "calc-multiply":
                calculationFn("multiply")
                break
            case "calc-divide":
                calculationFn("divide")
                break
            case "calc-equals":
                calculationFn("equals")
                break
            case "calc-clear":
                resetCalc()
                break
            default:
                break
        }
    })
})
// Deletes the last character from the numbers displayed and updates screen, also update screenNumber
function deleteLastCharacter() {
    screen.textContent = screen.textContent.slice(0, screen.textContent.length - 1)
    if (screen.textContent.length < 1) {
        screen.textContent = "0"
    }
    screenNumber = Number(screen.textContent)
}

function calculationFn(operatorType) {
    if (screenNumber) {
        if (!currentOperator) {
            currentScore = screenNumber
            currentOperator = operatorType
        } else {
            const latestHistory = {
                firstNum: currentScore,
                secondNum: screenNumber,
                operation: currentOperator,
            }
            switch (currentOperator) {
                case "plus":
                    currentScore += screenNumber
                    break
                case "minus":
                    currentScore -= screenNumber
                    break
                case "multiply":
                    currentScore *= screenNumber
                    break
                case "divide":
                    currentScore /= screenNumber
                    break
                default:
                    break
            }
            updateHistory({ ...latestHistory, result: currentScore })
            console.log(history)
            operatorType === "equals" ? (currentOperator = null) : (currentOperator = operatorType)
            screen.textContent = currentScore
        }
    } else {
        currentScore !== undefined ? (currentOperator = operatorType) : ""
    }

    screenNumber = null
}

function updateHistory(calc) {
    history.push(calc)
    const historyList = document.querySelector(".history-list")
    const template = `
    <div class="history-list__item">
        <div class="history-list__operation">${calc.firstNum} ${calc.operation} ${calc.secondNum} =</div>
        <span class="history-list__result">${calc.result}</span>
    </div>
    `
    historyList.innerHTML = template + historyList.innerHTML
}

function resetCalc() {
    screenNumber = 0
    currentScore = null
    currentOperator = null
    screen.textContent = "0"
}

function getButtonByText(text) {
    return Array.from(document.querySelectorAll("button")).find((btn) => btn.textContent === text)
}

document.addEventListener("keydown", (e) => {
    const key = e.key

    if (key >= "0" && key <= "9") {
        getButtonByText(key).click()
    } else {
        switch (key) {
            case "Backspace":
                document.querySelector("#calc-del").click()
                break
            case "c":
            case "C":
            case "Escape":
                document.querySelector("#calc-clear").click()
                break
            case "+":
                document.querySelector("#calc-plus").click()
                break
            case "-":
                document.querySelector("#calc-minus").click()
                break
            case "*":
                document.querySelector("#calc-multiply").click()
                break
            case "/":
                document.querySelector("#calc-divide").click()
                break
            case "Enter":
            case "=":
                document.querySelector("#calc-equals").click()
                break
            default:
                break
        }
    }
})

// THEME SWITCHING

const themeInput = document.querySelector("#switch")

themeInput.addEventListener("change", toggleTheme)
// function to set a given theme/color-scheme
function setTheme(themeName) {
    localStorage.setItem("theme", themeName)
    document.documentElement.className = themeName
}

// function to toggle between light and dark theme
function toggleTheme() {
    if (localStorage.getItem("theme") === "theme-dark") {
        setTheme("theme-light")
    } else {
        setTheme("theme-dark")
    }
}

// Immediately invoked function to set the theme on initial load
;(function () {
    if (localStorage.getItem("theme") === "theme-dark") {
        setTheme("theme-dark")
        themeInput.checked = false
    } else {
        setTheme("theme-light")
        themeInput.checked = true
    }
})()
