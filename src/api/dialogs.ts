import request from '@/utils/request'
import { DialogData } from './types'

export const defaultDialogsData: DialogData = {
  id: '0',
  timestamp: new Date('2023/5/12'),
  dname: '1',
  description: '2',
  kinds: '3',
  level: '4',
  no: 0,
  sname: '5'
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
  export const detailDialogs = (params: any) =>
  request({
    url: '/detail',
    method: 'get',
    params
  })

export const getPageviews = (params: any) =>
  request({
    url: '/pageviews',
    method: 'get',
    params
  })
