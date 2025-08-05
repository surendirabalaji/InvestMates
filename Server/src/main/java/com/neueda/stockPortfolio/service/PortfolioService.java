package com.neueda.stockPortfolio.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.neueda.stockPortfolio.exceptions.HoldingNotFoundException;
import com.neueda.stockPortfolio.exceptions.WatchlistNotFoundException;
import com.neueda.stockPortfolio.jpa.*;
import com.neueda.stockPortfolio.repo.*;

@Service
public class PortfolioService {
	
		@Autowired
		TransactionRepo tr;
		
		@Autowired
		PortfolioHoldingRepo phr;
		
		@Autowired
		WatchlistRepo wr;
		
		public List<Transactions> findAllTransaction(){
			return tr.findAll();
		}
		
		public List<Transactions> findTransaction(int pageNo, int pageSize) {
	        Pageable pageable = PageRequest.of(pageNo, pageSize);
	        return tr.findAll(pageable).getContent();
	    }
		
		public Optional<Transactions> findTransactionById(Long id) {
			return tr.findById(id);
		}
		
		public List<Transactions> findTransactionByTicker(String ticker){
			return tr.findByTickerSymbol(ticker);
		}
		
		public Transactions addTransaction(Transactions tra) {
			return tr.save(tra);
		}
		
		
		public List<PortfolioHolding> findAllHoldings(){
			return phr.findAll();
		}
		public List<PortfolioHolding> findHolding(int pageNo, int pageSize) {
	        Pageable pageable = PageRequest.of(pageNo, pageSize);
	        return phr.findAll(pageable).getContent();
	    }
		public Optional<PortfolioHolding> findHoldingById(Long id){
			return phr.findById(id);
		}
		
		@Transactional
		public PortfolioHolding addHolding(PortfolioHolding ph) {
			return phr.save(ph);
		}
		
		@Transactional
		public void deleteHolding(Long id) {
			Optional<PortfolioHolding> hol=phr.findById(id);
			if(hol.isPresent()) {
				phr.deleteById(id);
			}
			else {
				throw new HoldingNotFoundException("Holding not found");
			}	 
		}
		
		public PortfolioHolding findHoldingByTicker(String tickerSymbol) {
			return phr.findByTickerSymbol(tickerSymbol);
		}
		
		
		@Transactional
	    public void buyStock(String tickerSymbol, int quantity, double pricePerShare) {
	        
	        Transactions buyTransaction = new Transactions();
	        buyTransaction.setTickerSymbol(tickerSymbol);
	        buyTransaction.setbQuantity(quantity);
	        buyTransaction.setQuantity(quantity);
	        buyTransaction.setPricePerShare(pricePerShare);
	        buyTransaction.setTransactionType("BUY");
	        buyTransaction.setTransactionDate(LocalDateTime.now());

	        
	        tr.save(buyTransaction);

	        
	        PortfolioHolding holding = phr.findByTickerSymbol(tickerSymbol);

	        if (holding == null) {
	            holding = new PortfolioHolding();
	            holding.setTickerSymbol(tickerSymbol);
	            holding.setQuantity(quantity);
	            holding.setPurchaseDate(LocalDateTime.now());
	            holding.setAveragePrice(pricePerShare);
	            holding.setTransaction(buyTransaction);
	            holding.setTotalPrice(pricePerShare*quantity);
	        } else {
	           
	            int newQuantity = holding.getQuantity() + quantity;
	            double totalCost = holding.getTotalPrice() + (pricePerShare * quantity);
	            double newAveragePrice = totalCost / newQuantity;
	            holding.setTotalPrice(totalCost);
	            holding.setQuantity(newQuantity);
	            holding.setAveragePrice(newAveragePrice);
	        }

	   
	        phr.save(holding);
	    }
		
		@Transactional
		public void sellStock(String tickerSymbol, int quantityToSell, double salePricePerShare) {
	        List<Transactions> buyTransactions = tr
	            .findByTickerSymbolAndTransactionTypeOrderByTransactionDateAsc(tickerSymbol, "BUY");

	        int remainingQuantityToSell = quantityToSell;
	        double totalCostBasis = 0;

	        for (Transactions buyTransaction : buyTransactions) {
	            if (remainingQuantityToSell <= 0) break;

	            int buyQuantity = buyTransaction.getQuantity();
	            double buyPricePerShare = buyTransaction.getPricePerShare();

	            if (buyQuantity <= remainingQuantityToSell) {
	                // Use all shares from this buy transaction
	                remainingQuantityToSell -= buyQuantity;
	                totalCostBasis += buyQuantity * buyPricePerShare;

	                // Mark this transaction as fully sold
	                Transactions sellTransaction = new Transactions();
	                sellTransaction.setTickerSymbol(tickerSymbol);
	                sellTransaction.setQuantity(buyQuantity);
	                sellTransaction.setTransactionType("SELL");
	                sellTransaction.setTransactionDate(LocalDateTime.now());
	                sellTransaction.setPricePerShare(salePricePerShare);
	                tr.save(sellTransaction);
	                
	                buyTransaction.setQuantity(0);
	                tr.save(buyTransaction);
	                

	            } else {
	                // Use part of the shares from this buy transaction
	                totalCostBasis += remainingQuantityToSell * buyPricePerShare;

	                // Update the buy transaction to reflect remaining shares
	                Transactions sellTransaction = new Transactions();
	                sellTransaction.setTickerSymbol(tickerSymbol);
	                sellTransaction.setQuantity(remainingQuantityToSell);
	                sellTransaction.setTransactionType("SELL");
	                sellTransaction.setTransactionDate(LocalDateTime.now());
	                sellTransaction.setPricePerShare(salePricePerShare);
	                tr.save(sellTransaction);
	                
	                buyTransaction.setQuantity(buyQuantity - remainingQuantityToSell);
	                tr.save(buyTransaction);

	                remainingQuantityToSell = 0;
	            }
	        }

	        if (remainingQuantityToSell > 0) {
	            throw new IllegalArgumentException("Insufficient shares to sell. Available: " + (quantityToSell - remainingQuantityToSell));
	        }

	        // Calculate realized gain/loss
	        double totalProceeds = quantityToSell * salePricePerShare;
	        double realizedGainOrLoss = totalProceeds - totalCostBasis;

	        // Update PortfolioHolding
	        PortfolioHolding holding = phr.findByTickerSymbol(tickerSymbol);

	        // Update the quantity
	        int newQuantity = holding.getQuantity() - quantityToSell;
	        holding.setQuantity(newQuantity);

	        // Update the average price only if newQuantity > 0
	        if (newQuantity > 0) {
	            double remainingCostBasis = holding.getTotalPrice()-totalCostBasis;
	            holding.setTotalPrice(remainingCostBasis);
	            holding.setAveragePrice(remainingCostBasis / newQuantity);
	            phr.save(holding);
	        } else {
	            phr.delete(holding);
	        }
	    }
		
		
		
		public List<Watchlist> findAllWatchList(){
			return wr.findAll();
		}
		public Watchlist addWatchList(String tickerSymbol, String notes) {
			Watchlist wl=new Watchlist();
			wl.setTickerSymbol(tickerSymbol);
			wl.setNotes(notes);
			wr.save(wl);
			return wl;
		}
		public List<Watchlist> findWatchlist(int pageNo, int pageSize) {
	        Pageable pageable = PageRequest.of(pageNo, pageSize);
	        return wr.findAll(pageable).getContent();
	    }
		public Optional<Watchlist> findWatchlistByTicker(String tickerSymbol){
			return wr.findByTickerSymbol(tickerSymbol);
		}
	    @Transactional
	    public void deleteWatchlist(String tickerSymbol) {
	        Optional<Watchlist> watchlistItem = wr.findByTickerSymbol(tickerSymbol);

	        if (watchlistItem.isPresent()) {
	            wr.delete(watchlistItem.get());
	        } else {
	            throw new WatchlistNotFoundException("Watchlist entry with ticker " + tickerSymbol + " not found");
	        }
	    }
		
	
}
