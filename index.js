const http = require('http')
const express = require('express')

const app = express()
const server = http.createServer(app)

require('dotenv/config')

const api = require('./api')

const PORT = process.env.PORT || 8080

var launchTime = +new Date()

app.use('/api', api)

app.get('/', (req, res) => {
  res.send({
    domain: req.get('host'),
    launch: launchTime,
  })
})

server.listen(PORT, () => launch.log(`Server is running on ${PORT}`))
