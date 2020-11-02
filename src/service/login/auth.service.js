import axios from 'axios'

const API_URL = process.env.VUE_APP_API_BASE_URL

class AuthService {
  login (user) {
    return axios
      .post(API_URL + '/api/v1/user/signin', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        console.log(response.data)
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data))
          localStorage.setItem('accessToken', response.data.accessToken)
        }

        return response.data
      })
  }

  logout () {
    localStorage.removeItem('user')
    localStorage.removeItem('accessToken')
  }

  register (user) {
    return axios.post(API_URL + '/api/v1/user/signup', {
      username: user.username,
      email: user.email,
      password: user.password
    })
  }
}

export default new AuthService()
