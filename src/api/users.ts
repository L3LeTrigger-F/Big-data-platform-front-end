import request from '@/utils/request'
import axios from 'axios'
export const getUsers = (params: any) =>
  request({
    url: '/users',
    method: 'get',
    params
  })

export const getUserInfo = (data: any) =>
  request({
    // url: '/users/info',
    url: '/init',
    method: 'post',
    data
  })

export const getUserByName = (username: string) =>
  request({
    url: `/users/${username}`,
    method: 'get'
  })

export const updateUser = (username: string, data: any) =>
  request({
    url: `/users/${username}`,
    method: 'put',
    data
  })

export const deleteUser = (username: string) =>
  request({
    url: `/users/${username}`,
    method: 'delete'
  })

// export const login = async(username: string, password: string) => {
// try {
// const response = await axios.post('/login', { username, password })
// const { success, message } = response.data
// Handle the login response
// if (success) {
// console.log('Login successful')
// console.log('Message:', message)
// request({
// url: '/users/login',
// method: 'post',
// password
// })    
// Perform any actions for successful login
// } else {
// console.log('Login failed')
// console.log('Message:', message)
// Perform any actions for failed login
// }
// } catch (error) {
// console.error('An error occurred during login')
// Handle error cases
// }
// }
// export const login = (data: any) =>
// request({
// url: '/users/login',
// method: 'post',
// data
// })
export const login = (data: any) =>
  request({
    url: '/login',
    method: 'post',
    data
  })

export const logout = () =>
  request({
    url: '/users/logout',
    method: 'post'
  })

export const register = (data: any) =>
  request({
    url: '/register',
    method: 'post',
    data
  })
