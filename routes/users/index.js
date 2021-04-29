const express = require('express')
const router = express.Router()
const {
    registration,
    login,
    logout
} = require('../../controllers/users')
const {
    validationUserData,
    validationObjectId
} = require('./validation')

router.post('/signup', validationUserData, registration)
router.post('/login', validationUserData, login)
router.post('/logout', logout)

module.exports = router