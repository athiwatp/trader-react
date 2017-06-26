export const ACTIONS = {
    BUY: 'buy',
    SELL: 'sell'
};

export const EXCHANGES = {
    NSE: 'nse',
    BSE: 'bse',
    NASDAQ: 'nasdaq'
};

export const EMPTY_STOCK = {
    symbol: '',
    price: '',
    quantity: '',
    date: '',
    action: ACTIONS.BUY,
    exchange: EXCHANGES.NSE
};

export const STOCK_MODE = {
    SUMMARY: 'summary',
    DETAIL: 'detail'
};