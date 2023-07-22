import request from '@/utils/request'
import { EvidenceChainData } from './types'

export const defaultArticleData: EvidenceChainData = {
id:0,
evidence_head_id:0,
evidence_id:[],
evidence_tail_id:0
}

export const getArticles = (params: any) =>
  request({
    url: '/show',
    method: 'get',
    params
  })
  export const detailArticles = (params: any) =>
  request({
    url: '/detail',
    method: 'get',
    params
  })
  export const getGrammar = (params: any) =>
  request({
    url: '/show_search',
    method: 'get',
    params
  })
export const getContext=(params:any)=>
    request({
    url: '/show',
    method: 'get',
    params
  })
export const createArticle = (data: any) =>
  request({
    url: '/new',
    method: 'post',
    data
  })

export const updateArticle = (params: any) =>
  request({
    url: '/modify',
    method: 'post',
    params
  })

export const deleteArticle = (params:any) =>
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
