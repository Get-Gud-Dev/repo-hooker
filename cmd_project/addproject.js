module.exports = function(args) {

    let label = process.argv[3].toLowerCase()

    let allowedChars = "abcdefghijklmnopqrstuvwxyz1234567890-"

    for(var char in label)
    {
        if(!allowedChars.includes(label[char])){

            console.log("project names may only be alphanumerics and '-'")
            process.exit(1)
        }
    }

    let secret = process.argv[5] || crypto.randomBytes(64).toString('hex')

    let shaSecret = crypto.createHash("sha1").update(secret).digest('hex')

    let newProject = new Project({label:label, path:process.argv[4], secret:shaSecret})

    newProject.save()

    console.log("New project created:\n YOUR SECRET IS: " + secret + "DO NOT LOSE IT! " + newProject + " ")

    process.exit(0)

}