import { Expression } from 'arithmetic-expr-calculator'
import '../public/styles.css'

let expr = new Expression()

let expression_accumulator: string[] = []

let expressionHolder_txtField = document.getElementById('expression-holder') as HTMLInputElement
const displayTxtField = document.getElementById('expression-input') as HTMLInputElement
const buttons = document.querySelectorAll('button')

//the value and ids of these buttons, will be changed to their inverse forms, on Inverse(Inv) button clicked
let sin_btn = document.getElementById('sin') as HTMLButtonElement
let cos_btn = document.getElementById('cos') as HTMLButtonElement
let tan_btn = document.getElementById('tan') as HTMLButtonElement

//disable expression holder textfield
expressionHolder_txtField.disabled = true

buttons.forEach((button: HTMLButtonElement) => {
    button.addEventListener('click', () => {
        getButtonValue(button)
    })
})

const getButtonValue = (button: HTMLButtonElement) => {
    if (button.value === "←") {
        removeCharValue_One_At_A_Time()

    } else if (button.value === "AC") {
        clearTextExpressionHolder_TextField()
        clearTextField()
        //clear all previous stored values in accumulator
        resetAccumulator()

    } else if (button.value === "Inv") {
        if (sin_btn.id === "sin") {
            changeButton_ID_and_Value(sin_btn, "arcsin", "arcsin", "arcsin")
        } else if (sin_btn.id === "arcsin") {
            changeButton_ID_and_Value(sin_btn, "sin", "sin", "sin")
        }

        if (cos_btn.id === "cos") {
            changeButton_ID_and_Value(cos_btn, "arccos", "arccos", "arccos")
        } else if (cos_btn.id === "arccos") {
            changeButton_ID_and_Value(cos_btn, "cos", "cos", "cos")
        }

        if (tan_btn.id === "tan") {
            changeButton_ID_and_Value(tan_btn, "arctan", "arctan", "arctan")
        } else if (tan_btn.id === "arctan") {
            changeButton_ID_and_Value(tan_btn, "tan", "tan", "tan")
        }

    } else if (button.value === "rpn_postfix") {
        let postfix_notation = expr.convert_to_PostfixRPN(
            displayTxtField.value
        )
        clearTextField()

        for (let term of postfix_notation) {
            displayTxtField.value += term + " "
        }

    } else if (button.value === "rpn_prefix") {
        let prefix_notation = expr.convert_to_PrefixRPN(
            displayTxtField.value
        )
        clearTextField()

        for (let term of prefix_notation) {
            displayTxtField.value += term + " "
        }

    } else if (button.value === "=") {
        console.log(displayTxtField.value)
        let computedResult = expr.eval_Expression(
            expr.convert_to_PostfixRPN(displayTxtField.value)
        )
        console.log(computedResult)
        clearTextField()
        displayTxtField.value = String(computedResult)

        //get user-input expression and computation, and display in expression holder textfd
        clearTextExpressionHolder_TextField()
        for (let value of expression_accumulator.values()) {
            expressionHolder_txtField.value += value
        }

        //add final answer to existing input in expressionHolder textfield, serving as a history panel
        expressionHolder_txtField.value += ` = ${computedResult}`

        //clear all previous stored values in accumulator
        resetAccumulator()

    } else {
        if (button.value === "sin" || button.value === "cos" || button.value === "tan" ||
            button.value === "csc" || button.value === "sec" || button.value === "cot" ||
            button.value === "arcsin" || button.value === "arccos" || button.value === "arctan" ||
            button.value === "log" || button.value === "ln" || button.value === "Γ"
        ) {
            displayTxtField.value += button.value + "("
            //show user input in both txtfield and expression holder txtfield
            expressionHolder_txtField.value += button.value + "("
        } else {
            displayTxtField.value += button.value
            //show user input in both txtfield and expression holder txtfield
            expressionHolder_txtField.value += button.value
        }

        //append user input to accumulator
        expression_accumulator.push(button.value)
        //console.log(expression_accumulator

    }
}

const clearTextField = () => {
    displayTxtField.value = ""
}

const clearTextExpressionHolder_TextField = () => {
    expressionHolder_txtField.value = ""
}

const removeCharValue_One_At_A_Time = () => {
    displayTxtField.value = displayTxtField.value.slice(0, - 1)

    expressionHolder_txtField.value = expressionHolder_txtField.value.slice(0, - 1)

    //on removal of a character from the button press, the last element
    //from the array needs to be removed
    expression_accumulator.pop()
    //console.log(expression_accumulator)
}

const resetAccumulator = () => {
    while (expression_accumulator.length != 0) {
        expression_accumulator.pop()
    }
}

const changeButton_ID_and_Value = (
    button: HTMLButtonElement, innerHTML: string, id: string, value: string
) => {
    button.innerHTML = innerHTML
    button.id = id
    button.value = value
    return button
}