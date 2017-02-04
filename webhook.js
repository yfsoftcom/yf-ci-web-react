import runCommand from './command.js'

export default async function ( upstream, args ){
  console.log(args)
  return new Promise((resolve, reject) => {
    switch(upstream){
      case 'github':
        console.log(args.repository.name)
        let repName = args.repository.name;
        // runCommand('yfcode pull ' + repName)
        resolve('success');
        break;
      default:
        resolve('unknow upstream')
    }
  })
}
