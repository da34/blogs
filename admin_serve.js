const express = require('express')
const history = require('connect-history-api-fallback')
const app = express()
const PORT = 3100

app.use(history())
app.use(express.static('./dist'))



app.listen(PORT, err => {
  err
    ? console.log(err)
    : console.log('Listening at http://localhost:' + PORT + '\n')
})
