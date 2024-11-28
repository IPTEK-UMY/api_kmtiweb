const express = require('express')
const bodyParser = require('body-parser')
const pjController = require('../controller/pjController')

const pj = express.Router()

pj.use(bodyParser.json())
pj.use(express.urlencoded({extended : true}))

// get all data
pj.get('/', pjController.getAllData)

// get data by id
pj.get('/:id', pjController.getDataById)

// create pj
pj.post('/', pjController.inserPj)

// update pj by id
pj.put('/:id', pjController.updatePj)

// delete pj by id
pj.delete('/:id', pjController.deletePj)

module.exports = pj