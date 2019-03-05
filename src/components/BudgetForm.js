import React from 'react';
import { connect } from 'react-redux';

class Budget extends React.Component {
    render() {
        return (
            <div>
                <span style={this.props.styles}><p>Budget value cannot be Empty or Negative</p></span>
                <form className='formBudget' id="budgetForm">
                    <label id='budgetLabel'>
                        Enter your budget here: <br />
                        <input type='number' id='budgetValue' onChange={this.props.onBudgetInput} required autoFocus min='0' step='.01' pattern='\d* [0-9]' pattern=".{6,}" /> <br />
                    </label>
                    {this.props.budget > 0 ? <button id='calcBtn' type='submit' onClick={this.props.onSubmitClick}>Calculate</button> : <button id='calcBtn-disabled' onClick={this.props.handleError}>Calculate</button>}
                </form>
            </div>
        )
    }
}

const resetForm = () => {
    document.getElementById('budgetForm').reset();
}

const mapDispatchToProps = (dispatch) => {
    return {
        onBudgetInput: (event) => dispatch({ type: 'SET_BUDGET', value: event.target.value }),
        onSubmitClick: (event) => dispatch({ type: 'SAVE_BUDGET' }) + event.preventDefault() + resetForm(),
    }
}

const mapStateToProps = (state) => {
    return {
        budget: state.tmpBudget,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Budget);