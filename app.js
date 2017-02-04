import Koa from 'koa'
import Views from 'koa-views'
import Router from 'koa-router'
import BodyParser from 'koa-bodyparser'
import session from 'koa-session2'
import runCommand from './command.js'
import webhook from './webhook.js'
const app = new Koa()

const router = new Router()
app.use(Views(__dirname + '/views', { map: {html: 'nunjucks' }}))
app.use(BodyParser())
app.use(session({
  key: "SESSIONID",   //default "koa:sess"
}))

app.use(async (ctx, next) => {

  let path = ctx.request.url
  if(path === '/' || path === '/login' || path.indexOf('/webhook') === 0){
    await next()
  }else{
    // TODO: check login info
    let user = ctx.session.user
    if(!user){
      ctx.redirect('/login')
    }else{
      await next()
    }
  }

})

router.get('/', async function(ctx, next){
  await ctx.render('login.html')
})
router.get('/login', async function(ctx, next){
  await ctx.render('login.html')
})

router.post('/login', async function(ctx, next){
  //check pass
  let loginInfo = ctx.request.body
  ctx.response.type = 'text/json'
  if(loginInfo.name === 'admin' && loginInfo.pass === '741235896'){
    ctx.session.user = loginInfo
    ctx.response.body = {code : 0}
  }else{
    ctx.response.body = {code : -99, error: 'User Or Pass Error '}
  }
})

router.get('/main', async function(ctx, next){
  await ctx.render('main.html')
})

router.post('/execute', async function(ctx, next){
  let args = ctx.request.body
  console.log('execute：' + args.command)

  let commandText = args.command
  ctx.response.type = 'text/json'
  ctx.response.status = 200
  try{
    ctx.response.body = await runCommand(commandText);
  }catch(e){
    console.log(e)
    ctx.response.body = e
  }
})

router.post('/webhook/:upstream', async function(ctx, next){
  let result = await webhook(ctx.params.upstream, ctx.request.body)
  ctx.response.body = result
})


app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(8003)
console.log('app started at port 8003...')
