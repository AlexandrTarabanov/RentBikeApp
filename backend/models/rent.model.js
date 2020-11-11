const mongoose = require('mongoose')

const Schema = mongoose.Schema

const rentSchema = new Schema({
        rentname: {type: String, required: true},
        renttype: {type: String, required: true},
        rentprice: {type: Number, required: true},
    },
    {
        timestamps: true
    })

const Rent = mongoose.model('Rent', rentSchema)

module.exports = Rent