const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const {baseModel,baseSchema,basePlayer} = require('../models/baseModels')
const {inputModel} = require('../models/inputModel')
const {mongoDBUrl} = require('../config/generalConfig')

mongoose.connect(mongoDBUrl,{useNewUrlParser:true,useUnifiedTopology:true},err=>{
    if(err){
        console.error("E:Could not connect to mongodb server")
    }
}).then(
    ()=>{console.log("Connected to database")},
    ()=>{console.error("Something went wrong")}
)

const router = exports.playerRouter = express.Router()

//router.use(bodyParser.urlencoded({urlencoded:true}))
///Use only JSON encoding
router.use(bodyParser.json())


///TODO
router.get("/players",(req,res,next)=>{
    baseModel.find({},(err,resource)=>{
        res.json({"ok":true,...resource})
    })
    //res.json({'ok':true})
})

router.post('/players',(req,res,next)=>{
    console.log(JSON.stringify(req.body))
    //let newPlayer = new baseModel(req.body)
    inputModel(req.body).validate(err=>{
        if(err){
            console.error(`Lots of things went wrong: ${err}`)
            res.status(400).json({"okay":false,"error":"Invalid request"})
        }else{
            ///Safe to insert document into db
            console.log(`To insert ${JSON.stringify(req.body.player)}`)
            baseModel.findOneAndUpdate(
                {
                    "college":req.body.college,
                    "sport":req.body.sport
                },
                {
                    $push:{
                        players:req.body.player
                    }
                },
                {
                    "upsert":true
                },
                (err,doc,resp)=>{
                    if(err){
                        next(err)
                    }else{
                        res.status(201).json({"ok":true,"processed":req.body,"new":doc===null})
                    }
                    
                }
            )
        }
    })
})

router.get('/players/:id',(req,res,next)=>{
    console.log(req.params.id)
    baseModel.findOne(
        {
            players:{
                $elemMatch:{
                    _id:mongoose.Types.ObjectId(req.params.id)
                }
            }
        },
        (err,resource)=>{
            if(err){
                next(err)
            }else{
                res.json(resource)
            }
        }
    )
})

router.delete('/players/:id',(req,res,next)=>{
    baseModel.update(
        {},
        {
            $pull:{
                players:{
                    _id:mongoose.Types.ObjectId(req.params.id)
                }
            }
        },
        (err,raw)=>{
            if(err){
                next(err)
            }else{
                res.status(204).json({"ok":true,"ack":true})
            }
        }
    )
    next()
})

router.put("/players/:id",(req,res,next)=>{
    basePlayer(req.body).validate(err=>{
        if(err){
            res.json({"err":"invalid details"})
        }else{
            ///Validated input - req.body
            baseModel.update(
                {
                    "players._id":ObjectId("5d80ec5a89ae1556a2666dc3")
                },
                {
                    $set:{
                        "players.$":req.body
                    }
                },
                (err)=>{
                    if(err){
                        next(err)
                    }else{
                        res.json({"ok":true,"ack":"true"})
                    }
                }
            )
        }
    })
})