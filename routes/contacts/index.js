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
const guard = require('../../helpers/guard')

router
  .get('/', guard, getAll)
  .post('/', guard, validationCreateContact, create)

router
  .get('/:contactId', guard, validationObjectId, getById)
  .put('/:contactId', guard, validationUpdateContact, update)
  .delete('/:contactId', remove)

router.patch('/:contactId/favorite', guard, validationUpdateStatusContact, updateStatus)

module.exports = router
