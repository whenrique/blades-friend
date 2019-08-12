const express = require('express')
const router = express.Router()
const querystring = require('query-string')
const request = require('request')
const dotenv = require('dotenv')
dotenv.config()

const generateState = (length) => {
  const key = process.env.CLIENT_ID + process.env.CLIENT_SECRET
  let state = ''

  for (let i = 0; i <= length; i++) {
    state += key.charAt(Math.floor(Math.random() * key.length))
  }

  return state
}

router.get('/login', (req, res) => {
  res.redirect('https://accounts.spotify.com/authorize?' +
  querystring.stringify({
    response_type: 'code',
    client_id: process.env.CLIENT_ID,
    scope: 'user-read-private user-read-email playlist-read-collaborative',
    redirect_uri: `http://${req.headers.host}:${process.env.PORT ? process.env.PORT : 9000}/api/callback`,
    show_dialog: true,
    state: generateState(24)
  }))
})

router.get('/callback', (req, response) => {
  request({
    method: 'POST',
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: req.query.code,
      redirect_uri: `http://${req.headers.host}:${process.env.PORT ? process.env.PORT : 9000}/api/callback`,
      grant_type: 'authorization_code',
    },
    headers: {
      'Authorization': `Basic ${(new Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'))}`
    },
    json: true
  }, (err, res, body) => {
    if (err) {
      console.log(err)
      return false
    }

    response.redirect('/?' +
      querystring.stringify({
        access_token: body.access_token,
        refresh_token: body.refresh_token
      })
    )
  })
})

router.post('/user', (req, res) => {
  request({
    method: 'GET',
    url: 'https://api.spotify.com/v1/me',
    headers: {
      'Authorization': `Bearer ${req.body.access_token}`
    },
    json: true
  }, (err, response, body) => {
    if (err) {
      console.log('error', err)
      return res.send(err)
    } else if (body.error) {
      console.log('body error', body.error)
      return res.send(body.error)
    }
    return res.send(response)
  })
})

router.post('/playlist', (req, res) => {
  request({
    method: 'GET',
    url: 'https://api.spotify.com/v1/playlists/0HmKBP4NpwHyFPIGxCsgRn',
    headers: {
      'Authorization': `Bearer ${req.body.access_token}`
    },
    json: true
  }, (err, response, body) => {
    if (err) {
      console.log('error', err)
      return res.send(err)
    } else if (body.error) {
      console.log('body error')
      return res.send(body.error)
    }
    return res.send(response)
  })
})

router.post('/search', (req, res) => {
  request({
    method: 'GET',
    url: `https://api.spotify.com/v1/search?q=${req.body.query}&type=track`,
    headers: {
      'Authorization': `Bearer ${req.body.access_token}`
    },
    json: true
  }, (err, response, body) => {
    if (err) {
      console.log('error', err)
      return res.send(err)
    }

    return res.send(response)
  })
})

module.exports = router
