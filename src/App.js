import React, { Component } from 'react';
import './App.css';
import Budget from './components/BudgetForm';
import Expense from './components/ExpenseForm';
import Balance from './components/Balance';

class App extends Component {
  state = {
    display: 'none',
    display2: 'none',
  }

  render() {

    const stylesBudget = {
      display: this.state.display,
      background: 'red',
      top: '10px',
      left: '10%',
      padding: '0 10px',
      marginBottom: '10px'
    }

    const stylesExpense = {
      display: this.state.display2,
      background: 'red',
      top: '500px',
      left: '10%',
      padding: '0 10px',
      marginBottom: '10px'
    }

    const handleErrorBudget = (event) => {
      event.preventDefault();
      this.setState({ display: 'inline-block' });
      setTimeout(() => { this.setState({ display: 'none' }) }, 4000);
    }

    const handleErrorExpense = (event) => {
      event.preventDefault();
      this.setState({ display2: 'inline-block' });
      setTimeout(() => { this.setState({ display2: 'none' }) }, 4000);
    }

    return (
      <div className="App">
        <header>
          <h1>Budget App</h1>
        </header>
        <Budget
          styles={stylesBudget}
          handleError={handleErrorBudget}
        />
        <Expense
          styles={stylesExpense}
          handleError={handleErrorExpense}
        />
        <Balance />
      </div>
    );
  }
}

export default App;
