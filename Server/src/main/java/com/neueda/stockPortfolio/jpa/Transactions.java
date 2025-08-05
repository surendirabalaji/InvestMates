package com.neueda.stockPortfolio.jpa;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDateTime;


@Entity
public class Transactions {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tickerSymbol;
    private String transactionType;
    private int bQuantity;
    private int quantity;
    public int getbQuantity() {
		return bQuantity;
	}

	public void setbQuantity(int bQuantity) {
		this.bQuantity = bQuantity;
	}

	private double pricePerShare;
    private LocalDateTime transactionDate;

    // Constructors
    public Transactions() {
    }

    public Transactions(String tickerSymbol, String transactionType, int quantity, double pricePerShare, LocalDateTime transactionDate,int bQuantity) {
        this.tickerSymbol = tickerSymbol;
        this.transactionType = transactionType; //sell or buy
        this.quantity = quantity;
        this.pricePerShare = pricePerShare;
        this.transactionDate = transactionDate;
        this.bQuantity=bQuantity;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTickerSymbol() {
        return tickerSymbol;
    }

    public void setTickerSymbol(String tickerSymbol) {
        this.tickerSymbol = tickerSymbol;
    }

    public String getTransactionType() {
        return transactionType;
    }

    public void setTransactionType(String transactionType) {
        this.transactionType = transactionType;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getPricePerShare() {
        return pricePerShare;
    }

    public void setPricePerShare(double pricePerShare) {
        this.pricePerShare = pricePerShare;
    }

    public LocalDateTime getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(LocalDateTime transactionDate) {
        this.transactionDate = transactionDate;
    }
}
