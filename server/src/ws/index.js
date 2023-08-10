const WebSocket = require("ws");

const localWebSocket = new WebSocket.Server({ port: 5009 });
let num = 0;

// Store the subscribed clients
const subscribedClients = new Set();
let interval;

localWebSocket.on('connection', (ws) => {
  console.log('Connected');

  ws.on('message', (data) => {
    try {
      const parsedData = JSON.parse(data);
      switch (parsedData.method) {
        case 'subscribe':
          console.log('Client subscribed to updates params');
          subscribedClients.add(ws); // Add the client to the set of subscribed clients

          // Start the interval when the first client subscribes
          if (subscribedClients.size === 1) {
            interval = setInterval(() => {
              num = Number(num + 1);
              const message = {
                event: 'update',
                data: [
                  {
                    key: 'bsc-testnet',
                    BlockNumber: Number((Math.random() * 10000).toFixed(4))
                  },
                  {
                    key: 'testnet',
                    BlockNumber: Number((Math.random() * 10000).toFixed(4))
                  }
                ],
                message: 'Updated Block Number => ' + num
              };

              subscribedClients.forEach((client) => {
                //client.send(JSON.stringify(message));
              });
            }, 3000);
          }
          break;
        case 'unsubscribe':
          console.log('Client unsubscribed from updates');
          subscribedClients.delete(ws); // Remove the client from the set of subscribed clients
          ws.send(JSON.stringify({data : [],message : { error :  'unsubscribed Incoming Message'}}))
          // Stop the interval when the last client unsubscribes
          if (subscribedClients.size === 0) {
            clearInterval(interval);
            interval = null;
          }
          break;
        default:
          console.log('Unknown method:', parsedData.method);
          ws.send(JSON.stringify({data : [],message : { error :  'Unknown method:'+ parsedData.method}}))
      }
    } catch (error) {
      console.error('Error parsing client message:', error);
    }
  });

  ws.on('close', () => {
    console.log('Disconnected');
    subscribedClients.delete(ws); // Remove the client from the set of subscribed clients

    // Stop the interval when the last client disconnects
    if (subscribedClients.size === 0) {
      clearInterval(interval);
      interval = null;
    }
  });
});
