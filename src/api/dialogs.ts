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
    url: '/dialogs',
    method: 'get',
    params
  })

export const createDialogs = (params: any) =>
  request({
    url: '/dialogs',
    method: 'post',
    params
  })
export const getArticle = (id: number, params: any) =>
  request({
    url: `/articles/${id}`,
    method: 'get',
    params
  })

export const createArticle = (data: any) =>
  request({
    url: '/articles',
    method: 'post',
    data
  })

export const updateDialogs = (id: number, data: any) =>
  request({
    url: `/dialogs/${id}`,
    method: 'put',
    data
  })

export const deleteArticle = (id: number) =>
  request({
    url: `/articles/${id}`,
    method: 'delete'
  })

export const getPageviews = (params: any) =>
  request({
    url: '/pageviews',
    method: 'get',
    params
  })
