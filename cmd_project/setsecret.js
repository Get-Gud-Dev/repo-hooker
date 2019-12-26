const Project = require('../schema/project').Model
const crypto = require('crypto')


// node ./cmd.js addcommand project command
module.exports = function(argv) {
    let label = argv[3]
    let secret = process.argv[4] || crypto.randomBytes(64).toString('hex')
    let shaSecret = crypto.createHash("sha1").update(secret).digest('hex')
    
    Project.findOne({label:label}, (err, res) => {
        if(err){
            console.log("Error: " + err)
            process.exit(1)
        }
        else if(res != null)
        {
            res.secret = shaSecret
            res.save((err) =>{
                if(err){
                    console.log(err)
                    process.exit(1)
                }
                console.log("Secret set to : " + secret)
                process.exit(0)

            })

        }
        else{
            console.log("No project found: " + label)
            process.exit(1)
        
        }
    })
}