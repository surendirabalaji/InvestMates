import React from 'react';
import './Transactions.css';  


function TransactionsTable({ transactions, maxHeight }) {
    return (
        <div className="table-responsive" style={{ maxHeight: maxHeight }}>
            <table className="table table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>Symbol</th>
                        {/* <th>Company Name</th> */}
                        <th>Date</th>
                        <th>Price Per Share</th>
                        <th>Quantity</th>
                        <th>Total Value</th>
                        <th>Transaction Type</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                            <td>{transaction.tickerSymbol}</td>
                            <td>{new Date(transaction.transactionDate).toLocaleDateString()}</td>
                            <td>${transaction.pricePerShare.toFixed(2)}</td>
                            <td>{transaction.quantity}</td>
                            <td>${(transaction.pricePerShare * transaction.quantity).toFixed(2)}</td>
                            <td>
                                {transaction.transactionType=== 'BUY' ?
                                    <button className="buy-btn">
                                        Bought
                                    </button> :
                                    transaction.transactionType === 'SELL' ?
                                        <button className="sell-btn">
                                            Sold
                                        </button> :
                                        transaction.transactionType
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TransactionsTable;
