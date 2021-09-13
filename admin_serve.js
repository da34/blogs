var express = require('express')
var history = require('connect-history-api-fallback')
var app = express()

app.use(history())
app.use(express.static('./dist'))

const PORT = 3100

module.exports = app.listen(PORT, err => {
  err
    ? console.log(err)
    : console.log('Listening at http://localhost:' + PORT + '\n')
})
