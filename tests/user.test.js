const request = require('supertest')
const app = require('../src/app')

test('Should signup a  new user', async () => {
    await request(app).post('/users').send({
        name: 'Jeff',
        email: 'jeffvh@outlook.com',
        password: 'MyPass123!'
    }).expect(201)
})