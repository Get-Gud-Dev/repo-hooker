const Project = require('../schema/project').Model

// node ./cmd.js addcommand project command
module.exports = function(argv) {
    let label = argv[3]
    Project.findOne({label:label}, (err, res) => {
        if(err){
            console.log("Error: " + err)
            process.exit(1)
        }
        else if(res != null)
        {
            res.commands.forEach(command => {
                console.log(element)
            });
            process.exit(0)

        }
        else{
            console.log("No project found: " + label)
            process.exit(1)
        }
    })
}