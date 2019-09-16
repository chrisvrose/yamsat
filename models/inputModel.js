const mongoose = require('mongoose')
const {playerSchema}= require('./baseModels')


const inputSchema = exports.inputSchema = new mongoose.Schema(
    {
        "college":{type:String,required:true},
        "sport":{type:String,required:true},
        "player":{type:playerSchema,required:true}
    }
)

const inputModel = exports.inputModel = mongoose.model('inputModel',inputSchema)