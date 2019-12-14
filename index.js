//requiring the required modules
const express=require('express')
const app=express();
const port=8000;
const mongoose=require('mongoose');
const db=require('./config/mongoose');
const path=require('path');
var expressLayouts = require('express-ejs-layouts');
const passport=require('passport');
const Passport_local_strategy=require('./config/passport-local-strategy');
var session = require("express-session");
var cookieParser=require('cookie-parser');
const Passport_google_strategy=require('./config/passport-google-strategy');
const MongoStore = require('connect-mongo')(session);
const flash=require('connect-flash');
const customMware=require("./config/middleware")
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
app.use(express.static("./assets"));
app.use('/uploads',express.static(__dirname+'/uploads'));

 
app.use(session({ name:"user_id",
    secret: "cats",
    saveUninitialized: true,
    resave:false,
    store:new MongoStore({
        mongooseConnection: db
    },function(err){
        if(err){
            console.log('error in connecting mongo-store');
            return;
        }
        console.log('Mongo Store is connected succesfully')
    })

,
cookie: {
maxAge:(1000*60*100) }}));
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticateduser);
app.use(flash());
app.use(customMware.setflash);
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