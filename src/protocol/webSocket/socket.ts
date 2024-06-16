function webSocketClient(url: string) {
  const mainURL = 'wss://stream.binance.com:9443';
  const ws = new WebSocket(mainURL + url);

  const onOpen = () => {
    ws.onopen = () => {
      // connection opened
      console.warn('connection opened');
      // ws.send('something'); // send a message
    };
  };

  const onMessage = (
    callback: (e: WebSocketMessageEvent) => void | Promise<void>,
  ) => {
    ws.onmessage = e => {
      callback(JSON.parse(e.data));
      // a message was received
    };
  };

  const onError = () => {
    ws.onerror = e => {
      console.warn('onError =>', e);
      // an error occurred
    };
  };

  const onClose = () => {
    ws.onclose = e => {
      console.warn('onClose =>', e);
      // connection closed
    };
  };

  const disconnect = () => {
    ws.close();
  };

  return {onOpen, onMessage, onError, onClose, disconnect};
}

export default webSocketClient;
