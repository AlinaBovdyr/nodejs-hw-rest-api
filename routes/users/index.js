const express = require('express')
const router = express.Router()
const {
    registration,
    login,
    logout,
    getCurrent,
    updateAvatar,
    verify,
    repeatVerifyEmail
} = require('../../controllers/users')

const {
    validationUserData
} = require('./validation')

const guard = require('../../helpers/guard')
const uploadAvatar = require('../../helpers/uploadAvatar')

router.post('/signup', validationUserData, registration)
router.post('/login', validationUserData, login)
router.post('/logout', guard, logout)

router.get('/current', guard, getCurrent)
router.patch('/avatars', guard, uploadAvatar.single('avatar'), updateAvatar)

router.get('/verify/:verificationToken', verify)
router.post('/verify', validationUserData, repeatVerifyEmail)

module.exports = router