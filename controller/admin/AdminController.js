const CourseModel = require("../../models/Course")


class AdminController {

    static Dashboard = async (req, res) => {
        res.render('admin/dashboard')
    }

    static RegistrationDetails = async (req, res) => {
        const { _id, name, email } = req.data1
        const data = await CourseModel.find()
        res.render('admin/register_detail', { n: name, e: email, id: _id, d: data })
    }

    static viewregister_detail = async (req, res) => {
        const { _id, name, email } = req.data1
        const data = await CourseModel.findById(req.params.id)
        res.render('admin/view_registerdetail', { n: name, e: email, id: _id, d: data })

    }

    static DeleteRegistrationDetails = async (req, res) => {
        
        try {
            const DeleteData = await CourseModel.findByIdAndDelete(req.params.id, {
            })
            await DeleteData.delete()
            return res.redirect('/admin/register_detail')
        } catch (err) {
            console.log(err)
        }
    }

 static UpdateStatus = async(req,res) =>{
        try {
            const{ status,comment } = req.body
            // console.log(comment);
            // console.log(status);
            const  result= await CourseModel.findByIdAndUpdate(req.params.id,{
                status:status,
                comment:comment
            })
           await result.save()
        //  console.log(data);
            return res.redirect('/admin/register_detail');
        } catch (error) {
            console.log(error)
        }
    }


    
    static PasswordUpdate = async (req, res) => {
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

}
module.exports = AdminController