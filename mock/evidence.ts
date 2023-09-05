import faker from "faker";
import { Response, Request } from "express";
import { EvidenceData } from "../src/api/types";

const evidenceList: EvidenceData[] = [];
const EvidenceCount = 100;
const mockFullContent =
  '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>';

for (let i = 0; i < EvidenceCount; i++) {
  evidenceList.push({
    evi_id: i.toString(),
    evi_time:new Date('2023/5/12'),
    evi_source:"ope",//操作主体
    evi_aim:"aim",//操作客体
    evi_ope:"ope",//操作类型
    evi_location:"中国武汉",//所在域
    evi_kind:"ddos",//攻击类型
    evi_dev_name:"device",//设备名
    evi_result:"result",//操作结果
    evi_log_kind:"kind",//日志归属类型
    evi_process:"12",//调用进程号
    evi_log_id:"2",//原始日志记录ID
    evi_alarm_id:"3",//对应警告信息ID
    evi_standby1:"2",//备用属性1
    evi_standby2:"2",//备用属性2
  });
}

export const getEvidences = (req: Request, res: Response) => {
  const { importance, type, title, page = 1, limit = 20, sort } = req.query;

  let mockList = evidenceList.filter(item => {
    return true;
  });

  if (sort === "-id") {
    mockList = mockList.reverse();
  }

  const pageList = mockList.filter(
    (_, index) =>
      index < (limit as number) * (page as number) &&
      index >= (limit as number) * ((page as number) - 1)
  );

  return res.json({
    code: 200,
    data: {
      total: mockList.length,
      items: pageList
    }
  });
};

export const getEvidence = (req: Request, res: Response) => {
  const { id } = req.params;
  for (const Evidence of evidenceList) {
    if (Evidence.evi_id.toString() === id) {
      return res.json({
        code: 200,
        data: {
          Evidence
        }
      });
    }
  }
  return res.json({
    code: 70001,
    message: "Evidence not found"
  });
};

export const createEvidence = (req: Request, res: Response) => {
  const { Evidence } = req.body;
  return res.json({
    code: 200,
    data: {
      Evidence
    }
  });
};

export const updateEvidence = (req: Request, res: Response) => {
  const { id } = req.params;
  const { Evidence } = req.body;
  for (const v of evidenceList) {
    if (v.evi_id.toString() === id) {
      return res.json({
        code: 200,
        data: {
          Evidence
        }
      });
    }
  }
  return res.json({
    code: 70001,
    message: "Evidence not found"
  });
};

export const deleteEvidence = (req: Request, res: Response) => {
  return res.json({
    code: 200
  });
};

