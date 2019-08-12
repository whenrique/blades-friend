n/* eslint-disable no-console */
import 'style/main.scss'

import user from './user'
import search from './search'

const signedWrapper = document.querySelector('.signed')
const avatarDefault = 'https://cdn1.iconfinder.com/data/icons/avatars-55/100/avatar_profile_user_music_headphones_shirt_cool-512.png'

user.then(response => {
  const data = response.data.body
  const name = data.display_name ? data.display_name : data.email.split('@')[0]
  const photo = data.images[0] ? data.images[0].url : avatarDefault

  signedWrapper.querySelector('.signed__photo-profile').src = photo
  signedWrapper.querySelector('.signed__photo-profile').alt = name
  signedWrapper.querySelector('.signed__name').innerHTML = name.split(' ').shift()
}).catch(err => console.log(err))

const acceptButton = signedWrapper.querySelector('.signed__button-accept')
acceptButton.addEventListener('click', () => {
  const searchFieldTemplate = `
    <div class="tracks">
      <input type=search class="signed__field field__primary field__search" placeholder="Search music" />
      <ul class="tracks__list"></ul>
    </div>
    `
  acceptButton.style.display = 'none'

  signedWrapper.classList.add('search-opened')
  signedWrapper.insertAdjacentHTML('beforeend', searchFieldTemplate)

  const searchfield = signedWrapper.querySelector('.field__search')
  search(searchfield)
})
