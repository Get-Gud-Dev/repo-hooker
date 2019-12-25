var mongoose = require('mongoose')

var hookerModel;

var hookerCache = []


exports.connect = function(callback){

    mongoose.connect('mongodb://localhost:27017/repo-hooker', {useNewUrlParser:true})
    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'))
    db.once('open', function(){
        hookerModel = require('../schema/hookRequest').model
        checkHookerCache()
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
    let newHookRequest = new HookRequest(hookObj)
    newHookRequest.save()
}

exports.logHook = function(type, ip, url, time, log){
    hookToDB({type:type, ip:ip, url:url, time:time, log:log})
}

