const Contacts = require('../model/contacts')

const getAll = async (req, res, next) => {
  try {
    const userId = req.user?.id
    const contacts = await Contacts.listContacts(userId, req.query)
    return res.json({
      status: 'success',
      code: 200,
      data: {contacts},
    })
  } catch (err) {
    next(err)
  } 
}

const getById = async (req, res, next) => {
  const { contactId } = req.params
  try {
    const userId = req.user?.id
    const contact = await Contacts.getContactById(userId, contactId)
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
}

const create = async (req, res, next) => {
  try {
    const userId = req.user?.id
    const contact = await Contacts.addContact(userId, req.body)
    return res.status(201).json({
      status: 'success',
      code: 201,
      data: { contact },
    })
    
  } catch (err) {
    next(err)
  } 
}

const remove = async (req, res, next) => {
  const {contactId} = req.params
  try {
    const userId = req.user?.id
    const contact = await Contacts.removeContact(userId, contactId)
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
}

const update = async (req, res, next) => {
  const { contactId } = req.params
  try {
    const userId = req.user?.id
    const contact = await Contacts.updateContact(userId, contactId, req.body)
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
}

const updateStatus = async (req, res, next) => {
  const { contactId } = req.params
  try {
    const userId = req.user?.id
    const contact = await Contacts.updateContact(userId, contactId, req.body)
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
}

module.exports = {
    getAll,
    getById,
    create,
    remove,
    update,
    updateStatus
}