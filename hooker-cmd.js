
const command = process.argv[2]

const db = require('./db/hookerDB')

const commands = {
    addproject: require('./commands/addproject'),
    addcommand: require('./commands/addcommand'),
    listcommands: require('./commands/listcommands'),
    listprojects: require('./commands/listprojects'),
    setpath: require('./commands/setpath'),
    setsecret: require('./commands/setsecret')

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
        process.exit(1)
    }
})

