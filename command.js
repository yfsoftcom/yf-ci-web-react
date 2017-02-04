import Process from 'child_process'

const os = process.platform

const options = {
    encoding: 'utf8',
    timeout: 0,
    maxBuffer: 200 * 1024,
    killSignal: 'SIGTERM',
    setsid: false,
    cwd: null,
    env: null
};

export default async function ( command ){
  // 捕获标准输出并将其打印到控制台
  console.log('run :' + command)
  return new Promise((resolve, reject) => {
    Process.exec(command, options, function(e, stdout, stderr){
      if(e){
        console.log(e)
        reject( {data: stderr })
      }else{
        resolve( {data: stdout })
      }
    })
  })
}
