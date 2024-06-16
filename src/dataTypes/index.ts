export type MarketType = {
  eventType: string;
  eventTime: string;
  symbol: string;
  priceChange: string;
  priceChangePercent: string;
  weightedAveragePrice: string;
  firstTradePrice: string;
  lastPrice: string;
  lastQuantity: string;
  bestBidPrice: string;
  bestBidQuantity: string;
  bestAskPrice: string;
  bestAskQuantity: string;
  openPrice: string;
  lowPrice: string;
  totalTradedBaseAssetVolume: string;
  totalTradedQuoteAssetVolume: string;
  statisticsOpenTime: string;
  statisticsCloseTime: string;
  firstTradeID: string;
  lastTradeID: string;
  totalNumberOfTrades: string;
};

export type CurrencyType = {
  eventType: string;
  eventTime: string;
  symbol: string;
  firstUpdateID: string;
  finalUpdateID: string;
  bids: Array<number>;
  asks: Array<number>;
};
