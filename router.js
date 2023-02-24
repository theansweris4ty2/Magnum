const express = require('express')
const router = express.Router()
const emailHandler = require('./emailhandler')

router.route('/').post(emailHandler)

module.exports = router
