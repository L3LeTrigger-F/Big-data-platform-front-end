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

export const getArticle = (id: number, params: any) =>
  request({
    url: `/articles/${id}`,
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
