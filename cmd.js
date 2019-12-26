
const command = process.argv[2]

const db = require('./db/hookerDB')

const Project = require('./schema/project').Model

const crypto = require('crypto')

const commands = {
    addproject: require('./cmd_project/addproject'),
    addcommand: require('./cmd_project/addcommand'),
    listcommands: require('./cmd_project/listcommands'),
    listprojects: require('./cmd_project/listprojects')

}

db.connect(() =>{
    /* node project.js create :label :path :secret(opt)
    */

    let targetCommand = commands[command]

    if(targetCommand != null)
    {

        targetCommand(process.argv)


    }
    else{
        console.log("Command not found!")
        return
    }
})

