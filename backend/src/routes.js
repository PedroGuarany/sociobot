const express = require('express')
const ToneController = require('./controllers/toneController')

const routes = express.Router()

routes.get('/tones', ToneController.index)
routes.post('/tones', ToneController.update)


module.exports = routes