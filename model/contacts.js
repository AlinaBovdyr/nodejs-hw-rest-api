const { v4: uuidv4 } = require('uuid')
const db = require('./db')

const listContacts = async () => {
  return db.get('contacts').value()
}

const getContactById = async (contactId) => {
  return db.get('contacts').find({ id: +contactId || contactId }).value()
}

const removeContact = async (contactId) => {
  const [record] = db.get('contacts').remove({ id: +contactId || contactId }).write()
  return record
}

const addContact = async (body) => {
  const id = uuidv4()
  const record = {
    id,
    ...body,
  }

  db.get('contacts').push(record).write()
  return record
}

const updateContact = async (contactId, body) => {
  const record = await db.get('contacts').find({ id: +contactId || contactId }).assign(body).value()
  db.write()
  return record.id ? record : null
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
