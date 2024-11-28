const express = require('express')
const divisi = require('./divisi')
const anggota = require('./anggota')
const proker = require('./proker')
const pj = require('./pj')

const app = express.Router()

app.use('/divisi', divisi)
app.use('/anggota', anggota)
app.use('/proker', proker)
app.use('/pj', pj)

app.get('/', (req, res) => {
    res.status(200).json({
        status : 200,
        message : "Berhasil Meng-akses API"
    })
})

module.exports = app