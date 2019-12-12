//requiring the required modules
const express=require('express')
const app=express();
const port=8000;
const mongoose=require('./config/mongoose');

//middlewares

//routers
app.get('/',function(req,res){
    return res.send('Hello world');
})





app.listen(port,function(err){
    if(err){
        console.log('Error in starting the server');
        return 
    }
    console.log('Express Server started succesfully :)');
})