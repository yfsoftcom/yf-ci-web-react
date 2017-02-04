import runCommand from './command.js'

const reps = {
  'yf-ci-web-react': 'www.xinyangjlm.com',
}
export default async function ( upstream, project, args ){
  let result = 'nothing'
  let repName
  console.log(project)
  switch(upstream){
    case 'github':
      repName = project
      result = await runCommand('yfcode pull ' + repName)
      break;
    case 'coding':
      repName = project
      result = await runCommand('yfcode pull ' + repName)
      break;
    default:
      result = 'unknow upstream'
  }

  return new Promise((resolve, reject) => {
    resolve('success : ' + result)
  })
}
