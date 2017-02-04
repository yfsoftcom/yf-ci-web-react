import runCommand from './command.js'

const reps = {
  'yf-ci-web-react': 'www.xinyangjlm.com',
}
export default async function ( upstream, args ){
  return new Promise((resolve, reject) => {
    switch(upstream){
      case 'github':
        let repName = args.repository.name;
        runCommand('yfcode pull ' + reps[repName])
        resolve('success');
        break;
      default:
        resolve('unknow upstream')
    }
  })
}
