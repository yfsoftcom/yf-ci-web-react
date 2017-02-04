import runCommand from './command.js'

const reps = {
  'yf-ci-web-react': 'www.xinyangjlm.com',
}
export default async function ( upstream, args ){
  let result = 'nothing'
  let repName;
  switch(upstream){
    case 'github':
      repName = args.repository.name;
      result = await runCommand('yfcode pull ' + reps[repName])
      break;
    case 'coding':
      repName = args.repository.name;
      result = await runCommand('yfcode pull ' + repName)
      break;
    default:
      result = 'unknow upstream'
  }
  return new Promise((resolve, reject) => {
    resolve('success : ' + result)
  })
}
