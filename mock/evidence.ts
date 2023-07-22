import faker from "faker";
import { Response, Request } from "express";
import { EvidenceData } from "../src/api/types";

const evidenceList: EvidenceData[] = [];
const EvidenceCount = 100;
const mockFullContent =
  '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>';

for (let i = 0; i < EvidenceCount; i++) {
  evidenceList.push({
    id: i,
    status: faker.random.arrayElement(["published", "draft"]),
    title: faker.lorem.sentence(6, 10),
    abstractContent: faker.lorem.sentences(2),
    fullContent: mockFullContent,
    sourceURL: faker.internet.url(),
    imageURL: faker.image.imageUrl(),
    timestamp: faker.date.past().getTime(),
    platforms: [
      faker.random.arrayElement(["a-platform", "b-platform", "c-platform"])
    ],
    disableComment: faker.datatype.boolean(),
    importance: faker.datatype.number({ min: 1, max: 3 }),
    author: faker.name.findName(),
    reviewer: faker.name.findName(),
    type: faker.random.arrayElement(["CN", "US", "JP", "EU"]),
    pageviews: faker.datatype.number({ min: 300, max: 500 }),

    src_id: faker.datatype.number({ min: 1, max: 3 }),
    dst_id: faker.datatype.number({ min: 1, max: 3 }),
    yu: faker.random.arrayElement(["应用层"]),
    type1: faker.random.arrayElement(["重标识"]),
    type2: faker.random.arrayElement([" sql语句日志"]),
    type3: faker.random.arrayElement(["查询"]),
    name1: faker.name.findName(),
    result: faker.name.findName()
  });
}

export const getEvidences = (req: Request, res: Response) => {
  const { importance, type, title, page = 1, limit = 20, sort } = req.query;

  let mockList = evidenceList.filter(item => {
    if (importance && item.importance !== +importance) return false;
    if (type && item.type !== type) return false;
    if (title && item.title.indexOf(title as string) < 0) return false;
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
    if (Evidence.id.toString() === id) {
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
    if (v.id.toString() === id) {
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

// export const getPageviews = (req: Request, res: Response) => {
//   return res.json({
//     code: 200,
//     data: {
//       pageviews: [
//         { key: "PC", pageviews: 1024 },
//         { key: "Mobile", pageviews: 1024 },
//         { key: "iOS", pageviews: 1024 },
//         { key: "Android", pageviews: 1024 }
//       ]
//     }
//   });
// };
