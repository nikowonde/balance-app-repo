const initState = {
    tmpBudget: '',
    budget: '0',
    balance: '1650',
    expenseLabel: '',
    expenseValue: '',
    expenses: []
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case 'SET_BUDGET':
            return {
                ...state,
                tmpBudget: action.value,
            }
        case 'SAVE_BUDGET':
            return {
                ...state,
                budget: state.tmpBudget,
            }
        case 'SET_EXPENSE_LABEL':
            return {
                ...state,
                expenseLabel: action.value,
            }
        case 'SET_EXPENSE_VALUE':
            return {
                ...state,
                expenseValue: action.value,
            }
        case 'SAVE_EXPENSE':
            let id = state.expenses.length;
            return {
                ...state,
                expenses: [...state.expenses, { id: id, label: state.expenseLabel, value: state.expenseValue }],
                expenseLabel: '',
                expenseValue: ''
            }
        case 'EDIT_EXPENSE':
            const sameId = (element) => { return element.id === action.ex.id };
            let expense = state.expenses.find(sameId);
            return {
                ...state,
                expenses: state.expenses.filter(e => e !== expense),
                expenseLabel: action.ex.label,
                expenseValue: action.ex.value
            }
        case 'DELETE_EXPENSE':
            const sameFunc = (element) => { return element.id === action.ex.id };
            let findVar = state.expenses.find(sameFunc);
            return {
                ...state,
                expenses: state.expenses.filter(e => e !== findVar),
            }
        default:
            return state;
    }
}

export default reducer;