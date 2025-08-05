package com.neueda.stockPortfolio.exceptions;

public class WatchlistNotFoundException extends RuntimeException {

    public WatchlistNotFoundException(String message) {
        super(message);
    }
}