import faker, { fake } from 'faker'
import { Response, Request } from 'express'
import { EvidenceChainData } from '../src/api/types'

const evidenceList: EvidenceChainData[] = []
const articleCount = 100
const mockFullContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'

for (let i = 0; i < articleCount; i++) {
  evidenceList.push({
    id:i.toString(),
    head_evidence_id:"head",//起始证据id
    evidence2_id:"1",
    evidence3_id:"2",
    evidence4_id:"3",
    evidence5_id:"4",
    evidence6_id:"5",
    evidence7_id:"6",
    tail_evidence_id:"tail"
  })
}


export const getArticles = (req: Request, res: Response) => {
  const { importance, type, title, page = 1, limit = 20, sort } = req.query

  let mockList = evidenceList.filter(item => {
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

export const getArticle = (req: Request, res: Response) => {
  const { id } = req.params
  for (const article of evidenceList) {
    if (article.id.toString() === id) {
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

export const createArticle = (req: Request, res: Response) => {
  const { article } = req.body
  return res.json({
    code: 200,
    data: {
      article
    }
  })
}

export const updateArticle = (req: Request, res: Response) => {
  const { id } = req.params
  const { article } = req.body
  for (const v of evidenceList) {
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

export const deleteArticle = (req: Request, res: Response) => {
  return res.json({
    code: 200
  })
}

export const getPageviews = (req: Request, res: Response) => {
  return res.json({
    code: 200,
    data: {
      pageviews: [
        { key: 'PC', pageviews: 1024 },
        { key: 'Mobile', pageviews: 1024 },
        { key: 'iOS', pageviews: 1024 },
        { key: 'Android', pageviews: 1024 }
      ]
    }
  })
}
