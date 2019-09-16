const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const {playerRouter} = require('./routes/player')
const {portNumber,mongoDBUrl} = require('./config/generalConfig')


const app = express()

app.use(bodyParser.urlencoded())

app.get('/',(req,res,next)=>{
    res.json({
        'ok':true,
        '_links':[
            '/players'
        ]
    })
})

app.use(playerRouter)

app.get("/sanity",(req,res,next)=>{
    res.json({"ok":true})
})

///Catch everything falling through the routes
app.all('*',(req,res)=>{
    console.log(`W:Accessing ${req.url}`)
    res.status(404).json({'ok':false,'error':'Invalid route'})
})

app.use((err,req,res,next)=>{
    if(err){
        res.status(500).json({ok:false,error:"Internal error"})
        console.err(err)
        //res.next()
    }
    else{
        console.log("W:Error handler called without error")
    }
})


app.listen(portNumber,()=>{
    console.log(`Special stuff on ${portNumber}`)
})