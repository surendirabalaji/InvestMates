package com.neueda.stockPortfolio;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = "com.neueda.stockPortfolio")

public class StockPortfolioApplication {

	public static void main(String[] args) {
		SpringApplication.run(StockPortfolioApplication.class, args);
	}

}
