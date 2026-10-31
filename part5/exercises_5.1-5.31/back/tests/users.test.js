const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')

describe('cuando hay inicialmente un usuario en la base de datos', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('la creación falla con un código 400 si la contraseña es muy corta', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'usuarioValido',
      name: 'Test',
      password: '12'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert(result.body.error.includes('al menos 3 caracteres'))

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('la creación falla con 400 si el username ya existe', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Otro Root',
      password: 'passwordValido'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})