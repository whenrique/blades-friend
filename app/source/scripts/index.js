import 'style/main.scss'

import user from './user'
user.then(response => {
  const data = response.data.body
  console.log(data)
  const name = data.display_name
  const photo = data.images[0].url

  document.querySelector('.signed').style.backgroundImage = photo

  document.querySelector('.signed__photo-profile').src = photo
  document.querySelector('.signed__photo-profile').alt = name
  document.querySelector('.signed__name').innerHTML = name.split(' ').shift()
}).catch(err => console.log(err))
