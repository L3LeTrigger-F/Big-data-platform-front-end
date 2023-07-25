import { List } from "echarts";
import internal from "stream"

//用户表
export interface UsersData{
  user_id: string;//用户id
  user_name: string;//登录用户名
  password: string;//用户密码
  role:'1'|'2'|'3';//用户角色。1代表管理员，2代表普通用户,3是审计员
  address:string;//所在地区
  user_data:Date;//创建时间
  name:string;
  email:string;
  phone:string;
  avatar:string;
  introduction:string
  roles:any;
}
//日志泛化表
export interface DialogData {
  id: string;
  timestamp: Date;
  dname: string;
  description: string;
  kinds: string;
  level: string;
  no: number;
  sname: string;
}
// 预警信息表
export interface AlarmData {
  alarm_id: number;//预警id
  time: Date;//预警时间
  source: string;//来源
  attack_type: number;//攻击类型
  description:string;//描述
}
// 证据表
export interface EvidenceData {
  evi_id: string;//证据id
  evi_time:Date;//日志记录时间
  evi_source:string;//操作主体
  evi_aim:string;//操作客体
  evi_ope:string;//操作类型
  evi_location:string;//所在域
  evi_kind:string;//攻击类型
  evi_dev_name:string;//设备名
  evi_result:string;//操作结果
  evi_log_kind:string;//日志归属类型
  evi_process:string;//调用进程号
  evi_log_id:string;//原始日志记录ID
  evi_alarm_id:string;//对应警告信息ID
  evi_standby1:string;//备用属性1
  evi_standby2:string;//备用属性2
}
//关联规则表
export interface RulesAssociatedData {
  id:number;//id序号
  relation_name:string;//关联规则名称
  evi_attribute:string;//对应证据属性
  create_time:Date;//创建时间
  state:number;//状态
  creator:string;//创建者
  delete_time:Date;//弃用时间
}
//证据关联表
export interface EvidenceRelationData {
  id:string;//唯一标识
  relation_rule_id:string;//关联规则id
  main_evidence_id:string;//交叉认证的主证据id
  evidence_arr:string;//交叉认证后的关联性证据的id数组
  alarm_id:string;//对应的预警信息
  create_time:Date;//创建时间
  state:1|0;//状态
  creator:string;//创建者
  delete_time:string;//弃用时间

}
//证据链表
export interface EvidenceChainData {
  id:string;//id序号
  head_evidence_id:string;//起始证据id
  evidence2_id:string;
  evidence3_id:string;
  evidence4_id:string;
  evidence5_id:string;
  evidence6_id:string;
  evidence7_id:string;
  tail_evidence_id:string;//终止证据id
}
export interface IRoleData{
  key: string;
  name: string;
  description: string;
  routes: any
}


