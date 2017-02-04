import Koa from 'koa'
import Views from 'koa-views'
import Router from 'koa-router'
import BodyParser from 'koa-bodyparser'
import session from "koa-session2"
import Process from 'child_process'

const os = process.platform
const spawn = Process.spawn

const app = new Koa()

const router = new Router()
app.use(Views(__dirname + '/views', { map: {html: 'nunjucks' }}))
app.use(BodyParser())
app.use(session({
  key: "SESSIONID",   //default "koa:sess"
}))
app.use(async (ctx, next) => {

  let path = ctx.request.url
  if(path === '/' || path === '/login'){
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
  let arr = commandText.split(' ')
  let c = arr[0]
  arr.splice(0, 1)
  let command = {}
  ctx.response.type = 'text/json'
  ctx.response.status = 200
  try{
    if(os === 'win32'){
      command = spawn('cmd.exe', ['\s', '\c',c,'D:'])
    }else{
      command = spawn(c,arr)
    }
    ctx.response.body = await runCommand(command);
  }catch(e){
    console.log(e)
    ctx.response.body = e
  }
})


async function runCommand( command ){
  // 捕获标准输出并将其打印到控制台
  return new Promise((resolve, reject) => {
    command.stdout.on('data', function (data) {
      console.log('ok')
      console.log(data)
      resolve( {data: data.toString() })
    })
    command.stderr.on('data', function (data) {
      console.log('error')
      console.log(data)
      reject( {data: data.toString() })
    })
    command.on('exit', function (code, signal) {
      if(code === 0){
        //exit normal
      }else{
        console.log(signal)
      }

    })
  })
}


app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(8003)
console.log('app started at port 8003...')
