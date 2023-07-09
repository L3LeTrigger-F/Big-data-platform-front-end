import request from '@/utils/request'
import axios from 'axios'
export const defaultUsersData:UsersData = {
  id: 0,
  name: '',
  cryptology: '',
  create_time: '',
  character: '',
  action: ''
}

export const getUsers = (params: any) =>
  request({
    url: '/show',
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

export const updateUser = (params: any) =>
  request({
    url: '/modify',
    method: 'post',
    params
  })

export const deleteUser = (params:any) =>
  request({
    url: '/delete',
    method: 'delete',
    params
  })

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
