const express = require('express')
const app = express()
require('dotenv').config()
const router = require('./router')
const port = process.env.PORT || 3000
app.use(express.json())
app.use(express.static('./public'))
app.use('/magnum-towers', router)
app.listen(port, () => console.log(`Server is listening on port ${port}`))
