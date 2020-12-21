import { route, GET } from 'awilix-koa'

@route('/')
class IndexController {
  private testService;
  constructor({ testService }) {
    this.testService = testService;
  }

  @route('/')
  @GET()
  async actionIndex(ctx) {
    const result = await this.testService.getData();
    console.log('result', result)
    ctx.body = {
      result,
    }
  }
}

export default IndexController
