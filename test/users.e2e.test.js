const request = require('supertest')
const jwt = require('jsonwebtoken')
const fs = require('fs/promises')
require('dotenv').config()

const app = require('../app')
const { User, newUser } = require('../model/__mocks__/data')


const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
const issueToken = (payload, secret) => jwt.sign(payload, secret)
const token = issueToken({ id: User.id }, JWT_SECRET_KEY)
User.token = token

jest.mock('../model/contacts.js')
jest.mock('../model/users.js')
jest.mock('cloudinary')

describe('Testing the route api/users', () => {
    describe('Should handle PATCH request', () => {
        test('Should return status 200 for PATCH: /users/avatars', async (done) => {
            const buffer = await fs.readFile('./test/sad-cat.jpg')
            const res = await request(app)
                .patch('/api/users/avatars')
                .set('Authorization', `Bearer ${token}`)
                .attach('avatar', buffer, 'sad-cat.jpg')
            expect(res.status).toEqual(200)
            expect(res.body).toBeDefined()
            expect(res.body.data.avatarURL).toEqual('secure_url_cloudinary')
            done()
        })
    })
})