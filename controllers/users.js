const jwt = require('jsonwebtoken')
const jimp = require('jimp')
const path = require('path')
const fs = require('fs/promises')
const cloudinary = require('cloudinary').v2
const { promisify } = require('util')

const Users = require('../model/users')
const HttpCode = require('../helpers/constants')
const EmailService = require('../services/email')

require('dotenv').config()
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

const uploadToCloud = promisify(cloudinary.uploader.upload)

const registration = async (req, res, next) => {
    const user = await Users.getUserByEmail(req.body.email)

    if (user) {
        return res.status(HttpCode.CONFLICT).json({
            status: 'error',
            code: HttpCode.CONFLICT,
            message: 'Email in use'
        })
    }

    try {
        const newUser = await Users.addUser(req.body)
        const { id, name, email, subscription, avatarURL, verifyToken } = newUser
        
        try {
            const emailService = new EmailService(process.env.NODE_ENV)
            await emailService.sendVerifyEmail(verifyToken, email, name)
            
        } catch (e) {
            //logger
            console.log(e.message);
        }

        return res.status(HttpCode.CREATED).json({
            status: 'success',
            code: HttpCode.CREATED,
            data: {
                user: {
                    id,
                    name,
                    email,
                    subscription,
                    avatarURL
                }
            }
        })
    } catch (err) {
        next(err)
    }
}

const login = async (req, res, next) => {
    const user = await Users.getUserByEmail(req.body.email)
    const isValidPassword = await user?.validPassword(req.body.password)

    if (!user || !isValidPassword) {
        return res.status(HttpCode.UNAUTHORIZED).json({
            status: 'error',
            code: HttpCode.UNAUTHORIZED,
            message: 'Email or password is wrong'
        })
    }

    if (!user.verify) {
         return res.status(HttpCode.UNAUTHORIZED).json({
            status: 'error',
            code: HttpCode.UNAUTHORIZED,
            message: 'Email not verified'
        })
    }

    const payload = { id: user.id }
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '3h' })
    await Users.updateToken(user.id, token)
    const { name, email, subscription, avatarURL } = user

    return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
            token,
            user: {
                name,
                email,
                subscription,
                avatarURL
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
            const { name, email, subscription, avatarURL, verify } = user
            return res.status(HttpCode.OK).json({
                status: 'success',
                code: HttpCode.OK,
                data: {
                    name,
                    email,
                    subscription,
                    avatarURL,
                    verify
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

const updateAvatar = async (req, res, next) => {
    const { id } = req.user
    
    // const avatarURL = await saveAvatarUser(req)
    // await Users.updateAvatar(id, avatarURL)

    const { idCloudAvatar, avatarURL } = await saveAvatarToCloud(req)
    await Users.updateAvatar(id, avatarURL, idCloudAvatar)

    return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: { avatarURL },
    })
}

const saveAvatarUser = async (req) => {
    const FOLDER_AVATARS = process.env.FOLDER_AVATARS
    const pathFile = req.file.path
    const newAvatarName = `${Date.now().toString()}-${req.file.originalname}`
    const tmp = await jimp.read(pathFile)

    await tmp
        .autocrop()
        .cover(250, 250, jimp.HORIZONTAL_ALIGN_CENTER | jimp.VERTICAL_ALIGN_MIDDLE)
        .writeAsync(pathFile)
    try {
        await fs.rename(
            pathFile,
            path.join(process.cwd(), 'public', FOLDER_AVATARS, newAvatarName)
        )
    } catch (e) {
        console.log(e.message);
    }

    const oldAvatar = req.user.avatarURL
    if (oldAvatar.includes(`${FOLDER_AVATARS}/`)) {
        await fs.unlink(path.join(process.cwd(), 'public', oldAvatar))
    }

    return path.join(FOLDER_AVATARS, newAvatarName).replace('\\', '/')
}

const saveAvatarToCloud = async (req) => {
    const pathFile = req.file.path
    const { public_id: idCloudAvatar, secure_url: avatarURL } = await uploadToCloud(
        pathFile,
        {
            public_id: req.user.idCloudAvatar?.replace('Avatars/', ''),
            folder: 'Avatars',
            transformation: {width: 250, height: 250, crop: 'pad'}
        }
    )

    await fs.unlink(pathFile)
    return {idCloudAvatar, avatarURL}
}

const verify = async (req, res, next) => {
    try {
        console.log(req.params);
        const user = await Users.getUserByVerifyToken(req.params.verificationToken)

        if (user) {
            await Users.updateVerifyToken(user.id, true, null)
            return res.status(HttpCode.OK).json({
                status: 'success',
                code: HttpCode.OK,
                data: {message: 'Verification successful'},
            })
        }
        return res.status(HttpCode.BAD_REQUEST).json({
                status: 'error',
                code: HttpCode.BAD_REQUEST,
                message: 'Verification has already been passed',
        })
    } catch (error) {
        next(error)
    }
}

const repeatVerifyEmail = async (req, res, next) => {
    try {
        const user = await Users.getUserByEmail(req.body.email)
        if (user) {
            const { name, email, verifyToken } = user
            const emailService = new EmailService(process.env.NODE_ENV)
            await emailService.sendVerifyEmail(verifyToken, email, name)

            return res.status(HttpCode.OK).json({
                status: 'success',
                code: HttpCode.OK,
                data: {message: 'Verification email sent'},
            })
        }
        return res.status(HttpCode.NOT_FOUND).json({
                status: 'error',
                code: HttpCode.NOT_FOUND,
                message: 'User not found',
                data: 'Not Found',
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    registration,
    login,
    logout,
    getCurrent,
    updateAvatar,
    verify,
    repeatVerifyEmail
}