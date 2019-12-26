const Project = require('../schema/project').Model

// node ./cmd.js addcommand project command
module.exports = function(argv) {
    let label = argv[3]
    let path = argv[4]
    Project.findOne({label:label}, (err, res) => {
        if(err){
            console.log("Error: " + err)
            process.exit(1)
        }
        else if(res != null)
        {
            res.path = path
            res.save((err, res) =>{
                if(err){
                    console.log(err)
                    process.exit(1)
                }
                    
                console.log("Path set to : " + path)
                process.exit(0)
            })

        }
        else{
            console.log("No project found: " + label)
            process.exit(1)
        
        }
    })
}