const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        console.log("Unable to connect to database!")
    }

    const db = client.db(databaseName)

    db.collection('users').insertOne({
        name: 'Jeff',
        age: 28
    }, (error, result) => {
        if (error) {
            return console.log('Unable to insert user')
        }

        console.log(result.ops)
    })

    db.collection('users').insertMany([
        {
            _id: new ObjectID("5eabde86c974833f54f8a522"),
            name: "Jo",
            age: 34
        },
        {
            name: 'Kat',
            age: 32
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