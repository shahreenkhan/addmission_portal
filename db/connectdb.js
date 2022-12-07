const mongoose = require('mongoose')

const connectdb = ()=>{
    return mongoose.connect('mongodb://localhost:27017/addmission_portal')
    .then(()=>{
        console.log('connected successfully')
    }).catch((err)=>{
        console.log(err)
    })
}
module.exports = connectdb