const express = require('express')
const passport = require('passport')
const web =require("./routes/web")
const app = express()
const port = 3000
const fileUpload = require("express-fileupload");
const cloudinary = require('cloudinary');
app.use(fileUpload({useTempFiles: true}));
const session = require('express-session')
const flash = require('connect-flash');
const cookieParser = require('cookie-parser')
app.use(cookieParser())

// google auth
const googleStrategy = require('passport-google-oauth20')
passport.serializeUser(function(user,done){
  done(null, user)
})
passport.deserializeUser(function(user,done){
  done(null, user)
})

// 
passport.use(new googleStrategy({
    clientID:"470215120911-npmsdl5pprt3d41jlff9lv94v2t3e8mk.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:"/auth/google/callback",
    passReqToCallback:true
  },(request,accessToken,refreshToken,profile,done)=>{
    // console.log(profile)
    return done(null,profile)
   
  
  }) )
//message show krane ke liye
app.use(session({
    secret: 'secret',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
     }));
 app.use(passport.initialize())
 app.use(passport.session())   
app.use(flash());
  // connectflash and session

const bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
//database connection
const connectdb = require('./db/connectdb')
connectdb()

//Routing
app.use("/",web)
//ejs set
app.set('view engine', 'ejs')

//static file setup
app.use(express.static('public'))

//server
app.listen(port, () => {
    console.log(`Start localhost: ${port}`)
})