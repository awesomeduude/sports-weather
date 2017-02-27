import axios from 'axios'

const logout = (store) => {
  axios.get('/api/logout').then(response => {
   store.logout()
  })
}

export default logout
