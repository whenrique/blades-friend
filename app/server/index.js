const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()

const api = require('./api')

app.get('/', (req, res) => {
  console.log(req.query)
  return res.send('Esta é a home!')
})

app.use('/api', api)

app.listen(process.env.PORT ? process.env.PORT : 9000)
