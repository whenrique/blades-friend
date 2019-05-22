const express = require('express')
const router = express.Router()
const querystring = require('querystring')
const request = require('request')

const dotenv = require('dotenv')
dotenv.config()

var generateRandomString = function(length) {
  var text = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

var scopes = 'user-read-private user-read-email'

router.get('/login', (req, res) => {
  res.redirect('https://accounts.spotify.com/authorize?' +
  querystring.stringify({
    response_type: 'token',
    client_id: process.env.CLIENT_ID,
    scope: scopes,
    redirect_uri: `http://localhost:${process.env.PORT ? process.env.PORT : 9000}/`,
    state: generateRandomString(16),
    show_dialog: true
  }))
})

// router.get()

// router.get('/callback', (req, res) => {
//   // const authOptions = {
//   //   url: 'https://accounts.spotify.com/api/token',
//   //   form: {
//   //     code: req.query.code,
//   //     redirect_uri: 'http://localhost:9000/api/callback',
//   //     grant_type: 'authorization_code'
//   //   },
//   //   headers: {
//   //     'Authorization': 'Basic ' + (new Buffer(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'))
//   //   },
//   //   json: true
//   // }

//   // request.post(authOptions, function(error, response, body) {

//   //   var access_token = body.access_token
//   //   // refresh_token = body.refresh_token

//   //   var options = {
//   //     url: 'https://api.spotify.com/v1/me/playlists?limit=50',
//   //     headers: { 'Authorization': 'Bearer ' + access_token },
//   //     json: true
//   //   }

//   //   request.get(options, function(error, response, body) {
//   //     const pl = body.items.filter(_ => _.owner.id === 'whenrique')
//   //     console.log(pl)
//   //   })
//   // })
// })

module.exports = router
