const Project = require('../schema/project').Model

// node ./cmd.js addcommand project command
module.exports = function(argv) {
    let label = argv[3]
    let commandText = argv[4]
    Project.findOne({label:label}, (err, res) => {
        if(err)
            console.log("Error: " + err)
        else if(res != null)
        {
            res.commands.push(commandText)
            res.save((err) =>{
                if(err){
                    console.log(err)
                    process.exit(1)
                }
                console.log("Command added to sequence: " + commandText)
                process.exit(0)
            })
        }
        else{
            console.log("No project found: " + label)
            process.exit(1)
        }
    })
}