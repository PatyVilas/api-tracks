const express = require('express')
const router = express.Router()

const { loginCtrl, registerCtrl } = require('../controlles/auth')

// Login !
router.post('/login', loginCtrl)


//User registration
router.post('/register', registerCtrl)


module.exports = router