import runCommand from './command.js'

export default async function ( params, args ){
  let result = 'nothing'
  let project = params.project
  let type = params.type
  let upstream = params.upstream
  switch(upstream){
    case 'github':
      result = await runCommand('yfcode pull -' + type + ' ' + project)
      break;
    case 'coding':
      result = await runCommand('yfcode pull -' + type + ' ' + project)
      break;
    default:
      result = 'unknow upstream'
  }

  return new Promise((resolve, reject) => {
    resolve('success : ' + result)
  })
}
