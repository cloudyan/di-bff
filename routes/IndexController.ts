import { route, GET } from 'awilix-koa'

@route('/')
class IndexController {
  @route('/')
  @GET()
  async actionIndex(ctx) {
    ctx.body = await ctx.render('index')
  }
}

export default IndexController
