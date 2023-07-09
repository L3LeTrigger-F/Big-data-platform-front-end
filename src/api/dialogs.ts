import request from '@/utils/request'
import { DialogData } from './types'

export const defaultDialogsData: DialogData = {
  id: 0,
  timestamp: '',
  dname: '',
  description: '',
  kinds: '',
  level: '',
  no: 0,
  sname: ''
}

export const getDialogs = (params: any) =>
  request({
    url: '/show',
    method: 'get',
    params
  })

export const createDialogs = (params: any) =>
  request({
    url: '/new',
    method: 'post',
    params
  })
export const updateDialogs = (params: any) =>
  request({
    url: `/modify`,
    method: 'put',
    params
  })

export const deleteDialogs = (params: any) =>
  request({
    url: `/delete`,
    method: 'delete',
    params
  })

export const getPageviews = (params: any) =>
  request({
    url: '/pageviews',
    method: 'get',
    params
  })
