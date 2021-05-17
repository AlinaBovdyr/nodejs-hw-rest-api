const {User, users} = require('./data')

const getUserById = jest.fn((id) => {
    const [user] = users.filter((el) => String(el._id) === String(id))
    return user
})

const getUserByEmail = jest.fn((email) => {
    return {}
})

const addUser = jest.fn((userOptions) => {
    return {}
})

const updateToken = jest.fn((id, token) => {
    return {}
})

const updateAvatar = jest.fn((id, avatar, idCloudAvatar = null) => {
    const [user] = users.filter((el) => String(el._id) === String(id))
    user.avatar = avatar
    user.idCloudAvatar = idCloudAvatar
    return user
})

module.exports = {
    getUserById,
    getUserByEmail,
    addUser,
    updateToken,
    updateAvatar
}
