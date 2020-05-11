const express = require('express')
require('./db/mongoose')
const cors = require('cors')
const path = require('path')
const keys = require('./helpers/keys')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
// Path for the following YAML.load is relative to root
const swaggerDocument = YAML.load('./swagger.yaml');

const app = express()
// Allow static front-end code (including routing within) to be served
app.use(express.static(path.join(__dirname, 'static-site')));

// app.use((req, res, next) => {
//     res.send(503).send("Site is currently down. Check back soon!")
// })

const whitelist = keys.ALLOWED_ORIGINS.split(";")
const corsOptions = {
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// If API_URL environment variable is left blank, do not add specific cors function (i.e allow all websites)
if (whitelist[0].length > 0) {
    corsOptions.origin = function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use(cors(corsOptions))
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(userRouter)
app.use(taskRouter)

// All remaining paths to be serve front-end code
app.use('*', (req, res) => res.sendFile(path.join(__dirname, 'static-site', 'index.html')));

module.exports = app