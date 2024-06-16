function convert(data: any) {
  const convertedData = {
    ...(data.e && {eventType: data.e}),
    ...(data.E && {eventTime: data.E}),
    ...(data.s && {symbol: data.s}),
    ...(data.p && {priceChange: data.p}),
    ...(data.P && {priceChangePercent: data.P}),
    ...(data.w && {weightedAveragePrice: data.w}),
    ...(data.x && {firstTradePrice: data.x}),
    ...(data.c && {lastPrice: data.c}),
    ...(data.Q && {lastQuantity: data.Q}),
    ...(data.b && {bestBidPrice: data.b}),
    ...(data.B && {bestBidQuantity: data.B}),
    ...(data.a && {bestAskPrice: data.a}),
    ...(data.A && {bestAskQuantity: data.A}),
    ...(data.o && {openPrice: data.o}),
    ...(data.l && {lowPrice: data.l}),
    ...(data.v && {totalTradedBaseAssetVolume: data.v}),
    ...(data.q && {totalTradedQuoteAssetVolume: data.q}),
    ...(data.O && {statisticsOpenTime: data.O}),
    ...(data.C && {statisticsCloseTime: data.C}),
    ...(data.F && {firstTradeID: data.F}),
    ...(data.L && {lastTradeID: data.L}),
    ...(data.n && {totalNumberOfTrades: data.n}),
  };
  return convertedData;
}

function convertAllMarketFromWS(data: Array<any> | any) {
  if (Array.isArray(data)) {
    return data.map(item => convert(item));
  } else {
    return convert(data);
  }
}

export default convertAllMarketFromWS;
