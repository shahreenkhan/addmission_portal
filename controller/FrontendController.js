const UserModel = require('../models/User')
const CourseModel = require('../models/Course')
class FrontendController{
  
    static dashboard = async(req,res)=>{
        try{
        const{_id,name,email} = req.data1
        const btech = await CourseModel.findOne({user_id:_id, course: 'B.TECH'});
        const mtech = await CourseModel.findOne({user_id:_id, course: 'M.TECH'});
        const mba = await CourseModel.findOne({user_id:_id, course: 'MBA'});
        res.render('front/dashboard', { n: name, e: email, id: _id, b: btech, m: mtech, a: mba })
        
    } catch(err){
        console.log(err)
    }
    }


    static display = async(req,res)=>{
        const{_id}=req.data1
       const data = await CourseModel.find({user_id:_id})
    //    console.log(_id)
        res.render('front/display',{d:data})
    } 
    static CourseInsert = async(req,res)=>{
        const {user_id,name , email , number , address , gender , college , branch , course } = req.body
        // console.log(req.body);

        // console.log(req.body.title);
        try{
            const result = new CourseModel({
                user_id:user_id,
                name:name,         //name k andar title define kia hai ye wo hai...
                email:email,
                number:number,
                address:address,
                gender:gender,
                college:college,
                course:course,
                branch:branch,
            })
            await result.save()  //await for no waiting.
            res.redirect('/display')     //redirect-> route ke url ka path dete hai
        }catch(err){
            console.log(err);
        }
    }

   

    static CourseView = async(req,res)=>{
        const data = await CourseModel.findById(req.params.id)
        // console.log(req.params.id)
        // console.log(data)
        // params se id get krte hai
        res.render('front/courseview',{viewdata:data})
    }

    static CourseEdit = async(req,res)=>{
        // console.log(req.params.id)
        const data = await CourseModel.findById(req.params.id)
        //console.log(data)
        res.render('front/courseedit',{editdata:data})
    }

    static CourseUpdate = async(req,res)=>{
        console.log(req.body)
        // console.log(req.params.id)
        try{
                const data = await CourseModel.findByIdAndUpdate(req.params.id,{
                name: req.body.name,
                email: req.body.email,
                mobile: req.body.mobile,
                address: req.body.address,
                gender: req.body.gender,
                college: req.body.college,
                branch: req.body.branch,
                course: req.body.course
            })
            await data.save()
            res.redirect('/display')
        }catch(err){
            console.log(err)
        }
        
    }

    static CourseDelete = async(req,res)=>{
        // console.log(req.params.id)
        try{
            const user = await CourseModel.findById(req.params.id)
            // const image_id = user.image.public_id;
            // console.log(image_id)
            // await cloudinary.uploader.destroy(image_id)
            const result = await CourseModel.findByIdAndDelete(req.params.id)
            res.redirect('/display')
        }catch(err){
            console.log(err)
        }
    }
     static Contact = async(req,res)=>{
        try{
        res.render('front/contact')
        
    } catch(err){
        console.log(err)
    }
    }

    static Gallery = async(req,res)=>{
        try{
        res.render('front/gallery')
        
    } catch(err){
        console.log(err)
    }
    }
    static About = async(req,res)=>{
        try{
        res.render('front/about')
        
    } catch(err){
        console.log(err)
    }
    }
   
  

}
module.exports = FrontendController