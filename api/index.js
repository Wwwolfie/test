const express = require('express')
const router = new express.Router()

require('dotenv/config')

const Domains = require('../domains')

Domains.init().then(() => {
  console.log('Domains initializated')
})

router.get('/add', (req, res) => {
  const domain = req.query.domain

  if (domain && domain.match(/[a-z0-9-_]+\.[a-z0-9-_]+/)) {
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

module.exports = router
