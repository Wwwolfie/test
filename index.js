const http = require('http')
const express = require('express')

require('dotenv/config')

const Domains = require('./domains')

const appWWW = express()
const appSub = express()

Domains.init().then(() => {
  console.log('Domains initializated')
})

appWWW.get('/', (req, res) => {
  res.send({
    subdomain: false,
    domain: req.get('host'),
  })
})

appWWW.get('/add', (req, res) => {
  const domain = req.query.domain

  if (domain.match(/[a-z0-9-_]+\.[a-z0-9-_]+/)) {
    Domains.assignDomain(domain)
      .then((response) => {
        res.send(response)
      })
      .catch((e) => {
        res.status(400).send({
          message: e.message,
        })
      })
  } else {
    res.status(400).send({
      message: 'Invalid domain (valid: example.com)',
    })
  }
})

appSub.get('/', (req, res) => {
  res.send({
    subdomain: true,
    domain: req.get('host'),
  })
})

http
  .createServer((req, res) => {
    const subdomain = /[a-z0-9-_]+\.[a-z0-9-_]+(\.[a-z0-9-_]+|:\d+)/
    const host = req.headers.host

    if (host.match(subdomain)) {
      appSub(req, res)
    } else {
      appWWW(req, res)
    }
  })
  .listen(process.env.PORT || 8080)
