const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const PORT = 3000;

let clients = [];     // Clients connected to the events stream

app.listen(PORT, () => {
  console.log(`RomanNumber Events service listening at http://localhost:${PORT}`)
})

function eventsHandler(request, response, next) {
  const headers = {
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache'
  };
  response.writeHead(200, headers);
  const clientId = Date.now();
  response.write('event: cid\n')
  response.write(`data: ${JSON.stringify(clientId)}\n\n`)

  const newClient = {
    id: clientId,
    response
  };

  cresponse = newClient;

  clients.push(newClient);

  request.on('close', () => {
    console.log(`${clientId} Connection closed`);
    clients = clients.filter(client => client.id !== clientId);
  });
}

app.get('/events', eventsHandler);

function sendEventsToAll(newFact, cid) {
    let romannumber = numberToRoman(Number(newFact))
    clients.forEach(client => {
        if(client.id == cid){
            client.response.write(`data: ${romannumber}\n\n`)    // Sending the romanNumber to client
        }
    })
}

async function getRomanNumber(request, response, next) {
  const number = request.query.number;
  const cid = request.query.cid;
  response.end();
  return sendEventsToAll(number, cid);
}

function numberToRoman(number){

    // Checks if the input is a valid number between 1 and 100 
    if( Number.isInteger(number) && number > 0 && number < 100 && !Number.isNaN(number)){
    let roman = "";
    const romanNumList = {XC:90,L:50, XL: 40, X:10, IX:9, V:5, IV:4, I:1};
    let a;
    for(let key in romanNumList){
        a = Math.floor(number / romanNumList[key]);
        if(a >= 0){
            for(let i = 0; i < a; i++){
              roman += key;
            }
          }
        number = number % romanNumList[key];
    }
    return roman;
    }

    else{
        return "ERROR"
    }
}

app.get('/getRoman', getRomanNumber);