const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const puller = require('./puller')

const hookerLog = require('./db/hookerDB')
const project = require('./schema/project').Model

const crypto = require('crypto')

const urlEncodedParser = bodyParser.urlencoded( {extended:false} )
app.use(urlEncodedParser)



app.post('/update/github/:repo', urlEncodedParser, function (req,res) {

    let endpoint =  project.findOne( {label: req.params.repo.toLowerCase()}, (err, res) => {
        if(res != null && res.secret == req.body.secret )
        {
            let result = puller.pullRepo(endpoint)
            hookerLog.logHook("push", req.ip, req.originalUrl, Date.now(), result)
            res.json({msg:"Good!"})
        }
        else{
            res.json({msg:"Good"})
    
        }
    })




})

app.post('/review', urlEncodedParser, function(req, res) {
    res.json({output:puller.checkBuild(req.body.url)})
})

hookerLog.connect(() => {
    app.listen(8080, () => {console.log("Listening on port 8080.")})

})
