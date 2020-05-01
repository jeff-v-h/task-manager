const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const getUsers = (db) => {
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
}

const updateUsers = (db) => {
    db.collection('users').updateOne({
        _id: new ObjectID("5eabde86c974833f54f8a522")
    }, {
        $set: {
            name: 'Joanna'
        },
        $inc: {
            // increases age by 1
            age: 1
        }
    }).then(result => {
        console.log(result)
    }).catch(error => {
        console.log(error)
    })
}

const updateTasks = (db) => {
    db.collection('tasks').updateMany({
        completed: false
    }, {
        $set: {
            completed: true
        }
    }).then(result => {
        console.log(result.modifiedCount)
    }).catch(error => {
        console.log(error)
    })
}

const deleteUsers = (db) => {
    db.collection('users').deleteMany({
        age: 36
    }).then(result => {
        console.log(result.deletedCount)
    }).catch(error => {
        console.log(error)
    })
}

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        console.log("Unable to connect to database!")
    }

    const db = client.db(databaseName)
    // getUsers(db)
    updateUsers(db);
    updateTasks(db);
    deleteUsers(db);
})