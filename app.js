const express = require('express')
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
//message show krane ke liye
app.use(session({
    secret: 'secret',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
     }));
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