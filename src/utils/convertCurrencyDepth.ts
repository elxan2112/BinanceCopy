function convertCurrencyDepth(data: any) {
  const convertedData = {
    ...(data.e && {eventType: data.e}),
    ...(data.E && {eventTime: data.E}),
    ...(data.s && {symbol: data.s}),
    ...(data.U && {firstUpdateID: data.U}),
    ...(data.u && {finalUpdateID: data.u}),
    ...(data.b && {bids: data.b}),
    ...(data.a && {asks: data.a}),
  };
  return convertedData;
}

export default convertCurrencyDepth;
