const Project = require('../schema/project').Model

// node ./cmd.js addcommand project command
module.exports = function(argv) {
    let label = argv[3]
    let path = argv[4]
    Project.findOne({label:label}, (err, res) => {
        if(err)
            console.log("Error: " + err)
        else if(res != null)
        {
            res.path = path
            res.save()
            console.log("Path set to : " + path)
        }
        else{
            console.log("No project found: " + label)
        }
    })
}