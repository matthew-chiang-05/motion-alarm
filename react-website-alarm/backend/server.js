require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const alarmRoutes = require('./routes/alarmStatus')

const app = express()
//routes
app.use('/api/alarmStatus',alarmRoutes)

//middleware
app.use(express.json())

app.use((req,res,next) => {
    console.log(req.path,req.method)
    next()
})

//connnect to db
mongoose.connect(process.env.MONGO_URI).then(() => {
    app.set('db', mongoose.connection);
    app.listen(process.env.PORT,() => {
        console.log('listening on port and connected to db', process.env.PORT)
    })
}).catch((error) => {console.log(error)})


