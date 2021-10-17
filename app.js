const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const productRouter = require('./routers/products')
const categoriesRouter = require('./routers/catergories')
const usersRouter = require('./routers/users')
const ordersRouter = require('./routers/orders')
const cors = require('cors')

require('dotenv/config')

const api = process.env.API_URL

app.use(cors())
app.options('*', cors())

//middleware
app.use(bodyParser.json())
app.use(morgan('tiny'))

//routers
app.use(`${api}/products`, productRouter)
app.use(`${api}/catergories`, categoriesRouter)
app.use(`${api}/users`, usersRouter)
app.use(`${api}/orders`, ordersRouter)

mongoose
    .connect(process.env.CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('connected')
    })
    .catch((err) => {
        console.log(err)
    })

app.listen(3000, () => {
    console.log('sserver up')
})
