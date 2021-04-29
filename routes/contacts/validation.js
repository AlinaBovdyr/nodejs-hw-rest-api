const Joi = require('joi')
const mongoose = require('mongoose')

const schemaAddContact = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().pattern(/^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/).optional(),
  phone: Joi.string().pattern(/^[(][0-9]{3}[)][\s][0-9]{3}[-][0-9]{4}$/, 'phone').required(),
})

const schemaUpdateContact = Joi.object({
  name: Joi.string().min(3).max(30).optional(),
  email: Joi.string().pattern(/^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/).optional(),
  phone: Joi.string().pattern(/^[(][0-9]{3}[)][\s][0-9]{3}[-][0-9]{4}$/, 'phone').optional(),
}).or('name', 'email', 'phone')

const schemaUpdateStatusContact = Joi.object({
  favorite: Joi.boolean().required(),
})

const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj)
    return next()
  } catch (err) {
    console.log(err)
    
    if (err.name === 'ValidationError' && err.message.includes('phone with value')) {
      next({ status: 400, message: 'phone number must match the pattern (xxx) xxx-xxxx' })
    }

    if (err.name === 'ValidationError' && err.message.includes('email')) {
      next({ status: 400, message: 'email is not valid' })
    }

    next({ status: 400, message: err.message.replace(/"/g, "'") })
  }
}

module.exports = {
  validationCreateContact: async (req, res, next) => {
    return await validate(schemaAddContact, req.body, next)
  },
  validationUpdateContact: async (req, res, next) => {
    return await validate(schemaUpdateContact, req.body, next)
  },
  validationUpdateStatusContact: async (req, res, next) => {
    return await validate(schemaUpdateStatusContact, req.body, next)
  },
  validationObjectId: async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.contactId)) {
      return next({ status: 400, message: 'Invalid Object Id' })
    }
    next()
  },
}
