const contacts = [
    {
        _id : '608b1d76ef7ea210c43131c9',
        favorite : false,
        name : 'Ella',
        phone : '(123) 456-7890',
        email : 'ellf123@gmail.com'
    },
    {
        _id : '608b1d88ef7ea210c43131ca',
        favorite : false,
        name : 'Sam',
        phone : '(123) 456-7890',
        email : 'sam3@gmail.com',
    }
]

const newContact = {
    name: 'New',
    phone: '(111) 123-1234',
    email: 'new@mail.ru',
    favorite : false,
}

const User = {
    _id: '608b0c39ba8709502cf92acf',
    id : '608b0c39ba8709502cf92acf',
    subscription : 'starter',
    token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOGIwYzM5YmE4NzA5NTAyY2Y5MmFjZiIsImlhdCI6MTYyMDkzNjkyNCwiZXhwIjoxNjIwOTQ3NzI0fQ.Gq-0julahKuJGZBn3_ExNCUqfkBeOzcPFUXW4MvHc1I',
    email : 'anton@gmail.com',
    password : '$2a$06$SLi4.wSG5FZ3In1ieoWv9e6no05m1l01AvK.Jk/UEaQDduG.I9L9C',
    createdAt : '2021-04-29T19:42:49.594Z',
    updatedAt : '2021-05-13T20:16:45.750Z',
    __v : 0,
    avatarURL : 'avatars/1620937005466-sad-cat.jpeg',
    idCloudAvatar : null
}

const users = []
users[0] = User

const newUser = { email: 'test@test.com', password: '12345' }

module.exports = { contacts, newContact, User, users, newUser }