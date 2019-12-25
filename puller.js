const Spawner = require('child_process')

exports.pullRepo = (endpoint) => {
    const pullProc = Spawner.execSync('cd ' + endpoint.path + " && git pull" + endpoint.cmd.join(' && '))
    console.log(pullProc)
}