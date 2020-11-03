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
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data))
          localStorage.setItem('fullname', JSON.stringify(response.data.fullname))
          localStorage.setItem('accessToken', response.data.accessToken)
        }

        return response.data
      })
  }

  logout () {
    localStorage.removeItem('fullname')
    localStorage.removeItem('user')
    localStorage.removeItem('accessToken')
    
  }

  register (user) {
    return axios.post(API_URL + '/api/v1/user/signup', {
      username: user.username,
      fullname: user.fullname,
      email: user.email,
      password: user.password
    })
  }
}

export default new AuthService()
