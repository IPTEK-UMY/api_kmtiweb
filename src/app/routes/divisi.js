const express = require('express')
const bodyParser = require('body-parser')
const divisiController = require('../controller/divisiController')

const divisi = express.Router()

divisi.use(bodyParser.json())
divisi.use(express.urlencoded({extended : true}))

// get all data
divisi.get('/', divisiController.getAllData)

// get data by id
divisi.get('/:id', divisiController.getDataById)

// create divisi
divisi.post('/', divisiController.createDivisi)

// update divisi
divisi.put('/:id', divisiController.updateDivisi)

// delete divisi
divisi.delete('/:id', divisiController.deleteDivisi)

module.exports = divisi