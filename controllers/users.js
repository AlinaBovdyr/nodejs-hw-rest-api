const jwt = require('jsonwebtoken')
const User = require('../model/schemas/userSchema')
const Users = require('../model/users')
const HttpCode = require('../helpers/constants')

require('dotenv').config()
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const registration = async (req, res, next) => {
    const { email } = req.body
    const user = await Users.getUserByEmail(email)

    if (user) {
        return res.status(HttpCode.CONFLICT).json({
            status: 'error',
            code: HttpCode.CONFLICT,
            message: 'Email in use'
        })
    }

    try {
        const newUser = await Users.addUser(req.body)
        return res.status(HttpCode.CREATED).json({
            status: 'success',
            code: HttpCode.CREATED,
            data: {
                user: {
                    email: newUser.email,
                    subscription: newUser.subscription
                }
            }
        })
    } catch (err) {
        next(err)
    }
}

const login = async (req, res, next) => {
    const { email, password } = req.body
    const user = await Users.getUserByEmail(email)
    const isValidPassword = await user?.validPassword(password)

    if (!user || !isValidPassword) {
        return res.status(HttpCode.UNAUTHORIZED).json({
            status: 'error',
            code: HttpCode.UNAUTHORIZED,
            message: 'Email or password is wrong'
        })
    }

    const payload = { id: user.id }
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '3h' })
    await Users.updateToken(user.id, token)
    return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
            token,
            user: {
                email: user.email,
                subscription: user.subscription
            }
        }
    })
}

const logout = async (req, res, next) => {
    const id = req.user.id
    await Users.updateToken(id, null)
    return res.status(HttpCode.NO_CONTENT).json({})
}

const getCurrent = async (req, res, next) => {
    const id = req.user.id
    try {
        const user = await Users.getUserById(id)
        if (user) {
        return res.status(HttpCode.OK).json({
            status: 'success',
            code: HttpCode.OK,
            data: {
                email: user.email,
                subscription: user.subscription
            },
        })
        } else {
            return res.status(HttpCode.NOT_FOUND).json({
                status: 'error',
                code: HttpCode.NOT_FOUND,
                message: `Not found any contact with id: ${id}`,
                data: 'Not Found',
            })
        }
    } catch (e) {
        next(e)
    }
}

module.exports = {
    registration,
    login,
    logout,
    getCurrent
}