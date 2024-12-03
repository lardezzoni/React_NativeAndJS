const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

const stocks = [
  { symbol: 'AAPL', price: 150 },
  { symbol: 'GOOGL', price: 2800 },
  { symbol: 'AMZN', price: 3400 },
  { symbol: 'TSLA', price: 700 },
];

function getRandomPrice() {
  return Math.random() * 100 + 50;
}

setInterval(() => {
  const updatedStocks = stocks.map(stock => ({
    ...stock,
    price: getRandomPrice().toFixed(2),
  }));

  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(updatedStocks));
    }
  });
}, 2000);