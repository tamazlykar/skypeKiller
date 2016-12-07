/*TODO
1. Make other files unavalible with path
2. Write who connecting who disconnecting chat
3. Create config and set port there
 */
'use strict';

let server = require('http').createServer();
let WebSocketServer = require('ws').Server;
let webSocketServer = new WebSocketServer({ server });
let express = require('express');
let app = express();
const port = 9000;

let clients = {};

const MessageType = {
  Message: 0
};


app.use(express.static('build'));

webSocketServer.on('connection', (ws) => {
  let id = ID();
  clients[id] = ws;
  console.log(`new connection ${id}`);

  ws.on('message', (message) => {
    for (let key in clients) {
      clients[key].send(message);
    }
  });

  ws.on('close', () => {
    console.log(`connection closed ${id}`);
    delete clients[id];
  })
});

/**
 * @return {string}
 */
function ID() {
  return '_' + Math.random().toString(36).substr(2, 9);
}


server.on(`request`, app);
server.listen(port, () => {
  console.log(`Listening on ${server.address().port}`);
});


