const express = require('express')
const router = express.Router()
const {
  getAll,
  getById,
  create,
  remove,
  update,
  updateStatus
} = require('../../controllers/contacts')
const {
  validationCreateContact, 
  validationUpdateContact, 
  validationUpdateStatusContact,
  validationObjectId
} = require('./validation')

router
  .get('/', getAll)
  .post('/', validationCreateContact, create)

router
  .get('/:contactId', validationObjectId, getById)
  .put('/:contactId', validationUpdateContact, update)
  .delete('/:contactId', remove)

router.patch('/:contactId/favorite', validationUpdateStatusContact, updateStatus)

module.exports = router
