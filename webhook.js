import runCommand from './command.js'

export default async function ( upstream, args ){
  console.log(args)
  return new Promise((resolve, reject) => {
    switch(upstream){
      case 'github':
        console.log('github ')

        resolve('success');
        break;
    }
  })
}
