import axios from 'axios'

const BASE_URL = process.env.VUE_APP_API_BASE_URL

class AuthService {
  login (user) {
    return axios
      .post(BASE_URL + '/api/v1/user/signin', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.set('user', JSON.stringify(response.data))
          localStorage.set('accessToken', response.data.accessToken)
        }

        return response.data
      })
  }
  logout () {
    localStorage.removeItem('user')
    localStorage.removeItem('accessToken')
  }
  register (user) {
    return axios.post(BASE_URL + '/api/v1/user/signup', {
      email: user.email,
      fullname: user.fullname,
      password: user.password
    })
  }
}
export default new AuthService()
