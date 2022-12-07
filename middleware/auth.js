const jwt = require('jsonwebtoken')
const usermodel = require('../models/User')

const CheckUserAuth = async(req,res,next)=>{

     const{token} = req.cookies;
     if(!token){
        req.flash('error','Unauthorized User! Please Login!')
        return res.redirect('/')
     }else{
        const verify_token = jwt.verify(token,'ashreen1997')
        // console.log(verify_token)
        const data = await usermodel.findOne({_id:verify_token.userId})
      //   console.log(data)
        req.data1 = data;
        next()
     }
    //  console.log(token)
    // console.log('Not Authorised User!')
    
}
module.exports = CheckUserAuth