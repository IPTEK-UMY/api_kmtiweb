const express = require('express')
const bodyParser = require('body-parser')
const prokerController = require('../controller/prokerController')

const proker = express.Router()

proker.use(bodyParser.json())
proker.use(express.urlencoded({extended : true}))

// get all data
proker.get('/', prokerController.getAllData)

// get data by id
proker.get('/:id', prokerController.getDataById)

// insert data
proker.post('/', prokerController.createProker)

// update data by id
proker.put('/:id', prokerController.createProker)

// delete data by id
proker.put('/:id', prokerController.deleteProker)

module.exports = proker