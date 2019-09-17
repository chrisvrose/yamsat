const mongoose = require('mongoose')

const playerSchema = exports.playerSchema = new mongoose.Schema(
    {
        "playerName":{ type:String,required:true},
        "age": {type:Number,required:true},
        "skill": {type:[String],required:true}
    }
)


const baseSchema = exports.baseSchema = new mongoose.Schema(
    {
        "sport": String,
        "college": String,
        "players":[playerSchema]
    }
)


const basePlayer = exports.basePlayer = mongoose.model('basePlayer',playerSchema)
const baseModel = exports.baseModel = mongoose.model('baseModel',baseSchema)