# 📈 InvestMates - Stock Portfolio Management Application

A comprehensive full-stack web application for managing and tracking your stock portfolio with real-time data, transaction management, and watchlist functionality. Built with React frontend and Spring Boot backend.

## ✨ Features

### 📊 Portfolio Management
- **Real-time Holdings Tracking** - View current stock positions with quantity and average price
- **Transaction History** - Complete buy/sell transaction records with timestamps
- **Portfolio Analytics** - Track total portfolio value and individual stock performance
- **Average Price Calculation** - Automatic calculation of average cost basis for holdings

### 💰 Trading Operations
- **Buy Stocks** - Add new positions or increase existing holdings
- **Sell Stocks** - FIFO-based selling with automatic gain/loss calculation
- **Transaction Logging** - Every trade is automatically recorded with full details
- **Position Management** - Holdings are automatically updated based on transactions

### 👀 Watchlist Management  
- **Stock Monitoring** - Track interesting stocks without purchasing
- **Custom Notes** - Add personal notes and analysis for each watchlist item
- **Easy Management** - Add/remove stocks from watchlist with simple interface

### 📱 Modern User Interface
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Collapsible Sidebar** - Clean navigation with expandable menu
- **Dark Theme** - Modern dark theme for comfortable viewing
- **Bootstrap Integration** - Professional styling with Bootstrap components

## 🏗️ Architecture

### Frontend (React + Vite)
```
FrontEnd/
├── src/
│   ├── component/
│   │   ├── Assets/           # Asset management components
│   │   ├── Dashboard/        # Main dashboard view
│   │   ├── Navbar/           # Navigation and routing
│   │   ├── Trade/            # Trading interface
│   │   ├── Transactions/     # Transaction history
│   │   └── Watchlist/        # Watchlist management
│   ├── App.jsx              # Main application component
│   └── main.jsx             # Application entry point
```

**Tech Stack:**
- **React 18** with functional components and hooks
- **Vite** for fast development and building
- **React Router** for client-side routing
- **Bootstrap 5** for responsive design
- **React Icons** for consistent iconography

### Backend (Spring Boot)
```
Server/
├── src/main/java/com/neueda/stockPortfolio/
│   ├── controller/          # REST API endpoints
│   ├── service/             # Business logic layer  
│   ├── jpa/                 # Entity definitions
│   ├── repo/                # Data access repositories
│   └── exceptions/          # Custom exception handling
```

**Tech Stack:**
- **Spring Boot 3.3.2** with Java 21
- **Spring Data JPA** for data persistence
- **MySQL** database for data storage
- **SpringDoc OpenAPI** for API documentation
- **Maven** for dependency management

## 🚀 Quick Start

### Prerequisites
- **Java 21+** and Maven
- **Node.js 18+** and npm
- **MySQL 8.0+**

### Database Setup
1. **Create MySQL database:**
   ```sql
   CREATE DATABASE portfolioDb;
   CREATE USER 'root'@'localhost' IDENTIFIED BY 'password';
   GRANT ALL PRIVILEGES ON portfolioDb.* TO 'root'@'localhost';
   ```

2. **Update database configuration** in `Server/src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/portfolioDb
   spring.datasource.username=root
   spring.datasource.password=your_password
   ```

### Backend Setup
```bash
# Navigate to server directory
cd Server

# Run the Spring Boot application
./mvnw spring-boot:run

# Or on Windows
mvnw.cmd spring-boot:run
```

The backend will start on `http://localhost:8080`

### Frontend Setup
```bash
# Navigate to frontend directory
cd FrontEnd

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will start on `http://localhost:5173`

## 🔌 API Documentation

### Portfolio Holdings
```bash
GET    /portfolio/allHoldings              # Get all holdings
GET    /portfolio/pagedHolding              # Get paginated holdings
GET    /portfolio/holding/{id}              # Get holding by ID
GET    /portfolio/holdingByTicker           # Get holding by ticker
POST   /portfolio/addHolding                # Add new holding
DELETE /portfolio/deleteHolding/{id}        # Delete holding
```

### Transactions
```bash
GET    /portfolio/allTransaction            # Get all transactions
GET    /portfolio/pagedTransaction          # Get paginated transactions
GET    /portfolio/transaction/{id}          # Get transaction by ID
GET    /portfolio/transaction               # Get transactions by ticker
POST   /portfolio/addTransaction            # Add new transaction
```

### Trading Operations
```bash
POST   /portfolio/buy                       # Buy stock
POST   /portfolio/sell                      # Sell stock
```

**Buy Stock Request:**
```bash
POST /portfolio/buy?tickerSymbol=AAPL&quantity=100&pricePerShare=150.50
```

**Sell Stock Request:**
```bash
POST /portfolio/sell?tickerSymbol=AAPL&quantity=50&salePricePerShare=155.25
```

### Watchlist Management
```bash
GET    /portfolio/allWatchlist             # Get all watchlist items
GET    /portfolio/pagedWatchlist           # Get paginated watchlist
GET    /portfolio/watchlist                # Get watchlist item by ticker
POST   /portfolio/addWatchlist             # Add to watchlist
DELETE /portfolio/deleteWatchlist          # Remove from watchlist
```

**Add to Watchlist:**
```bash
POST /portfolio/addWatchlist?ticker=TSLA&notes=Electric vehicle leader
```

## 💾 Database Schema

### Transactions Table
```sql
CREATE TABLE transactions (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    ticker_symbol VARCHAR(10) NOT NULL,
    transaction_type VARCHAR(10) NOT NULL,  -- 'BUY' or 'SELL'
    quantity INT NOT NULL,
    b_quantity INT NOT NULL,                -- Original buy quantity
    price_per_share DECIMAL(10,2) NOT NULL,
    transaction_date DATETIME NOT NULL
);
```

### Portfolio Holdings Table
```sql
CREATE TABLE portfolio_holding (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    ticker_symbol VARCHAR(10) NOT NULL UNIQUE,
    quantity INT NOT NULL,
    purchase_date DATETIME NOT NULL,
    average_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(15,2) NOT NULL,
    transaction_id BIGINT NOT NULL,
    FOREIGN KEY (transaction_id) REFERENCES transactions(id)
);
```

### Watchlist Table
```sql
CREATE TABLE watchlist (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    ticker_symbol VARCHAR(10) NOT NULL UNIQUE,
    notes TEXT
);
```

## 🎯 Key Business Logic

### FIFO Stock Selling
The application implements **First-In-First-Out (FIFO)** methodology for stock selling:

1. **Sell Order Processing:** When selling stocks, the system matches against the oldest buy transactions first
2. **Partial Sales:** If a buy transaction is partially sold, the remaining quantity is updated
3. **Gain/Loss Calculation:** Automatic calculation of realized gains/losses based on cost basis
4. **Holdings Update:** Portfolio holdings are updated to reflect new quantities and average prices

### Average Price Calculation
```java
// When buying additional shares
double totalCost = currentTotalPrice + (newQuantity * newPrice);
double newAveragePrice = totalCost / (currentQuantity + newQuantity);
```

### Transaction Tracking
- Every buy/sell operation creates a transaction record
- Original buy quantities are preserved in `bQuantity` field
- Transaction dates enable proper FIFO ordering
- Complete audit trail of all portfolio activities

## 🎨 Frontend Features

### Navigation Structure
- **Dashboard** - Portfolio overview and key metrics
- **Assets** - Detailed holdings management
- **Watchlist** - Stock monitoring and research
- **Trade** - Buy/sell interface  
- **Transactions** - Complete transaction history

### Responsive Design
- **Collapsible Sidebar** - Adapts to screen size
- **Mobile Optimized** - Touch-friendly interface
- **Dark Theme** - Reduces eye strain
- **Icon-Based Navigation** - Intuitive user experience

## 🔧 Configuration

### Application Properties
```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/portfolioDb
spring.datasource.username=root
spring.datasource.password=password

# JPA Configuration  
spring.jpa.properties.hibernate.hbm2ddl.auto=update

# Error Handling
server.error.include-stacktrace=on_param
server.error.include-exception=false
```

### Frontend Configuration
- **Vite** for fast builds and hot module replacement
- **Bootstrap** imported via CDN for consistent styling
- **React Router** for single-page application navigation

```


## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Code Standards
- **Backend:** Follow Java coding conventions and Spring Boot best practices
- **Frontend:** Use ESLint and Prettier for consistent code formatting
- **Database:** Follow proper naming conventions and indexing strategies

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### API Documentation
- **Swagger UI:** `http://localhost:8080/swagger-ui.html`
- **API Docs:** `http://localhost:8080/v3/api-docs`

### Database Management
- **MySQL Workbench** recommended for database management
- **phpMyAdmin** alternative for web-based administration

### Development Tools
- **Spring Tool Suite** or **IntelliJ IDEA** for backend development
- **VS Code** with React extensions for frontend development

---

**Built with ❤️ using Spring Boot and React**

*InvestMates - Your Personal Investment Management Solution*
