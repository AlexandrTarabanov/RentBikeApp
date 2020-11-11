const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bikeSchema = new Schema({
        bikename: {type: String, required: true},
        biketype: {type: String, required: true},
        bikeprice: {type: Number, required: true},
    },
    {
        timestamps: true
    })

const Bike = mongoose.model('Bike', bikeSchema)

module.exports = Bike