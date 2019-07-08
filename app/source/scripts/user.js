import axios from 'axios'
import queryString from 'query-string'

const user = axios({
  method: 'POST',
  url: '/api/user',
  data: {
    access_token: queryString.parse(location.search).access_token
  }
}).then(response => {
  return response
})

export default user
