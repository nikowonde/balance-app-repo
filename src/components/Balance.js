import React from 'react';
import { connect } from 'react-redux';

import BudgetImg from '../images/budget.png';
import ExpenseImg from '../images/expense2.png';
import BalanceImg from '../images/balance.png';
import Edit from '../images/pen.png';
import Delete from '../images/delete.png';


const Expense = (props) => {
    let expenseTable;
    if (props.expenses.length > 0) {
        expenseTable = props.expenses.map((ex, index) => (
            <tr key={index}>
                <td>{ex.label}</td>
                <td>{ex.value}</td>
                <td><img src={Edit} id={ex.id} onClick={e => { props.onExpenseEdit(ex) }} alt='Edit' className='editIcon' /> {'   '}<img src={Delete} id={ex.id} onClick={e => { props.onExpenseDelete(ex) }} alt='Delete' className='editIcon' /></td>
            </tr>
        ))
    }

    let balanceStyle = {
        color: 'black'
    }

    const balanceColorChanger = () => {
        if (props.budget - (props.expenses.length > 0 ? sumBy(props.expenses, 'value') : '0') > 0) {
            balanceStyle.color = 'green'
        } else if (props.budget - (props.expenses.length > 0 ? sumBy(props.expenses, 'value') : '0') < 0) {
            balanceStyle.color = 'red'
        } else {
            balanceStyle.color = 'black'
        }
    }

    balanceColorChanger();

    return (
        <div>
            <table id='balanceTable'>
                <tbody>
                    <tr>
                        <th className='balanceHeader'>BUDGET</th>
                        <th className='balanceHeader'>EXPENSES</th>
                        <th className='balanceHeader'>BALANCE</th>
                    </tr>
                    <tr>
                        <td className='balanceCol'>
                            <br />
                            <img src={BudgetImg} alt="budget" className='icon' />
                            <br />
                            <p id='budgetP'>{props.budget}€</p>
                        </td>
                        <td className='balanceCol'>
                            <br />
                            <img src={ExpenseImg} alt="expense" className='icon' />
                            <br />
                            <p id='expenseP'>{props.expenses.length > 0 ? sumBy(props.expenses, 'value') + '€' : '0€'}</p>
                        </td>
                        <td className='balanceCol'>
                            <br />
                            <img src={BalanceImg} alt="balance" className='icon' />
                            <br />
                            <p id='balanceP' style={balanceStyle}>{props.budget - (props.expenses.length > 0 ? sumBy(props.expenses, 'value') : '0')}€</p>
                        </td>
                    </tr>
                </tbody>
            </table>
            <table id='expensesTable'>
                <tbody>
                    <tr>
                        <th>Expense</th>
                        <th>Amount</th>
                    </tr>
                    {expenseTable}
                </tbody>
            </table>
        </div>
    )
}

const sumBy = (object, item) => object.reduce((a, b) => +a + +b[item], 0);

const mapStateToProps = (state) => {
    return {
        budget: state.budget,
        balance: state.balance,
        expenses: state.expenses
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onExpenseEdit: (ex) => dispatch({ type: 'EDIT_EXPENSE', ex: ex }),
        onExpenseDelete: (ex) => dispatch({ type: 'DELETE_EXPENSE', ex: ex })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Expense);