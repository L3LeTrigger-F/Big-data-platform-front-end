import request from '@/utils/request'
import { RulesAssociatedData } from './types'

export const defaultRulesAssociatedData:RulesAssociatedData={
  id:0,//id序号
  relation_name:'ruleas',//规则名称
  evi_attribute:'attr',//对应证据属性
  create_time:new Date('2023-07-25T12:34:56Z'),//创建时间
  state:1,//状态
  creator:'creator',//创建者
  delete_time:new Date('2023-07-25T12:34:56Z'),//弃用时间
}

export const getRules = (params: any) =>
  request({
    url: '/show',
    method: 'get',
    params
  })
  export const detailRules = (params: any) =>
  request({
    url: '/detail',
    method: 'get',
    params
  })
export const getContext=(params:any)=>
    request({
    url: '/show',
    method: 'get',
    params
  })
export const createRules = (data: any) =>
  request({
    url: '/new',
    method: 'post',
    data
  })

export const updateRules = (params: any) =>
  request({
    url: '/modify',
    method: 'post',
    params
  })

export const deleteRules = (params:any) =>
  request({
    // url: `/articles/${id}`,
    url: '/delete',
    method: 'delete',
    params
  })

export const getPageviews = (params: any) =>
  request({
    url: '/pageviews',
    method: 'get',
    params
  })
