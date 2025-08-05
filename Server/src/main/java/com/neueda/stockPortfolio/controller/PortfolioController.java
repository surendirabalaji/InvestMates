package com.neueda.stockPortfolio.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.neueda.stockPortfolio.exceptions.HoldingNotFoundException;
import com.neueda.stockPortfolio.exceptions.WatchlistNotFoundException;
import com.neueda.stockPortfolio.jpa.*;
import com.neueda.stockPortfolio.service.PortfolioService;
@RestController
@RequestMapping(path="/portfolio")
public class PortfolioController {
	@Autowired
	PortfolioService ps;

	@GetMapping(path="/allTransaction")
	public List<Transactions> findAllTransactions(){
		return ps.findAllTransaction();
	}
	@GetMapping(path="/pagedTransaction")
	public List<Transactions> findTransactions(@RequestParam int pageNo,@RequestParam int pageSize){
		return ps.findTransaction(pageNo-1, pageSize);
	}
	@GetMapping(path="/transaction/{id}")
	public Optional<Transactions> findTransactionById(@PathVariable Long id){
		return ps.findTransactionById(id);
	}
	@GetMapping(path="/transaction")
	public List<Transactions> findTransactionByTicker(@RequestParam(name="ticker") String ticker){
		return ps.findTransactionByTicker(ticker);
	}
	@PostMapping(path="/addTransaction")
	public ResponseEntity<Transactions> addTransaction(@RequestBody Transactions transaction) {
		Transactions trans=ps.addTransaction(transaction);
		return new ResponseEntity<>(trans,HttpStatus.OK);
	}
	
	
	
	@GetMapping(path="/allHoldings")
	public List<PortfolioHolding> findAllHoldings(){
		return ps.findAllHoldings();
	}
	@GetMapping(path="/pagedHolding")
	public List<PortfolioHolding> findHolding(@RequestParam int pageNo,@RequestParam int pageSize){
		return ps.findHolding(pageNo-1, pageSize);
	}
	@GetMapping(path="/holding/{id}")
	public Optional<PortfolioHolding> getHoldingById(Long id){
		return ps.findHoldingById(id);
	}
	@GetMapping(path="/holdingByTicker")
	public PortfolioHolding findHoldingByTicker(@RequestParam(name="ticker") String tickerSymbol){
		return ps.findHoldingByTicker(tickerSymbol);
	}
	@DeleteMapping(path="/deleteHolding/{id}")
	public ResponseEntity<String> deleteHolding(@PathVariable Long id){
		try {
			ps.deleteHolding(id);
			return new ResponseEntity<>("Holding Deleted",HttpStatus.OK);
		}
		catch(HoldingNotFoundException e) {
			return new ResponseEntity<>("Holding Not Available",HttpStatus.CONFLICT);
		}
	}
	@PostMapping(path="/addHolding")
	public ResponseEntity<PortfolioHolding> addHolding(@RequestBody PortfolioHolding ph){
		PortfolioHolding savedHolding=ps.addHolding(ph);
		return new ResponseEntity<>(savedHolding,HttpStatus.OK);
	}
	
	@PostMapping(path="/buy")
    public ResponseEntity<String> buyStock(@RequestParam(name="tickerSymbol") String tickerSymbol, @RequestParam(name="quantity") int quantity, @RequestParam(name="pricePerShare") double pricePerShare) {
        try {
            ps.buyStock(tickerSymbol, quantity, pricePerShare);
            return ResponseEntity.ok("Stock bought successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
	@PostMapping(path="/sell")
    public ResponseEntity<String> sellStock(@RequestParam(name="tickerSymbol") String tickerSymbol, @RequestParam(name="quantity") int quantity,@RequestParam(name="salePricePerShare") double salePricePerShare) {
        try {
            ps.sellStock(tickerSymbol, quantity,salePricePerShare);
            return ResponseEntity.ok("Stock sold successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
	
	
	
	@GetMapping(path="/allWatchlist")
	public List<Watchlist> getAllWatchlist(){
		return ps.findAllWatchList();
	}
	@GetMapping(path="/pagedWatchlist")
	public List<Watchlist> findWatchlist(@RequestParam int pageNo,@RequestParam int pageSize){
		return ps.findWatchlist(pageNo-1, pageSize);
	}
	@GetMapping(path="/watchlist")
	public Optional<Watchlist> getWatchlistByTicker(@RequestParam String tickerSymbol){
		return ps.findWatchlistByTicker(tickerSymbol);
	}
	@PostMapping(path="/addWatchlist")
	public ResponseEntity<Watchlist> addWatchlist(@RequestParam(name="ticker") String tickerSymbol,@RequestParam(name="notes") String notes){
		Watchlist wl=ps.addWatchList(tickerSymbol, notes);
		return new ResponseEntity<>(wl,HttpStatus.OK);
	}
	@DeleteMapping(path="deleteWatchlist")
	public ResponseEntity<String> deleteWatchlist(@RequestParam(name="ticker") String tickerSymbol){
		try {
			ps.deleteWatchlist(tickerSymbol);
			return new ResponseEntity<>("Deleted Successfully",HttpStatus.OK);
		}
		catch(WatchlistNotFoundException e) {
			return new ResponseEntity<>("Watchlist Not available",HttpStatus.CONFLICT);
		}
	}
}
