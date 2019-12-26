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
            res.save()
            console.log("Command added to sequence: " + commandText)
        }
        else{
            console.log("No project found: " + label)
        }
    })
}