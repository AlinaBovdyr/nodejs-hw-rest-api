const Joi = require('joi')
const mongoose = require('mongoose')

const schemaUserData = Joi.object({
    email: Joi.string().pattern(/^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/).required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{7,20}$/).required(),
})

const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj)
    return next()
  } catch (err) {
    console.log(err)

    if (err.name === 'ValidationError' && err.message.includes('password' && 'fails to match the required pattern')) {
      next({ status: 400, message: 'password must be at least 7 characters long' })
    }

    next({ status: 400, message: err.message.replace(/"/g, "'") })
  }
}

module.exports = {
  validationUserData: async (req, res, next) => {
    return await validate(schemaUserData, req.body, next)
  },
  validationObjectId: async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return next({ status: 400, message: 'Invalid Object Id' })
    }
    next()
  },
}