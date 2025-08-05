package com.neueda.stockPortfolio.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.neueda.stockPortfolio.jpa.PortfolioHolding;


public interface PortfolioHoldingRepo extends JpaRepository<PortfolioHolding,Long> {
	public PortfolioHolding findByTickerSymbol(String tickerSymbol);
}
