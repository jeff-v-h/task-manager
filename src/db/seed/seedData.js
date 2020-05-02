// run this file in terminal to seed data into MongoDB --> node seedData.js
const { MongoClient, ObjectID } = require('mongodb');
const bcrypt = require('bcrypt')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager-api'

const getHashedPassword = async (pw) => {
    return await bcrypt.hash(pw, 8)
}

MongoClient.connect(connectionURL, { useNewUrlParser: true }, async (error, client) => {
    if (error) {
        console.log("Unable to connect to database!")
    }

    const db = client.db(databaseName)

    db.collection('users').insertOne({
        _id: new ObjectID('5eacb3c9c5083154201e150e'),
        name: 'Jeff',
        age: 28,
        email: "jeff@mail.com",
        password: await getHashedPassword("Testpw123!")
    }, (error, result) => {
        if (error) {
            return console.log('Unable to insert user')
        }

        console.log(result.ops)
    })

    db.collection('users').insertMany([
        {
            name: "Jo",
            age: 34,
            email: "jo@fake.com",
            password: await getHashedPassword("Testpw111!")
        },
        {
            name: 'Kat',
            age: 32,
            email: "kat@example.com",
            password: await getHashedPassword("Testpw222!")
        }
    ], (error, result) => {
        if (error) {
            return console.log('Unable to insert documents')
        }

        console.log(result.ops)
    })

    db.collection('tasks').insertMany([
        {
            description: "Complete Course",
            completed: false
        },
        {
            desciption: 'Start reading book',
            completed: true
        }
    ], (error, result) => {
        if (error) {
            return console.log('Unable to insert documents')
        }

        console.log(result.ops)
    })
})