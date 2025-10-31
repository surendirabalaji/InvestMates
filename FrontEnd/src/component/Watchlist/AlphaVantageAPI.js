/**
 * Fetches stock data from Alpha Vantage API based on a given ticker symbol.
 * @param {string} symbol - The stock symbol for which data is requested.
 * @param {string} apiKey - Your Alpha Vantage API key.
 * @returns {Promise<Object>} The stock data.
 */
export async function fetchStockData(symbol, apiKey) {
    try {
        const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${'5DN8AP230Z9MACDL'}`;
        const response = await fetch(url);
        const data = await response.json();

        // Check if the response is successful and has the needed data
        if (data && data["Global Quote"]) {
            return {
                symbol: data["Global Quote"]["01. symbol"],
                open: data["Global Quote"]["02. open"],
                high: data["Global Quote"]["03. high"],
                low: data["Global Quote"]["04. low"],
                price: data["Global Quote"]["05. price"],
                volume: data["Global Quote"]["06. volume"],
                latestTradingDay: data["Global Quote"]["07. latest trading day"],
                previousClose: data["Global Quote"]["08. previous close"],
                change: data["Global Quote"]["09. change"],
                changePercent: data["Global Quote"]["10. change percent"],
            };
        } else {
            throw new Error('Stock data is not available.');
        }
    } catch (error) {
        console.error('Failed to fetch stock data:', error);
        throw error; // Re-throw the error if handling is needed at a higher level
    }
}
