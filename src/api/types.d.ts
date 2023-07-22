import internal from "stream"

export interface EvidenceChainData {
  id:number
  evidence_head_id:number
  evidence_id:number[]
  evidence_tail_id:number

}
export interface DialogData {
  id: number
  timestamp: string | number
  dname: string
  description: string
  kinds: string
  level: string
  no: number
  sname: string
}
export interface ITransactionData {
  orderId: string
  timestamp: string | number
  username: string
  price: number
  status: string
}

export interface IUserData {
  id: number
  username: string
  password: string
  name: string
  email: string
  phone: string
  avatar: string
  introduction: string
  roles: string[]
}


export interface EvidenceData {
  id: number;
  status: string;
  title: string;
  abstractContent: string;
  fullContent: string;
  sourceURL: string;
  imageURL: string;
  timestamp: string | number;
  platforms: string[];
  disableComment: boolean;
  importance: number;
  author: string;
  reviewer: string;
  type: string;
  pageviews: number;

  src_id: string | number;
  dst_id: string | number;
  yu: string;
  type1: string;
  type2: string;
  type3: string;
  name1: string;
  result: string;
}
export interface IRoleData {
  key: string;
  name: string;
  description: string;
  routes: any;
}

