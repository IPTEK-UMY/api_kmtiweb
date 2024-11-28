const db = require('../infrastructure/database/connection');
const responseAPI = require('../infrastructure/response')

// get all data
exports.getAllData = (req,res) => {
    const sql = 'select * from divisi order by id asc'
    db.query(sql, (err, result) => {
        if(err) {
            return responseAPI(500, "No Data Found", "Error saat membuat koneksi ke server", res)
        } else {
            if(result.length == 0) {
                return responseAPI(404, result, "Data tidak Ditemukan", res)
            } else {
                return responseAPI(226, result, "Data Ditemukan", res)
            }
        }
    })
}

// get data by id
exports.getDataById = (req,res) => {
    const id = req.params.id
    const sql = 'select * from divisi where id = ?'
    db.query(sql, id, (err, result) => {
        if(err) {
            return responseAPI(500, "No Data Found", "Error saat membuat koneksi ke server", res)
        } else {
            if(result.length == 0) {
                return responseAPI(404, result, "Data tidak Ditemukan", res)
            } else {
                return responseAPI(226, result, "Data Ditemukan", res)
            }
        }
    })
}

// create divisi
exports.createDivisi = (req,res) => {
    const{divisi, singkatan} = req.body
    const sql = 'inser into divisi(divisi, singkatan) values (?,?)'
    db.query(sql, [divisi, singkatan], (err, result) => {
        if (err) {
            return responseAPI(500, "No Data Found", "Error saat membuat koneksi ke server", res)
        } else {
            return  res.status(201).json({
                response : 201,
                message : "Berhasil menambah data"
            })
        }
    })
}

// update divisi
exports.updateDivisi = (req,res) => {
    const id = req.params.id
    const {divisi, singkatan} = req.body
    const sql = 'update divisi set divisi = ?, singkatan = ? where id = ?'
    db.query(sql, [divisi, singkatan,id], (err,result) => {
        if(err) {
            return responseAPI(500, "No Data Found", "Error saat membuat koneksi ke server", res)
        } else {
            return  res.status(201).json({
                response : 201,
                message : "Berhasil meng-update data"
            })
        }
    })
}

// delete divisi
exports.deleteDivisi = (req,res) => {
    const id = req.params.id
    const sql = 'delete from divisi where id = ?'
    db.query(sql, id, (err,result) => {
        if(err) {
            return responseAPI(500, "No Data Found", "Error saat membuat koneksi ke server", res)
        } else {
            return  res.status(410).json({
                response : 410,
                message : "Berhasil meng-hapus data"
            })
        }
    })
}