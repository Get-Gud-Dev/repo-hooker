const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    label: String,
    path: String,
    secret: String,
    commands: [String]    
})

exports.Model = mongoose.model('Project', projectSchema)