const express = require('express')
const http = require('http')
const app = express();
const server = http.createServer(app)

const WWW_RE = /^www\./i;
app.use((req, res, next) => {
  const host = req.headers.host.replace(WWW_RE, '');
  req.url = '/' + host + req.url;
  console.log(req.url)
  next();
});

app.get('/', (req, res) => {
  res.send({body: 'works'})
})

console.log('go!')
server.listen(process.env.PORT || 8080);