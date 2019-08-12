/* eslint-disable no-console */
import axios from 'axios'
import queryString from 'query-string'

const search = searchfield => {
  searchfield.addEventListener('keyup', () => {
    if (!searchfield.value) {
      document.querySelector('.tracks__list').innerHTML = ''
      return false
    }

    request(searchfield.value).then(response => {
      const tracks = response.data.body.tracks.items
      const track = tracks.map(_ => {
        console.log(_.name)
        return `<li class="tracks__track">
          <span class="tracks__track-name">${_.name}</span>
          <span class="tracks__track-artist">${_.artists[0].name}</span>
        </li>`
      }).join('')

      document.querySelector('.tracks__list').innerHTML = track
    }).catch(err => console.log(err))
  })
}

const request = query => (
  axios({
    method: 'POST',
    url: '/api/search',
    data: {
      access_token: queryString.parse(location.search).access_token,
      query: query
    }
  }).then(response => {
    return response
  })
)

export default search
