const User = require('./schemas/userSchema')

const getUserById = async (id) => await User.findById(id)
const getUserByEmail = async (email) => await User.findOne({ email })
const getUserByVerifyToken = async (token) => await User.findOne({ verifyToken: token })

const addUser = async (userOptions) => {
    const user = new User(userOptions)
    return await user.save()
}

const updateToken = async (id, token) => await User.updateOne({ _id: id }, { token })

const updateAvatar = async (id, avatar, idCloudAvatar = null) => await User.updateOne(
    { _id: id },
    { avatarURL: avatar, idCloudAvatar }
)

const updateVerifyToken = async (id, verify, verifyToken) => await User.updateOne(
    { _id: id },
    { verify, verifyToken }
)

module.exports = {
    getUserById,
    getUserByEmail,
    getUserByVerifyToken,
    addUser,
    updateToken,
    updateAvatar,
    updateVerifyToken
}
