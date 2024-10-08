import http from 'http'
import Koa from 'koa'
import KoaRouter from 'koa-router'
import cors from '@koa/cors'
const app = new Koa()
const router = new KoaRouter()
import bodyparser from 'koa-bodyparser'
import { SERVER_PORT } from './CONST.js'

//import { MongoClient, ObjectId } from 'mongodb'
// 连接数据库
//const client = new MongoClient('mongodb://localhost:27017')

import {initDb} from './database/db.js'
import {Todo} from './database/Todo.js'
initDb()
console.log("[Info]00 调用sqlite3初始化task_db完成")


router.post('/task/upsert', async (ctx, next) => {
  /*
  // 要操作的数据库
  const db = client.db('task-manager')
  // 要操作的表，mongodb 中叫做集合
  const collection = db.collection('task')
  */
  // post 请求的参数经 bodyparser 后放在 ctx.request.body 里
  const doc = ctx.request.body
  console.log(doc)

  console.log("[Info]01 向数据库插入数据...")
  console.log("doc.title = " + doc.title)
  const topo = new Todo(doc.title)
  topo.save()
  console.log("[Info]02 插入数据完成")

  console.log("[Info]03 返回数据库所有内容")
  console.log(topo.findAll())

  /*
  const { _id } = doc
  const result = await collection.updateOne(
    // _id 是 mongodb 默认主键名，ObjectId 可用于生成一个唯一 id
    { _id: _id || ObjectId() },
    { $set: doc },
    // upsert 表示存在则更新，不存在则插入
    { upsert: true }
  )
  */

  // 接口返回
  ctx.body = {
    doc,
    //result,
  }
})

router.get('/echo', (ctx, next) => {
  ctx.body = ctx
})

app.use(cors())
app.use(bodyparser())
app.use(router.routes())

const server = http.createServer(app.callback())
server.listen(SERVER_PORT)
console.log(`Server running at http://localhost:${SERVER_PORT}`)
