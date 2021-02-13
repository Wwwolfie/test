const http = require('http')
const express = require('express')
const namecheap = require('./namecheap')

const app = express()
const server = http.createServer(app)

require('dotenv/config')

const api = require('./api')

const PORT = process.env.PORT || 8080

var launchTime = +new Date()

app.use(express.urlencoded({ extended: false }))

app.use('/api', api)

app.get('/', async (req, res) => {
  res.send({
    domain: req.get('host'),
    launch: launchTime,
    IP: namecheap.getIP(),
    domains: await namecheap.getList()
  })
})

server.listen(PORT, () => console.log(`Server is running on ${PORT}`))
