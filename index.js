const http = require('http')
const express = require('express')

const app = express()
const server = http.createServer(app)

require('dotenv/config')

const Domains = require('./domains')

const PORT = process.env.PORT || 8080

var launchTime = +new Date()

app.get('/', (req, res) => {
  res.send({
    domain: req.get('host'),
    launch: launchTime,
  })
})

app.get('/add', (req, res) => {
  launchTime = +new Date()
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

// Domains.init().then(() => {
//    console.log('Domains initializated')
// })

server.listen(PORT, () => launch.log(`Server is running on ${PORT}`))
