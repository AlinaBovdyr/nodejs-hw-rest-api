const mongoose = require('mongoose')
const { Schema, model } = mongoose

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for the contact'],
    },
    email: {
      type: String,
    },
    phone: {
        type: String,
        required: [true, 'Set phone number for the contact'],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
)

contactSchema.path('name').validate((value) => {
  return /[A-Z]\w+/.test(String(value))
})

contactSchema.path('email').validate((value) => {
  return /([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})/.test(String(value)) // eslint-disable-line
})

contactSchema.path('phone').validate((value) => {
  return /[(][0-9]{3}[)][\s][0-9]{3}[-][0-9]{4}/.test(String(value))
})

const Contact = model('contact', contactSchema)

module.exports = Contact