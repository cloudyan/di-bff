// server.js
import * as Koa from 'koa'
// import KoaRouter from 'koa-router'
import * as render from 'koa-swig'
import * as serve from 'koa-static'
import { historyApiFallback } from 'koa2-connect-history-api-fallback'
import { createContainer, Lifetime } from 'awilix' // IOC
import { scopePerRequest, loadControllers } from 'awilix-koa'
import { join } from 'path'
import * as co from 'co'
// import configureContainer from './configureContainer'

const app = new Koa()
app.context.render = co.wrap(render({
  root: join(__dirname, 'views'),
  autoescape: true,
  cache: false, // memory disable, set to false
  ext: 'html',
  writeBody: false,
}))
app.use(serve('./assets'))

// const router = new KoaRouter()
const container = createContainer()

container.loadModules([__dirname + '/services/*.ts'], {
  formatName: 'camelCase',
  resolverOptions: {
    lifetime: Lifetime.SCOPED,
  },
})

app.use(scopePerRequest(container))
app.use(historyApiFallback({ index: '/', whiteList: ['/api'] }))
app.use(loadControllers(__dirname + '/routes/*.ts'))

// app.uses(router.routes())

app.listen(5000, () => {
  console.log('服务启动成功 at port: localhost:5000')
})
