package com.neueda.stockPortfolio.repo;

import com.neueda.stockPortfolio.jpa.Transactions;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionRepo extends JpaRepository<Transactions,Long> {
	public List<Transactions> findByTickerSymbol(String tickerSymbol);
	public List<Transactions> findByTickerSymbolAndTransactionTypeOrderByTransactionDateAsc(String tickerSymbol, String transactionType);
}
