import faker, { fake } from 'faker'
import { Response, Request } from 'express'
import { RulesAssociatedData } from '../src/api/types'

const rulesAssociatedList: RulesAssociatedData[] = []
const articleCount = 100
const mockFullContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'

for (let i = 0; i < articleCount; i++) {
  rulesAssociatedList.push({
    id:i,
    relation_name:"relation_name",//关联规则名称
    evi_attribute:"attribute",//对应证据属性
    create_time:new Date('2023/5/12'),//创建时间
    state:1,//状态
    creator:"creator",//创建者
    delete_time:new Date('2023/5/12')//弃用时间
  })
}


export const getRules = (req: Request, res: Response) => {
  const { importance, type, title, page = 1, limit = 20, sort } = req.query

  let mockList = rulesAssociatedList.filter(item => {
    // if (importance && item.importance !== +importance) return false
    // if (type && item.type !== type) return false
    // if (title && item.title.indexOf(title as string) < 0) return false
    return true
  })

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

export const createRules = (req: Request, res: Response) => {
  const { article } = req.body
  return res.json({
    code: 200,
    data: {
      article
    }
  })
}

export const updateRules = (req: Request, res: Response) => {
  const { id } = req.params
  const { article } = req.body
  for (const v of rulesAssociatedList) {
    if (v.id.toString() === id) {
      return res.json({
        code: 200,
        data: {
          article
        }
      })
    }
  }
  return res.json({
    code: 70001,
    message: 'Article not found'
  })
}

export const deleteRules= (req: Request, res: Response) => {
  return res.json({
    code: 200
  })
}
