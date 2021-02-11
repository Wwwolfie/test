const http = require('http');
const express = require('express');

const appWWW = express();
const appSub = express();

appWWW.get('/', (req, res) => {
    res.send({
      subdomain: false,
      domain: process.domain
    })
})

appSub.get('/', (req, res) => {
    res.send({
      subdomain: true,
      domain: process.domain
    })
})

http.createServer((req, res) => {
  const subdomain = /[a-z0-9-_]+\.[a-z0-9-_]+(\.[a-z0-9-_]+|:\d+)/
  const host = req.headers.host

  if (host.match(subdomain)) {
    appSub(req, res)
  } else {
    appWWW(req, res)
  }
}).listen(process.env.PORT || 8080)