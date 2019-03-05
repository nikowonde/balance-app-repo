import React from 'react';
import { connect } from 'react-redux';

const Expense = (props) => {
    return (
        <div>
            <span style={props.styles}><p>Expense name and value cannot be Empty and Negative</p></span>
            <form className='formExpense' id='expenseForm'>
                <label id='expenseLabel1'>
                    Name your expense: <br />
                    <input type='text' id='expenseText' onChange={props.onExpenseLabelInput} required value={props.expenseLabel} /> <br />
                </label>
                <label id='expenseLabel2'>
                    Enter expense amount: <br />
                    <input type='number' id='expenseValue' onChange={props.onExpenseValueInput} required value={props.expenseValue} min='0' step='1' /> <br />
                </label>
                {props.expenseLabel.length > 0 && props.expenseValue > 0 ? <button id='addBtn' onClick={props.onExpenseSubmit}>Add expense</button> : <button id='addBtn-disabled' onClick={props.handleError}>Add expense</button>}
            </form>
        </div>
    )
}

const resetForm = () => {
    document.getElementById('expenseForm').reset();
}

const mapDispatchToProps = (dispatch) => {
    return {
        onExpenseLabelInput: (event) => dispatch({ type: 'SET_EXPENSE_LABEL', value: event.target.value }),
        onExpenseValueInput: (event) => dispatch({ type: 'SET_EXPENSE_VALUE', value: event.target.value }),
        onExpenseSubmit: (event) => dispatch({ type: 'SAVE_EXPENSE' }) + event.preventDefault() + resetForm(),
    }
}

const mapStateToProps = (state) => {
    return {
        expenseLabel: state.expenseLabel,
        expenseValue: state.expenseValue
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Expense);