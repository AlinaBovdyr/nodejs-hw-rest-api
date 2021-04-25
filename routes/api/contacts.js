const express = require('express')
const router = express.Router()
const Contacts = require('../../model/contacts')
const {
  validationCreateContact, 
  validationUpdateContact, 
  validationUpdateStatusContact,
  validationObjectId
} = require('./validation')

router.get('/', async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts()
    return res.json({
      status: 'success',
      code: 200,
      data: {contacts},
    })
  } catch (err) {
    next(err)
  } 
})

router.get('/:contactId', validationObjectId, async (req, res, next) => {
  const { contactId } = req.params
  try {
    const contact = await Contacts.getContactById(contactId)
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        data: {
          contact,
        },
      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found any contact with id: ${contactId}`,
        data: 'Not Found',
      })
    }
  } catch (e) {
    next(e)
  }
})

router.post('/', validationCreateContact, async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body)
    return res.status(201).json({
      status: 'success',
      code: 201,
      data: { contact },
    })
    
  } catch (err) {
    next(err)
  } 
})

router.delete('/:contactId', async (req, res, next) => {
  const {contactId} = req.params
  try {
    const contact = await Contacts.removeContact(contactId)
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        data: {
          contact,
        },
      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found any contact with id: ${contactId}`,
        data: 'Not Found',
      })
    }
  } catch (e) {
    next(e)
  }
})

router.put('/:contactId', validationUpdateContact, async (req, res, next) => {
  const { contactId } = req.params
  try {
    const contact = await Contacts.updateContact(contactId, req.body)
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        data: {
          contact,
        },
      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found any contact with id: ${contactId}`,
        data: 'Not Found',
      })
    }
  } catch (e) {
    next(e)
  }
})

router.patch('/:contactId/favorite', validationUpdateStatusContact, async (req, res, next) => {
  const { contactId } = req.params
  try {
    const contact = await Contacts.updateContact(contactId, req.body)
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        data: {
          contact,
        },
      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found any contact with id: ${contactId}`,
        data: 'Not Found',
      })
    }
  } catch (e) {
    next(e)
  }
})

module.exports = router
