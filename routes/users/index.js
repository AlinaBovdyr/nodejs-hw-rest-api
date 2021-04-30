const express = require('express')
const router = express.Router()
const {
    registration,
    login,
    logout,
    getCurrent
} = require('../../controllers/users')
const {
    validationUserData
} = require('./validation')
const guard = require('../../helpers/guard')

router.post('/signup', validationUserData, registration)
router.post('/login', validationUserData, login)
router.post('/logout', guard, logout)

router.get('/current', guard, getCurrent)

module.exports = router