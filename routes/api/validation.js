const Joi = require('joi')

const schemaAddContact = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  phone: Joi.string().pattern(/^[(][0-9]{3}[)][\s][0-9]{3}[-][0-9]{4}$/, 'phone').required(),
})

const schemaUpdateContact = Joi.object({
  name: Joi.string().min(3).max(30).optional(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).optional(),
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
}
