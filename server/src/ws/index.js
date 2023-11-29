const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 9003 });

// Simulated ticker data (replace this with your actual data source)
const tickerData = {
  ltcbtc: {
    lastPrice: 0.005,
    volume: 100,
    // Add other ticker information as needed
  },
  ethbtc: {
    lastPrice: 0.02,
    volume: 200,
    // Add other ticker information as needed
  },
  // Add more trading pairs as needed
};

// Function to simulate updating ticker data (replace this with your actual data update logic)
const updateTickerData = () => {
  for (const pair in tickerData) {
    // Simulate price changes
    tickerData[pair].lastPrice += Math.random() * 0.01 - 0.005;

    // Simulate volume changes
    tickerData[pair].volume += Math.floor(Math.random() * 10) - 5;
  }
};

// Handle ltcbtc.trades stream
const ltcbtcTradesStream = (socket) => {
  // Simulate sending ltcbtc.trades data every 3 seconds
  const sendTradesData = () => {
    updateTickerData(); // Update ticker data
 
    const tradesMessage = {
      "global.tickers": {
        "ltcbtc": getRandomTickerData(),
        "btcltc": getRandomTickerData(),
        "ethbtc": getRandomTickerData(),
        "xrpusdt": getRandomTickerData(),
        "adausdt" : getRandomTickerData(),
        "ltcusdt": getRandomTickerData(),
      }
    };
    
    function getRandomTickerData() {
      return {
        "amount": getRandomValue(50, 300),           // Random value between 50 and 300
        "avg_price": getRandomValue(0.01, 0.1),      // Random value between 0.01 and 0.1
        "high": getRandomValue(0.02, 0.15),          // Random value between 0.02 and 0.15
        "last": getRandomValue(0.01, 0.1),           // Random value between 0.01 and 0.1
        "low": getRandomValue(0.005, 0.05),          // Random value between 0.005 and 0.05
        "open": getRandomValue(0.01, 0.1),           // Random value between 0.01 and 0.1
        "price_change_percent": getRandomValue(-15, 15), // Random value between -15 and 15
        "volume": getRandomValue(5000, 20000)        // Random value between 5000 and 20000
      };
    }
    
    function getRandomValue(min, max) {
      return (Math.random() * (max - min) + min).toFixed(5);
    }
    
    
    
    socket.send(JSON.stringify(tradesMessage));

    setTimeout(sendTradesData, 3000); // Send every 3 seconds
  };

  // Start sending ltcbtc.trades data
  sendTradesData();

  // Handle disconnection
  socket.on('close', () => {
    console.log('Client disconnected');
  });
};










server.on('connection', (socket) => {
  console.log('Client connected');

  // In the 'connection' event handler
  socket.on('message', (message) => {
    console.log(`Received message: ${message}`);
    let data;
    try {
      data = JSON.parse(message);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return;
    }

    // Handle different stream types
    if (data.event === 'subscribe') {
      // Handle subscription message
      const streams = data.streams || [];
      
      if (streams.includes('ltcbtc.trades')) {
        ltcbtcTradesStream(socket);
      }
   
     if(   streams.includes('ltcusdt.kline-1m')){

      setInterval(() => {
        const currentTime = Date.now();
        const newCandle = [
            currentTime,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 1000
        ];
    
        socket.send(JSON.stringify({
            "adausdt.kline-1m": newCandle
        }));
        socket.send(JSON.stringify({
          "arnbnb.kline-1m": newCandle
      }));
    },  1000); // Set interval to 2 minutes (2 minutes * 60 seconds * 1000 milliseconds)
    

   

     }
     if(streams.includes('algobtc.ob-inc')){
      setInterval(() => {
        socket.send(JSON.stringify({
          'algobtc.ob-inc' : {
            asks : [[Math.random().toString(), Math.random().toString()]],
            bids : [[Math.random().toString(), Math.random().toString()]],
            sequence: Math.random()
          }
        }))
      }, 1000);
     }
    } else {
      console.warn('Unknown message:', data);
    }
  });

  // Handle disconnection
  socket.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server running on port 9003');






