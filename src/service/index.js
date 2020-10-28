import axios from 'axios'

const service = axios.create({
  // baseURL: process.env.API, // api base_url
  baseURL: process.env.VUE_APP_API_BASE_URL,
  withCredentials: true, // cookie
  timeout: 20000, // request timeout
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('accessToken')
  }
})

export default service