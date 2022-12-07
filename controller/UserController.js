const cloudinary = require('cloudinary').v2;
const UserModel = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const randomString = require("randomstring");



cloudinary.config({ 
    cloud_name: 'dazbzgyfu', 
    api_key: '927784744576637', 
    api_secret: 'K3fLtBgAfXBDjMJzeg4CtVL4EDM',
    secure: true
  });

class UserController{
    static AdminRegister = async(req,res)=>{
        res.render('front/register',{message:req.flash('error')})
        //  is line se message bhejte hai 
    }
    
    static Register = async(req,res)=>{
        // console.log(req.body)
        // console.log(req.files)
        // const imagefile = req.files.image
        //    console.log(imagefile)
        //     const image_upload = await cloudinary.uploader.upload(imagefile.tempFilePath,{
        //         folder: "regs_image",
        //         width:400,
        //     })
         const{name,email,password,confirm_password} =req.body;
        const admin = await UserModel.findOne({email:email})
        if(admin){
            req.flash('error','Email already exists !  please register with other email')
            return res.redirect('/')
        }
        else{
            if(name && email && password && confirm_password ){
                if(password == confirm_password){
                    try{
                        const hashpassword = await bcrypt.hash(password,10)
                        const result = await UserModel({
                            name:name,
                            email:email,
                            password:hashpassword,
                        })
                        await result.save()
                        req.flash('error','Registeration sucessfully ! please login')
                        return res.redirect('/')
                    }catch(err){
                        console.log(err)
                    }
                }
                else{
                    req.flash('error','Password does not match !')
                    return res.redirect('/')
                }
            }
            else{
                req.flash('error','All feilds are required')
                return res.redirect('/')
            }
        }
    }

    static VerifyLogin = async(req,res)=>{
        try{
            const{email,password} = req.body;
            if(email && password){
                const user = await UserModel.findOne({email:email})
                // console.log(user.password)
                if(user !=null){
                    const isMatched = await bcrypt.compare(password,user.password)
                    if((user.email === email) && isMatched){
                        if(user.role=='user'){
                             // verify token
                        const token = jwt.sign({ userId: user._id }, 'ashreen1997');
                        res.cookie('token',token)
                         // console.log(token)
                         res.redirect('/dashboard')
 
                        }
                        if(user.role=='admin'){
                             // verify token
                        const token = jwt.sign({ userId: user._id }, 'ashreen1997');
                        res.cookie('token',token)
                         // console.log(token)
                         res.redirect('/admin/dashboard')
                        }
                       
                    }else{
                        req.flash('error','Email or Password is not Valid ! ')
                        return res.redirect('/')
                    }
                
                }else{
                    req.flash('error','you are not registerd User ! ')
                    return res.redirect('/')
                }
            }else{
                req.flash('error','All Fields are require ! ')
                return res.redirect('/')
            }
        }catch(err){
            console.log(err)
        }
    }

    static Logout = async(req,res)=>{
        try{
            res.clearCookie('token')
            res.redirect('/')
        }catch(err){
            console.log(err)
        }
    }

    static Forget_Password = async(req,res)=>{
        try{
            const email = req.body.email;
            const userData = await UserModel.findOne({email:req.body.email});

            if(userData){
                const randomString = randomString.generate();
                const data = await UserModel.updateOne({email:email},{$set:{token:randomString}});
                sendResetPassword(userData.name,userData.email,randomString);

                res.status(400).send({success:false,msg:"Please check your email amd reset your Password !"})
            }
            else{
                res.status(400).send({success:false,msg:"This email does not exists !"})
            }
        }catch(err){
            console.log(err);
        }
    }
     
    static sendResetPassword = async(name, email, token)=>{
        try {
            
         const transporter =  nodemailer.createTransport({
                host:'smtp.gmail.com',
                port:587,
                secure:false,
                requireTLS:true,
                auth:{
                    user:config.emailUser,
                    pass:config.emailPassword
                }

                    });

                    const mailOptions ={
                        from:config.emailUser,
                        to:email,
                        subject:'For Reset password',
                        html:'<p> Hello '+name+', Please copy the link <a herf="?token='+token+'">and reset yourt password</a> '
                    }
                    transporter.sendMail(mailOptions,function(error,info){
                        if (error) {
                           console.log(error);
                        } else {
                            console.log("Mail has been sent:-",info.response)
                        }
                    });
        } catch (error) {
            console.log(err)
        }
    }
    // static update = async (req, res) => {
    //     try {
    //       res.render('forgotpassword', { message: req.flash('error') });
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   }
    
static ChangePassword = async (req, res) => {
          try {
          const {email, newpassword } = req.body;
          const user = await UserModel.findOne({email:email});
    
          if (user) {
            //  console.log(user._id)
            const result = await UserModel.findByIdAndUpdate(user.id, req.body);
            const salt = await bcrypt.genSalt(10);
            const newHashpaswd = await bcrypt.hash(newpassword, salt);
            await UserModel.findByIdAndUpdate(user.id, {
              $set: { password: newHashpaswd },
            });
            req.flash('error', 'Password Changed Successfully!')
            res.redirect('/')
          } else {
            req.flash('error', 'Password Does Not Matched!')
            // return res.redirect('/forgotpassword')
          }
    
        } catch (err) {
          console.log(err);
        }
    };

// user part for admin

static UserDetails = async (req, res) => {
    try {
        const { _id, name, email } = req.data1
        const data = await UserModel.find()
        res.render('admin/user_detail', { n: name, e: email, id: _id, d: data })
    } catch (error) {
        console.log(error)
    }

}

static ViewDetails = async (req, res) => {
    const { _id, name, email } = req.data1
    const data = await UserModel.findById(req.params.id)
    //console.log(data)
    res.render('admin/viewuser_detail', { n: name, e: email, id: _id, d: data })
}


}
module.exports = UserController
