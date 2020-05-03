const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()

// app.use((req, res, next) => {
//     res.send(503).send("Site is currently down. Check back soon!")
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

module.exports = app