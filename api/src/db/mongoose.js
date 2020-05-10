const mongoose = require('mongoose')
const keys = require('../helpers/keys')

mongoose.connect(keys.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useCreateIndex: true
})