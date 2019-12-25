
const command = process.argv[2]

const db = require('./db/hookerDB')

const Project = require('./schema/project').Model

const crypto = require('crypto')

db.connect(() =>{
    /* node project.js create :label :path :secret(opt)
    */
    console.log(process.argv)

    if(command === "create")
    {
        let label = process.argv[3].toLowerCase()

        let allowedChars = "abcdefghijklmnopqrstuvwxyz1234567890-"

        for(var char in label)
        {
            if(!allowedChars.includes(label[char]))
                console.log("project names may only be alphanumerics and '-'")
                return
        }

        let secret = argv[5] || crypto.randomBytes(64).toString('hex')

        let shaSecret = crypto.createHash("sha1").update(secret).digest('hex')

        let newProject = new Project({label:label, path:process.argv[4], shaSecret})

        newProject.save()

        console.log("New project created:\n YOUR SECRET IS: " + secret + "DO NOT LOSE IT! " + newProject + " ")

    }
})

