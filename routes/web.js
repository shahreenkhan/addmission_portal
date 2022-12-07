const express = require('express')
const CheckUserAuth = require('../middleware/auth')
const FrontendController = require('../controller/FrontendController')
const UserController = require('../controller/UserController')
const AdminController = require('../controller/admin/AdminController')

const router = express.Router()    //Router method hai

// AdminController
router.get('/admin/dashboard',CheckUserAuth,AdminController.Dashboard)
router.get('/admin/register_detail',CheckUserAuth,AdminController.RegistrationDetails)
router.get('/admin/view_registerdetail/:id',CheckUserAuth,AdminController.viewregister_detail)
router.get('/admin/delete_register/:id',CheckUserAuth,AdminController.DeleteRegistrationDetails)
router.post('/admin/update_status/:id',CheckUserAuth,AdminController.UpdateStatus)
// router.get('/admin/admin_profile',CheckUserAuth,AdminController.)

//frontendcontroller
router.get('/dashboard',CheckUserAuth,FrontendController.dashboard)
router.get('/display',CheckUserAuth,FrontendController.display)
router.post('/course_insert',CheckUserAuth,FrontendController.CourseInsert)
router.get('/courseview/:id',CheckUserAuth,FrontendController.CourseView)
router.get('/courseedit/:id',CheckUserAuth,FrontendController.CourseEdit)
router.post('/courseupdate/:id',CheckUserAuth,FrontendController.CourseUpdate)
router.get('/course_delete/:id',CheckUserAuth,FrontendController.CourseDelete)



//usercontroller
router.get('/',UserController.AdminRegister)
router.post('/',UserController.Register)
router.post('/verify_login',UserController.VerifyLogin)
router.post('/change_password',UserController.ChangePassword)
router.get('/logout',UserController.Logout)

router.get('/admin/user_detail',CheckUserAuth,UserController.UserDetails)
router.get('/admin/viewuser_detail/:id',CheckUserAuth,UserController.ViewDetails)

// router.get('/admin/profile',CheckUserAuth,AdminController.AdminProfile)



module.exports = router