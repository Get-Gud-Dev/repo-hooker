const Spawner = require('child_process')

exports.pullRepo = (endpoint) => {
    const pullProc = Spawner.execSync('cd ' + endpoint.path + " && git pull")
    console.log(pullProc)
}