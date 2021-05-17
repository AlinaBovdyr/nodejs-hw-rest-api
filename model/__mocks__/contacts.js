const { contacts } = require('./data')

const listContacts = jest.fn((userId, query) => {
  const { limit = 5, offset = 0 } = query
  return {contacts, total: contacts.length, limit, offset}
})

const getContactById = jest.fn((userId, contactId) => {
  const [contact] = contacts.filter((el) => String(el._id) === String(contactId))
  return contact
})

const removeContact = jest.fn((userId, contactId) => {
    const index = contacts.findIndex((el) => String(el._id) === String(contactId))
    if (index === -1) {
        return null
    }
    const [contact] = contacts.splice(index, 1)
    return contact
})

const addContact = jest.fn((userId, body) => {
  contacts.push({...body, _id: '608b1d88ef7ea210c43131cb'})
    return {...body, _id: '608b1d88ef7ea210c43131cb'}
})

const updateContact = jest.fn((userId, contactId, body) => {
    let [contact] = contacts.filter((el) => String(el._id) === String(contactId))
    if (contact) {
      contact = {...contact, ...body}
    }
    return contact
})

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}