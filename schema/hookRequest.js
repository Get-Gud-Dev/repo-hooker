const mongoose = require('mongoose')

const hookRequestSchema = new mongoose.Schema(
{
    Type: String,
    IP: String,
    URL: String,
    Time: Date,
    Log: String,
    Build: {type: mongoose.Schema.Types.ObjectId, ref:"Hook Build"}
})

exports.Model = mongoose.model("Hook Request", hookRequestSchema)
 