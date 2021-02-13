const http = require('http')
const express = require('express')
const getIP = require('./namecheap').getIP

const app = express()
const server = http.createServer(app)

require('dotenv/config')

const api = require('./api')

const PORT = process.env.PORT || 8080

var launchTime = +new Date()

app.use(express.urlencoded({ extended: false }))

app.use('/api', api)

app.get('/', (req, res) => {
  res.send({
    domain: req.get('host'),
    launch: launchTime,
    IP: getIP()
  })
})

server.listen(PORT, () => console.log(`Server is running on ${PORT}`))
