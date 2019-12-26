const Build = require('./schema/build').Model

const { spawn } = require('child_process')


var active_builds = {}

exports.pullRepo = (endpoint) => {

    
    
    let build = new Build({output:"Build Initiated at " + Date.now().toString()})
    
    if(active_builds[endpoint.label] != null)
    {
        build.output += "A build for this path is already in progress, I'm cancelling and letting it finish"
        return;
    }

    active_builds[endpoint.label] = build

    const pullProc = spawn('cd ' + endpoint.path + " && git pull")
    
    pullProc.stdout.on('data', (data) =>{
        build.output += "\n" + data;
    })

    pullProc.stderr.on('data', (data) =>{
        build.output += "\n" + data;
    })

    pullProc.on('exit', function(){
        build.output += "\nComplete!"
        build.save((err) => {
            delete(active_builds[endpoint.label])
        })
    })
    return pullProc
}


exports.checkBuild = (label, callback) => {
    if(active_builds[label] != null){
        callback(active_builds[label].output)
        return
    }

    Build.find({label:label}, {limit:5} , (err, res) => {
        callback(res || err)
        return
    })

}