const mongoose = require('mongoose')

const hookRequestSchema = 
{
    Type: String,
    IP: String,
    URL: String,
    Time: Date,
    Log: String
}

exports.Model = mongoose.Model("Hook Request", hookRequestSchema)
