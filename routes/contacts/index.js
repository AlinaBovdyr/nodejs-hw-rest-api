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
  validationQueryContact,
  validationCreateContact, 
  validationUpdateContact, 
  validationUpdateStatusContact,
  validationObjectId
} = require('./validation')
const guard = require('../../helpers/guard')

router
  .get('/', guard, validationQueryContact, getAll)
  .post('/', guard, validationCreateContact, create)

router
  .get('/:contactId', guard, validationObjectId, getById)
  .put('/:contactId', guard, validationObjectId, validationUpdateContact, update)
  .delete('/:contactId', validationObjectId, remove)

router.patch('/:contactId/favorite', guard, validationUpdateStatusContact, updateStatus)

module.exports = router
