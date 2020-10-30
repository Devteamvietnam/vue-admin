import axios from 'axios'
import store from '@/store'
import notification from 'ant-design-vue/es/notification'
import { VueAxios } from './axios'
export const ACCESS_TOKEN = 'ACCESS_TOKEN'

// Create axios instance
const request = axios.create({
  // Default prefix of API request
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 3000, // Request timeout
  headers : { 
    'Authorization': 'Bearer ' + localStorage.getItem('ACCESS_TOKEN') 
  }

})

// Exception interception processor
const errorHandler = (error) => {
  if (error.response) {
    const data = error.response.data
    // Get token from localstorage
    const token = localStorage.getItem(ACCESS_TOKEN)
    if (error.response.status === 403) {
      notification.error({
        message:'Forbidden',
        description: data.message
      })
    }
    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      notification.error({
        message:'Unauthorized',
        description:'Authorization verification failed'
      })
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
    }
  }
  return Promise.reject(error)
}

// request interceptor
request.interceptors.request.use(config => {
  const token = localStorage.getItem(ACCESS_TOKEN)
    // if token exists
   // Let each request carry a custom token, please modify it according to the actual situation
  if (token) {
    config.headers['Access-Token'] = token
  }
  return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((response) => {
  return response.data
}, errorHandler)

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, request)
  }
}

export default request

export {
  installer as VueAxios,
  request as axios
}
