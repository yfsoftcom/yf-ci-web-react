import runCommand from './command.js'

const reps = {
  'yf-ci-web-react': 'www.xinyangjlm.com',
}
export default async function ( upstream, args ){
  let result = 'nothing'
  switch(upstream){
    case 'github':
      let repName = args.repository.name;
      result = await runCommand('yfcode pull ' + reps[repName])
      break;
    case 'coding':
      let repName = args.repository.name;
      result = await runCommand('yfcode pull ' + repName)
      break;
    default:
      result = 'unknow upstream'
  }
  return new Promise((resolve, reject) => {
    resolve('success : ' + result)
  })
}
