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

    project.findOne( {label: req.params.repo.toLowerCase()}, (err, doc) => {
        if(doc != null)
        {
            let remoteSecret = req.body['X-Hub-Signature'].split('=')[1]

            if(crypto.timingSafeEqual(Buffer.from(doc.secret, 'utf-8'), Buffer.from(remoteSecret, 'utf-8')))
            {

                let result = puller.pullRepo(doc)
                hookerLog.logHook("push", req.ip, req.originalUrl, Date.now().toString(), result)
                
                res.json({msg:"Good!"})
            }
            else
                res.json({msg: doc.secret + " \n " + req.body.secret})
        }
        else{
            res.json({msg:'What are you talking about?'})
        }
    })




})

app.post('/review', urlEncodedParser, function(req, res) {
    puller.checkBuild(req.body.url, (callback) =>{
        res.json({callback})
    })
})

hookerLog.connect(() => {
    app.listen(8080, () => {console.log("Listening on port 8080.")})

})
