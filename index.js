const http = require('http');
const express = require('express');

const appWWW = express();
const appSub = express();

appWWW.get('/', (req, res) => {
    res.send({
        subdomain: false
    })
})
appSub.get('/', (req, res) => {
    res.send({
        subdomain: true
    })
})

http.createServer((req, res) => {
  switch(req.headers.host) {
  case 'www.example.com':
    appWWW(req, res);
    break;
  case 'flowcryptobit.herokuapp.com':
    appSub(req, res);
    break;
  }
}).listen(process.env.PORT || 8080)