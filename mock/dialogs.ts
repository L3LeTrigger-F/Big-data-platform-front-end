import faker from 'faker'
import { Response, Request } from 'express'
import { DialogData } from '../src/api/types'

const dialogList:DialogData[] = []
const articleCount = 100
const mockFullContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'

for (let i = 0; i < articleCount; i++) {
  dialogList.push({
    id: i.toString(),
    timestamp: new Date('2023/5/12'),
    dname: faker.name.findName(),
    description: faker.lorem.sentences(1),
    kinds: faker.random.arrayElement(['A', 'B', 'C']),
    level: faker.random.arrayElement(['A', 'B', 'C']),
    no: i,
    sname: faker.name.findName()
  })
}

export const getDialogs = (req: Request, res: Response) => {
  const { importance, type, title, page = 1, limit = 20, sort } = req.query
  // 这个应该改成什么呢
  let mockList = dialogList
  //   let mockList = dialogList.filter(item => {
  // if (importance && item.importance !== +importance) return false
  // if (type && item.type !== type) return false
  // 这个可以方便模糊匹配
  // if (title && item.title.indexOf(title as string) < 0) return false
  // return true
  // 确定排序顺序
  if (sort === '-id') {
    mockList = mockList.reverse()
  }

  const pageList = mockList.filter((_, index) => index < (limit as number) * (page as number) && index >= (limit as number) * (page as number - 1))

  return res.json({
    code: 200,
    data: {
      total: mockList.length,
      items: pageList
    }
  })
}

// export const getArticle = (req: Request, res: Response) => {
//   const { id } = req.params
//   for (const article of articleList) {
// if (article.id.toString() === id) {
//   return res.json({
// code: 200,
// data: {
//   article
// }
//   })
// }
//   }
//   return res.json({
// code: 70001,
// message: 'Article not found'
//   })
// }

export const createDialogs = (req: Request, res: Response) => {
  const { dialogs } = req.body
  return res.json({
    code: 200,
    data: {
      dialogs
    }
  })
}

export const updateDialogs = (req: Request, res: Response) => {
  const { id } = req.params
  const { dialogs } = req.body
  for (const v of dialogList) {
    if (v.id.toString() === id) {
      return res.json({
        code: 200,
        data: {
          dialogs
        }
      })
    }
  }
  return res.json({
    code: 404,
    message: 'Dialogs not found'
  })
}

export const deleteDialogs = (req: Request, res: Response) => {
  return res.json({
    code: 200
  })
}
