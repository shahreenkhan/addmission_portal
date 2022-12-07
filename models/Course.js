const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
       user_id:{
        type:String,
        Required:true
       },
        name:{
        type:String,
        Required:true
    },
        email:{
        type:String,
        Required:true
    },
        number:{
        type:String,
        Required:true
    },
        address:{
        type:String,
        Required:true
    },
        gender:{
        type:String,
        Required:true
    },
        college:{
        type:String,
        Required:true
    },
        course:{
        type:String,
        Required:true
    },
        branch:{
        type:String,
        Required:true
    },
    status:{
        type:String,
        default:"pending"
    },
    comment:{
        type:String,
        default:"wait"
    }
},
{timestaps:true})
const CourseModel = mongoose.model('course',CourseSchema)

module.exports = CourseModel