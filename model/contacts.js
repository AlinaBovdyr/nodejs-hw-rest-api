const Contacts = require('./contactSchema')

const listContacts = async () => await Contacts.find()

const getContactById = async (contactId) => await Contacts.findById(contactId)

const removeContact = async (contactId) => await Contacts.findByIdAndRemove(contactId)

const addContact = async (body) => {
  const contacts = await Contacts.find()
  const existedContact = contacts.some(({ name }) => name === body.name)
    
  if (existedContact) {
    throw new Error(`The contact with name ${body.name} is exist`)
  }
  
  return await Contacts.create(body)
}

const updateContact = async (contactId, body) => {
  const result = await Contacts.findByIdAndUpdate(
    contactId,
    { ...body },
    { new: true }
  )
  return result
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
