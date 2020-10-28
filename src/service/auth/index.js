import request from '@/service'
export default {
  login(data) {
    return request({
      url: '/api/v1/user/signin',
      method: 'POST',
      data: {data}
    })
  },
  register(data) {
    return request({
      url: '/api/v1/user/signup',
      method: 'POST',
      data: {data}
    })
  }
}