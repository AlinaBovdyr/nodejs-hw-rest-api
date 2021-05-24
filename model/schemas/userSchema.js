const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
const { nanoid } = require('nanoid')

const { Schema, model } = mongoose
const SALT_FACTOR = 6

const userSchema = new Schema(
  {
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate(value) {
            const re = /([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})/
            return re.test(String(value).toLowerCase())
        },
    },
    name: {
        type: String,
        default: 'Guest',
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: {
        type: String,
        default: null,
    },
    avatarURL: {
        type: String,
        default: function () {
            return gravatar.url(this.email, {s: '250'}, true)
        }
    },
    idCloudAvatar: {
        type: String,
        default: null
        },
    verify: {
        type: Boolean,
        default: false,
    },
    verifyToken: {
        type: String,
        required: [true, 'Verify token is required'],
        default: nanoid()
    },
  },
  { timestamps: true },
)

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(SALT_FACTOR)
        this.password = await bcrypt.hash(this.password, salt)
    }
    next()
})

userSchema.methods.validPassword = async function(password) {
    return await bcrypt.compare(String(password), this.password)
}

const User = model('user', userSchema)

module.exports = User