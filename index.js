//requiring the required modules
const express=require('express')
const app=express();
const port=8000;
const mongoose=require('./config/mongoose');
const path=require('path');
var expressLayouts = require('express-ejs-layouts');
const passport=require('passport');
const Passport_local_strategy=require('./config/passport-local-strategy');
var session = require("express-session");
var cookieParser=require('cookie-parser');
const Passport_google_strategy=require('./config/passport-google-strategy');
//middlewares


app.use(express.static('./assets'));
app.use(expressLayouts);
app.use(express.urlencoded());
// app.use(cookieParser);
//setting up view engine
app.set('view engine','ejs');
app.set('views','./views');
app.set("layout extractScripts", true)
app.set("layout extractStyles", true)
//passport authentication
app.use(express.static("assets"));
app.use(session({ name:"user_id",
    secret: "cats" }));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticateduser);

//routers
app.use('/',require('./routers/index'))





app.listen(port,function(err){
    if(err){
        console.log('Error in starting the server');
        return 
    }
    console.log('Express Server started succesfully :)');
    return
})