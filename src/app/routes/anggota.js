const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const anggotaController = require('../controller/anggotaController')

const anggota = express.Router()

anggota.use(bodyParser.json())
anggota.use(express.urlencoded({extended : true}))

// jangan lupa ini kalo mau upload image
const storage = multer.memoryStorage()
const upload = multer({storage})

// get all data
anggota.get('/', anggotaController.getAllData)

//get data by id
anggota.get('/:id', anggotaController.getDataByID)

// picture viewer
anggota.get('/picture/:id', anggotaController.pictureViewer)

// update data by id for teks
anggota.put('/:id', anggotaController.updateDataTeks)

// update data by id for image
anggota.put('/picture/:id', upload.single('foto'), anggotaController.updateDataImage)

// method insert
anggota.post('/', upload.single('foto'), anggotaController.insertData)

// delete data by id
anggota.delete('/:id', anggotaController.deleteData)


module.exports = anggota