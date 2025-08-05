package com.neueda.stockPortfolio.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.neueda.stockPortfolio.jpa.Watchlist;

public interface WatchlistRepo extends JpaRepository<Watchlist,Long> {
	public Optional<Watchlist> findByTickerSymbol(String tickerSymbol);
}
