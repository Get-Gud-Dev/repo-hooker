const Build = require('./schema/build').Model

const { exec } = require('child_process')


exports.pullRepo = (endpoint) => {

    try{
        let build = new Build({output:"Build Initiated at " + Date.now().toString()})
        build.label = endpoint.label

    
   
        exec("cd " + endpoint.path +" git pull", (error, stdout, stderr)=>{
            if(error)
            {
                build.output += error
            }

            build.output += stdout
            build.output += stderr

            build.save();
        })
        
    
        return build._id
    }
    catch(e){
        console.log(e)
    }
    
    
    
}


exports.checkBuild = (label, callback) => {

    Build.find({label:label}, {limit:5} , (err, res) => {
        callback(res || err)
        return
    })

}