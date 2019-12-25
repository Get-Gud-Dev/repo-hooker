const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const puller = require('./puller')

const hookerLog = require('./db/hookerDB')


const urlEncodedParser = bodyParser.urlencoded( {extended:false} )
app.use(urlEncodedParser)

// Load the endpoint configurations

var endpoints = require('./config/endpoints.json')

// Create a route for each configuration

app.post('/update/:repo', urlEncodedParser, function (req,res) {

    
    let endpoint = endpoints[req.params.repo]
    if(endpoint != null && endpoint.secret == req.body.secret )
    {
        puller.pullRepo(endpoint)
        hookerLog.logHook("push", req.ips.join(', '), req.originalUrl, Date.now(), )
        res.json({msg:"Good!"})
    }
    else{
        res.json({msg:"Good"})

    }

})

hookerLog.connect(() => {
    app.listen(8080, () => {console.log("Listening on port 8080.")})

})
