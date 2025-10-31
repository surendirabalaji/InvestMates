// WatchlistTable.jsx
import React from 'react';

function WatchlistTable({ watchlist }) {
    return (
        <table className="table watchlist-table table-hover watchlist-table-responsive">
            <thead className='table-dark'>
                <tr>
                    <th style={{width : "15%"}} className='ticker'>Ticker</th>
                    <th style={{width : "10%"}}>Price</th>
                    <th style={{width : "10%"}}>Change</th>
                    <th style={{width : "10%"}}>% Change</th>
                    <th style={{width : "15%"}}>High</th>
                    <th style={{width : "15%"}}>Low</th>
                    <th style={{width : "25%"}} className='volume'>Volume</th>
                </tr>
            </thead>
            <tbody>
                {watchlist.map(stock => (
                    <tr key={stock.ticker}>
                        <td>{stock.ticker}</td>
                        <td>${stock.price}</td>
                        <td className={stock.change[0] === '-' ? 'negative' : 'positive'}>{stock.change}</td>
                        <td className={stock.percent_change[0] === '-' ? 'negative' : 'positive'}>{stock.percent_change}</td>
                        <td>{stock.high}</td>
                        <td>{stock.low}</td>
                        <td>{stock.volume}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default WatchlistTable;
