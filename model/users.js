const User = require('./schemas/userSchema')

const getUserById = async (id) => await User.findById(id)
const getUserByEmail = async (email) => await User.findOne({ email })

const addUser = async (userOptions) => {
    const user = new User(userOptions)
    return await user.save()
}

const updateToken = async (id, token) => await User.updateOne({ _id: id }, { token })
const updateAvatar = async (id, avatar, idCloudAvatar = null) => await User.updateOne(
    { _id: id },
    { avatarURL: avatar, idCloudAvatar }
)

module.exports = {
    getUserById,
    getUserByEmail,
    addUser,
    updateToken,
    updateAvatar
}
