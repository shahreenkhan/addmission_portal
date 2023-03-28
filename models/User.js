const mongoose = require('mongoose')

const UserSchema =new mongoose.Schema({
    name:{
        type:String,
        Required:true
    },
    email:{
        type:String,
        Required:true
    },
    password:{
        type:String,
        Required:true
    },
//     image:{
//         public_id:{  
//             // image ka unique name aayega....image ki id aajaygi
//         type:String,
//         Required:true
//     },
//     url:{
//         type:String,
//         Required:true
//     },
// },

    role:{
        type:String,
        default:'user'
    },
    resetLink:{
        data:String,
        default:''
    },
    // token:{
    //     type:String,
    //     default:''

    // }
    


},
{timestaps:true})
const UserModel = mongoose.model('User',UserSchema)

module.exports = UserModel