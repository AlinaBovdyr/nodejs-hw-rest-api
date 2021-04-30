const Contacts = require('./schemas/contactSchema')

const listContacts = async (userId, query) => {
  const {
    sortBy,
    sortByDesc,
    filter,
    favorite = null,
    limit = 5,
    page = 1,
    offset = 0,
  } = query

  const optionsSearch = { owner: userId }

  if (favorite !== null) {
    optionsSearch.favorite = favorite
  }
  
  const results = await Contacts.paginate(optionsSearch, {
    page,
    limit,
    offset,
    sort: {
      ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
      ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
    },
    select: filter ? filter.split('|').join(' ') : '',
    populate: {
      path: 'owner',
      select: 'email subscription -_id',
    },
  })

  return results
}

const getContactById = async (userId, contactId) => {
  const result = await Contacts.findById(contactId, { owner: userId }).populate({
    path: 'owner',
    select: 'email subscription -_id',
  })

  return result
}

const removeContact = async (userId, contactId) => await Contacts.findByIdAndRemove(contactId, {owner: userId})

const addContact = async (userId, body) => {
  const {name} = body
  const existedContact = await Contacts.findOne({name})
    
  if (existedContact) {
    throw new Error(`The contact with name ${name} is exist`)
  }
  
  return await Contacts.create({ ...body, owner: userId })
}

const updateContact = async (userId, contactId, body) => {
  const result = await Contacts.findByIdAndUpdate(
    contactId,
    { ...body, owner: userId },
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
