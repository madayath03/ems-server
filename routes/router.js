const express = require('express')
const router = new express.Router()
const userController = require("../controllers/userController")
const upload = require('../multerConfig/storageConfig')

// logic for register
router.post('/employee/register',upload.single('user_profile'),userController.userRegister)

// route for getalluser
router.get('/get-all-employees', userController.getallusers)

// view user
router.get('/employee/view/:id', userController.getuserdetail)

// del user
router.delete('/employee/delete/:id', userController.deleteUser)

// edit user
router.put('/employee/edit/:id', upload.single('user_profile'), userController.editUser)

// edit status
router.put('/employee/edit/status/:id', userController.editStatus)
module.exports = router