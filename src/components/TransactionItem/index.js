import './index.css'

const TransactionItem = props => {
  const {transactionDetails, deleteTransaction} = props
  const {id, title, amount, type} = transactionDetails

  return (
    <li className="transaction-item">
      <p>{title}</p>
      <p>Rs {amount}</p>
      <p>{type === 'INCOME' ? 'Income' : 'Expenses'}</p>

      <button
        type="button"
        data-testid="delete"
        onClick={() => deleteTransaction(id)}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default TransactionItem