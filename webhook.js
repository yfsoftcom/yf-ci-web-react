import runCommand from './command.js'

export default async function ( upstream, args ){
  console.log(args)
  return new Promise((resolve, reject) => {
    switch(upstream){
      case 'github':
        console.log(args.repository.name)
        resolve('success');
        break;
      default:
        resolve('unknow upstream')
    }
  })
}
