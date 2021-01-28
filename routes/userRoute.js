const express = require('express')
const router = express.Router()

const {UserController} = require('../controllers/userController')

router.get('/',UserController.welcome)
router.post('/login',UserController.login)
router.post('/register',UserController.register)
router.post('/loginCustomer',UserController.loginCustomer)

module.exports = router