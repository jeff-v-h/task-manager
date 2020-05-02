// run this file in terminal to seed data into MongoDB --> node seedData.js
const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager-api'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        console.log("Unable to connect to database!")
    }

    const db = client.db(databaseName)

    db.collection('users').insertOne({
        _id: new ObjectID('5eacb3c9c5083154201e150e'),
        name: 'Jeff',
        age: 28,
        email: "jeff@mail.com",
        password: "Testpw123!"
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
            password: "Testpw111!"
        },
        {
            name: 'Kat',
            age: 32,
            email: "kat@example.com",
            password: "Testpw222!"
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