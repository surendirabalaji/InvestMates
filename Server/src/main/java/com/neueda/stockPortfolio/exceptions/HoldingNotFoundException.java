package com.neueda.stockPortfolio.exceptions;

public class HoldingNotFoundException extends RuntimeException {

    public HoldingNotFoundException(String message) {
        super(message);
    }
}