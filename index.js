const http = require('http')
const express = require('express')

require('dotenv/config')

const Domains = require('./domains')

const PORT = process.env.PORT || 8080

const app = express()

Domains.init().then(() => {
  console.log('Domains initializated')
})

const launchTime = +new Date()

app.get('/', (req, res) => {
  res.send({
    subdomain: false,
    domain: req.get('host'),
    launch: launchTime,
  })
})

app.get('/api/add', (req, res) => {
  const domain = req.query.domain

  res.send({ message: 'OKAY' })

  return

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

app.listen(PORT)

module.exports = app
