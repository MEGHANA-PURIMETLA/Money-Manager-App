import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

import './index.css'

const transactionTypeOptions = [
  {optionId: 'INCOME', displayText: 'Income'},
  {optionId: 'EXPENSES', displayText: 'Expenses'},
]

class MoneyManager extends Component {
  state = {
    titleInput: '',
    amountInput: '',
    typeInput: transactionTypeOptions[0].optionId,
    transactionList: [],
    username: '',
    isEditingName: true,
  }

  componentDidMount() {
    const savedName = localStorage.getItem('username')
    if (savedName) {
      this.setState({username: savedName, isEditingName: false})
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  saveUsername = () => {
    const {username} = this.state
    if (username.trim() !== '') {
      localStorage.setItem('username', username)
      this.setState({isEditingName: false})
    }
  }

  editUsername = () => {
    this.setState({isEditingName: true})
  }

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeType = event => {
    this.setState({typeInput: event.target.value})
  }

  onAddTransaction = event => {
    event.preventDefault()

    const {titleInput, amountInput, typeInput} = this.state

    if (titleInput === '' || amountInput === '') return

    const newTransaction = {
      id: uuidv4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: typeInput,
    }

    this.setState(prevState => ({
      transactionList: [...prevState.transactionList, newTransaction],
      titleInput: '',
      amountInput: '',
      typeInput: transactionTypeOptions[0].optionId,
    }))
  }

  deleteTransaction = id => {
    this.setState(prevState => ({
      transactionList: prevState.transactionList.filter(
        each => each.id !== id,
      ),
    }))
  }

  getIncome = () => {
    const {transactionList} = this.state
    return transactionList
      .filter(each => each.type === 'INCOME')
      .reduce((acc, curr) => acc + curr.amount, 0)
  }

  getExpenses = () => {
    const {transactionList} = this.state
    return transactionList
      .filter(each => each.type === 'EXPENSES')
      .reduce((acc, curr) => acc + curr.amount, 0)
  }

  render() {
    const {
      titleInput,
      amountInput,
      typeInput,
      transactionList,
      username,
      isEditingName,
    } = this.state

    const income = this.getIncome()
    const expenses = this.getExpenses()
    const balance = income - expenses

    return (
      <div className="app-container">
        <div className="top-container">
          {isEditingName ? (
            <div className="name-input">
              <input
                type="text"
                placeholder="Enter your name"
                value={username}
                onChange={this.onChangeUsername}
              />
              <button type="button" onClick={this.saveUsername}>
                Save
              </button>
            </div>
          ) : (
            <div className="name-display">
              <h1>Hi {username} 👋</h1>
              <button type="button" onClick={this.editUsername}>
                Edit
              </button>
            </div>
          )}

          <p>
            Welcome back to your <span>Money Manager</span>
          </p>
        </div>

        <MoneyDetails
          balance={balance}
          income={income}
          expenses={expenses}
        />

        <div className="bottom-container">
          <form onSubmit={this.onAddTransaction} className="form">
            <h1>Add Transaction</h1>

            <label htmlFor="title">TITLE</label>
            <input
              id="title"
              type="text"
              value={titleInput}
              onChange={this.onChangeTitle}
            />

            <label htmlFor="amount">AMOUNT</label>
            <input
              id="amount"
              type="text"
              value={amountInput}
              onChange={this.onChangeAmount}
            />

            <label htmlFor="type">TYPE</label>
            <select id="type" value={typeInput} onChange={this.onChangeType}>
              {transactionTypeOptions.map(each => (
                <option key={each.optionId} value={each.optionId}>
                  {each.displayText}
                </option>
              ))}
            </select>

            <button type="submit">Add</button>
          </form>

          <div className="history">
            <h1>History</h1>

            <div className="transaction-item">
              <p>Title</p>
              <p>Amount</p>
              <p>Type</p>
              <p></p>
            </div>

            <ul>
              {transactionList.map(each => (
                <TransactionItem
                  key={each.id}
                  transactionDetails={each}
                  deleteTransaction={this.deleteTransaction}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager