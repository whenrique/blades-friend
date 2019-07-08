const path = require('path')
const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const dotenv = require('dotenv')
dotenv.config()

const PUBLIC = path.join(__dirname, '..', 'public')
app.use(express.static(PUBLIC))

app.get('/', (req, res) => {
  if (req.query.access_token) {
    return res.sendFile(`${PUBLIC}/signed.html`)
  }
  return res.sendFile(`${PUBLIC}/signin.html`)
})

const api = require('./api')
app.use('/api', api)


app.listen(process.env.PORT ? process.env.PORT : 9000)
