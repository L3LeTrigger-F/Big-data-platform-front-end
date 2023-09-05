import request from '@/utils/request'
import { EvidenceChainData } from './types'

export const defaultArticleData: EvidenceChainData = {
id:'0',
head_evidence_id:'1',//起始证据id
  evidence2_id:'2',
  evidence3_id:'3',
  evidence4_id:'4',
  evidence5_id:'5',
  evidence6_id:'6',
  evidence7_id:'7',
  tail_evidence_id:'tail'//终止证据id
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
