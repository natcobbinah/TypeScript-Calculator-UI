import { Expression } from 'arithmetic-expr-calculator'
import '../public/styles.css'

let expr = new Expression()

let expression_accumulator: string[] = []

let expressionHolder_txtField = document.getElementById('expression-holder') as HTMLInputElement
const displayTxtField = document.getElementById('expression-input') as HTMLInputElement
const buttons = document.querySelectorAll('button')

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

    } else if (button.value === "C") {
        clearTextExpressionHolder_TextField()
        clearTextField()

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
        let computedResult = expr.eval_Expression(
            expr.convert_to_PostfixRPN(displayTxtField.value)
        )
        clearTextField()
        displayTxtField.value = String(computedResult)

        //get user-input expression and computation, and display in expression holder textfd
        clearTextExpressionHolder_TextField()
        for(let value of expression_accumulator.values()){
            expressionHolder_txtField.value += value
        }

        //add final answer to existing input in expressionHolder textfield, serving as a history panel
        expressionHolder_txtField.value += ` = ${computedResult}`

        //clear all previous stored values in accumulator
        resetAccumulator()

    } else {
        displayTxtField.value += button.value

        //append user input to accumulator
        expression_accumulator.push(button.value)
        //console.log(expression_accumulator)

        //show user input in both txtfield and expression holder txtfield
        expressionHolder_txtField.value += button.value
        
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
    while(expression_accumulator.length != 0){
        expression_accumulator.pop()
    }
}