import request from '../utils/request'

const URL = {
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  GETINFO: 'auth'
}

export default {
  register({username,password}){
    return request(URL.REGISTER,'POST',{username,password})
  },
  login({username,password}){
    return request(URL.LOGIN,'POST',{username,password})
  },
  logout(){
    return request(URL.LOGIN)
  },
  getInfo() {
    return request(URL.GETINFO)
  }
}