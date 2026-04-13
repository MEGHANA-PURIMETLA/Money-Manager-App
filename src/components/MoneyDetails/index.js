import './index.css'

const MoneyDetails = props => {
  const {balance, income, expenses} = props

  return (
    <div className="money-details">
      <div className="card balance">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          alt="balance"
        />
        <div>
          <p>Your Balance</p>
          <p data-testid="balanceAmount">Rs {balance}</p>
        </div>
      </div>

      <div className="card income">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
          alt="income"
        />
        <div>
          <p>Your Income</p>
          <p data-testid="incomeAmount">Rs {income}</p>
        </div>
      </div>

      <div className="card expenses">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
          alt="expenses"
        />
        <div>
          <p>Your Expenses</p>
          <p data-testid="expensesAmount">Rs {expenses}</p>
        </div>
      </div>
    </div>
  )
}

export default MoneyDetails