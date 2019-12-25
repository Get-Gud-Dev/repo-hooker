const Build = require('./schema/build').Model

const { spawn } = require('child_process')


var active_builds = {}

exports.pullRepo = (endpoint) => {

    
    
    let build = new Build({output:"Build Initiated at " + Date.now().toString()})
    
    if(active_builds[endpoint.path] != null)
    {
        build.output += "A build for this path is already in progress, I'm cancelling and letting it finish"
        return;
    }

    active_builds[endpoint.path] = build

    const pullProc = spawn('cd ' + endpoint.path + " && git pull &&" + endpoint.cmd.join(' && '))
    
    pullProc.stdout.on('data', (data) =>{
        build.output += "\n" + data;
    })

    pullProc.stderr.on('data', (data) =>{
        build.output += "\n" + data;
    })
    return pullProc
}


exports.checkBuild = (path, callback) => {
    if(active_builds[path] != null){
        callback(active_builds[path].output)
        return
    }

    Build.find({path:path}, {limit:5} , (err, res) => {
        callback(res || err)
        return
    })

}