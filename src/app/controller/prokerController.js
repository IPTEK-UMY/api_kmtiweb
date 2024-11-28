const db = require('../infrastructure/database/connection');
const responseAPI = require('../infrastructure/response')

// get all data
exports.getAllData = (req,res) => {
    const sql = 'select * from proker order by divisi asc'

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
    const sql = 'select * from proker where idProker = ?'
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

// create proker
// khusus bagian divisi yang disubmit nama divisi saja, id divisi akan auto ditambah oleh sistem
exports.createProker = (req,res) => {
    const{proker, deskripsi, divisi} = req.body
    console.log(req.body)
    const srcDivisiId = 'select id from divisi where divisi = ?'
    const sql = 'insert into proker(nama_proker, deskripsi, divisi) values (?,?,?)'
    db.query(srcDivisiId, divisi, (err, divisiID) => {
        console.log(divisiID)
        if (err) {
            return responseAPI(500, "No Data Found", "Error saat membuat koneksi ke server", res)
        } else {
           db.query(sql, [proker, deskripsi, divisiID[0].id], (err, result) => {
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
    })
}

// update proker
exports.updateProker = (req,res) => {
    const id = req.params.id
    const {proker, deskripsi, divisi} = req.body
    const sql = 'update proker set nama_proker = ?, deskripsi = ?, divisi = ? where idProker = ?'
    db.query(sql, [proker, deskripsi, divisi, id], (err,result) => {
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

// delete proker
exports.deleteProker = (req,res) => {
    const id = req.params.id
    const sql = 'delete from proker where idProker = ?'
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
