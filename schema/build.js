const mongoose = require('mongoose')

const buildSchema = new mongoose.Schema({
    output: String,
    label: String
})

exports.Model = mongoose.model('Hook Build', buildSchema)