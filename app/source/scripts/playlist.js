import axios from 'axios'
import queryString from 'query-string'

const playlist = axios({
  method: 'POST',
  url: '/api/playlist',
  data: {
    access_token: queryString.parse(location.search).access_token
  }
}).then(response => {
  return response
})

export default playlist
