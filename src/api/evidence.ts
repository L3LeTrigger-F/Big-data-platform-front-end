import request from '@/utils/request'
import { EvidenceData } from './types'
/* eslint-disable */
// eslint-disable-next-line
export const defaultEvidenceData: EvidenceData = {
  evi_id: '0', // 证据id
  evi_time: new Date('2023/5/12'), // 日志记录时间
  evi_source: '操作主体', // 操作主体
  evi_aim: '操作客体', // 操作客体
  evi_ope: '操作类型', // 操作类型
  evi_location: '位置', // 所在域
  evi_kind: '攻击类型', // 攻击类型
  evi_dev_name: '设备名', // 设备名
  evi_result: '操作结果', // 操作结果
  evi_log_kind: '日志归属类型', // 日志归属类型
  evi_process: '调用进程号', // 调用进程号
  evi_log_id: '1', // 原始日志记录ID
  evi_alarm_id: '2', // 对应警告信息ID
  evi_standby1: '3', // 备用属性1
  evi_standby2: '4'// 备用属性2
};

export const getEvidences = (params: any) =>
  request({
    url: '/show',
    method: 'get',
    params
  });

// export const getEvidence = (id: number, params: any) =>
//   request({
//     url: `/Evidences/${id}`,
//     method: "get",
//     params
//   });

export const createEvidence = (data: any) =>
  request({
    url: '/new',
    method: 'post',
    data
  });

export const updateEvidence = (data: any) =>
  request({
    url: '/modify',
    method: 'post',
    data
  });

export const deleteEvidence = (params: any) =>
  request({
    // url: `/Evidences/${id}`,
    url: '/delete',
    method: 'delete',
    params
  });
  export const detailArticles = (params: any) =>
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
  });
