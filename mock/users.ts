import faker from 'faker'
import { Response, Request } from 'express'
import { UsersData } from '../src/api/types'
const userList:UsersData[]=[
  {
    user_id:'0',
    user_name:'admin',
    password:'123456',
    role:'1',//管理员
    address:'武汉',
    user_data:new Date('2023-07-25T12:34:56Z'),
    name: 'Super Admin',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    introduction: 'I am a super administrator',
    email: 'admin@test.com',
    phone: '1234567890',
    roles: ['admin']
  },
  {
    user_id:'1',
    user_name:'operator',
    password:'123456',
    role:'2',//管理员
    address:'武汉',
    user_data:new Date('2023-07-25T12:34:56Z'),
    name: 'Normal Editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    introduction: 'I am an editor',
    email: 'editor@test.com',
    phone: '1234567890',
    roles: ['editor']
  },
{
  user_id:'2',
  user_name:'auditor',
  password:'123456',
  role:'3',//审计员
  address:'武汉',
  user_data:new Date('2023-07-25T12:34:56Z'),
  name: 'Normal Editor',
  avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
  introduction: 'I am an editor',
  email: 'editor@test.com',
  phone: '1234567890',
  roles: ['operator']
  }
]

export const login = (req: Request, res: Response) => {
  const { username } = req.body
  console.log('123 ********')
  for (const user of userList) {
    if (user.user_name === username) {
      return res.json({
        code: 200,
        data: {
          accessToken: username + '-token'
        }
      })//login返回的是token
    }//
  }
  return res.status(400).json({
    code: 400,
    messaege: 'Invalid User'
  })
}

export const logout = (req: Request, res: Response) => {
  return res.json({
    code: 200
  })
}

export const getUsers = (req: Request, res: Response) => {
  const { name } = req.query
  console.log(name)
  const users = userList.filter(user => {
    const lowerCaseName = user.user_name.toLowerCase()
    return !(name && lowerCaseName.indexOf((name as string).toLowerCase()) < 0)
  })
  return res.json({
    code: 200,
    data: {
      items: users
    }
  })
}

export const getUserInfo = (req: Request, res: Response) => {
  // Mock data based on access token
  if(req.header('X-Access-Token') === 'admin-token'){
    return res.json({
      code: 200,
      data: {
        user: userList[0]
      }
    })
  }
  else if(req.header('X-Access-Token') === 'operator-token'){
    return res.json({
      code: 200,
      data: {
        user: userList[1]
      }
    })}
  else if(req.header('X-Access-Token') === 'auditor-token'){
      return res.json({
        code: 200,
        data: {
          user: userList[2]
        }
      })
  }

}

export const getUserByName = (req: Request, res: Response) => {
  const { username } = req.params
  for (const user of userList) {
    if (user.user_name === username) {
      return res.json({
        code: 200,
        data: {
          user
        }
      })
    }
  }
  return res.status(400).json({
    code: 400,
    messaege: 'Invalid User'
  })
}

export const updateUser = (req: Request, res: Response) => {
  const { username } = req.params
  const { user } = req.body
  for (const v of userList) {
    if (v.user_name === username) {
      return res.json({
        code: 200,
        data: {
          user
        }
      })
    }
  }
  return res.status(400).json({
    code: 400,
    messaege: 'Invalid User'
  })
}

export const deleteUser = (req: Request, res: Response) => {
  return res.json({
    code: 200
  })
}
