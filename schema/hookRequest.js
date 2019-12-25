const mongoose = require('mongoose')

const hookRequestSchema = new mongoose.Schema(
{
    Type: String,
    IP: String,
    URL: String,
    Time: Date,
    Log: String
})

exports.Model = mongoose.model("Hook Request", hookRequestSchema)
