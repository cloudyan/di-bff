// server.js
import * as Koa from 'koa'
// import KoaRouter from 'koa-router'
import { createContainer, Lifetime } from 'awilix'
import { scopePerRequest, loadControllers } from 'awilix-koa'
// import configureContainer from './configureContainer'

const app = new Koa()
// const router = new KoaRouter()
const container = createContainer()

container.loadModules([__dirname + '/services/*.ts'], {
  formatName: 'camelCase',
  resolverOptions: {
    lifetime: Lifetime.SCOPED,
  },
})

app.use(scopePerRequest(container))
app.use(loadControllers(__dirname + '/routes/*.ts'))


// app.uses(router.routes())

app.listen(5000, () => {
  console.log('服务启动成功 at port: localhost:5000')
})
