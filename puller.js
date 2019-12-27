const Build = require('./schema/build').Model

const exec = require('child_process').exec


exports.pullRepo = (endpoint) => {

    try{
        let build = new Build({output:"Build Initiated at " + Date.now().toString()})
        build.label = endpoint.label

    
   
        exec("cd " + endpoint.path +" && git pull", (error, stdout, stderr)=>{
            if(error)
            {
                build.output += error
            }

            build.output += stdout + "\n"
            build.output += stderr + "\n"

            build.save();
            console.log(stdout)
            console.log("Build saved")
        })
        
    
        return build._id
    }
    catch(e){
        console.log(e)
    }
    
    
    
}


exports.checkBuild = (label, callback) => {

    Build.find({label:label}, {}, {limit:5, sort:{'_id': -1}} , (err, res) => {
        callback(res)
    })

}