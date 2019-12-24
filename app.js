const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const puller = require('./puller')

const urlEncodedParser = bodyParser.urlencoded( {extended:false} )
app.use(urlEncodedParser)

// Load the endpoint configurations

var endpoints = require('./config/endpoints.json')

// Create a route for each configuration

app.post('/update/:repo', urlEncodedParser, function (req,res) {

    console.log(req.body.secret)
    console.log(req.params.repo)
    res.json({secret:req.body.secret, repo:req.params.repo})


    let endpoint = endpoints[req.params.repo]
    if(endpoint && endpoint.secret == secret )
    {
        puller.pullRepo(endpoint)
    }

})

app.listen(8080, () => {console.log("Listening on port 8080.")})