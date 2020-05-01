const { MongoClient } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        console.log("Unable to connect to database!")
    }

    const db = client.db(databaseName)

    db.collection('users').findOne({ name: "Jeff", age: 28 }, (error, user) => {
        if (error) {
            return console.log('Unable to fetch')
        }

        console.log(user)
    })

    // find() by itself returns a cursor rather than object or list of data.
    // Follow-up methods will determine what to do with cursor
    db.collection('users').find({ age: 27 }).toArray((error, users) => {
        console.log(users)
    })

    db.collection('users').find({ age: 27 }).count((error, users) => {
        console.log(users)
    })
})