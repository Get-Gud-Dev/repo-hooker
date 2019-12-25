const mongoose = require('mongoose')

var hookerModel = require('../schema/hookRequest').Model

var hookerCache = []


exports.connect = function(callback){

    mongoose.connect('mongodb://localhost:27017/repo-hooker', {useNewUrlParser:true, useUnifiedTopology:true})
    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'))
    db.once('open', function(){

        checkHookerCache()
        callback()
    })
    
}

function checkHookerCache(){
    if(hookerCache.length > 0)
    {
        array.forEach(element => {
            hookToDB()
        });
    }
}


//If you trust the object, write it to the database.
function hookToDB(hookObj){
    let newHookRequest = new hookerModel(hookObj)
    newHookRequest.save()
}

exports.logHook = function(type, ip, url, time, log){
    hookToDB({Type:type, IP:ip, URL:url, Time:time, Log:log})
}

