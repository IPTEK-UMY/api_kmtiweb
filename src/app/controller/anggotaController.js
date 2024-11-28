const db = require('../infrastructure/database/connection');
const responseAPI = require('../infrastructure/response')

// mengambil semua data anggota divisi
exports.getAllData = (req, res) => {
    const sql = 'select a.nama, a.jabatan, d.divisi from anggotadivisi a left join divisi d on a.id = d.id order by a.id asc'
    db.query(sql, (err, result) => {
        if(err) {
            return responseAPI(500, "No Data Found", "Error saat membuat koneksi ke server", res)
        } else {
            if (result.length == 0) {
                return responseAPI(404, result, "Data tidak Ditemukan", res)
            } else {
                return responseAPI(226, result, "Data Ditemukan", res)
            }
        }
    })
}

exports.getDataByID = (req,res) => {
    const id = req.params.id
    const sql = 'select a.nama, a.jabatan, d.divisi from anggotadivisi a left join divisi d on a.id = d.id where idFoto = ?'
    db.query(sql, id, (err, result) => {
        if(err) {
            return responseAPI(500, "No Data Found", "Error saat membuat koneksi ke server", res)
        } else {
            if (result.length == 0) {
                return responseAPI(404, result, "Data tidak Ditemukan", res)
            }
            return responseAPI(226, result, "Data Ditemukan", res)
        }
    })
}

// picture viewer
exports.pictureViewer = (req, res) => {
    const id = req.params.id
    const sql = 'select foto from anggotadivisi where idFoto = ?'
    db.query(sql, id, (err, result) => {
        if(err) {
            return responseAPI(500, "No Data Found", "Error saat membuat koneksi ke server", res)
        } else {
            if(result.length == 0) {
                return responseAPI(404, result, "Data tidak Ditemukan", res)
            } else {
                const foto = result[0].foto;
                res.set('Content-Type', 'image/jpeg');
                res.send(foto)
            }
        }
    })
}

// update data teks
exports.updateDataTeks = (req,res) => {
    const id = req.params.id
    const {nama, jabatan} = req.body
    const sql = 'update anggota set nama = ?, jabatan = ? where id = ?'
    db.query(sql, [nama,jabatan, id], (err,result) => {
        if(err) {
            return responseAPI(500, "No Data Found", "Error saat membuat koneksi ke server", res)
        } else {
            return  res.status(226).json({
                response : 226,
                message : "Berhasil meng-update data"
            })
        }
    })
}
// update data image
exports.updateDataImage = (req,res) => {
    const id = req.params.id
    const foto = req.file.buffer
    const linkFoto = `https://www.kmti-umy.tech/anggota/picture/${id}`
    const sql = 'update anggota set foto = ?, linkFoto = ? where id = ?'
    db.query(sql, [foto, linkFoto, id], (err,result) => {
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

// insert data
exports.insertData = (req, res) => {
    const {nama, jabatan, divisi,proker} = req.body
    // ini wajib kalo mau image ke bentuk blob dan di html form enctype="multipart/form-data"
    const foto = req.file.buffer

    const search = 'select id from divisi where singkatan = UPPER(?)'
    const insert = 'insert into anggotadivisi(nama, foto , jabatan, id) values (?,?,?,?)'
    const insertImgLink = 'update anggotadivisi set linkFoto = ? where id = ?'

    db.query(search, divisi, (err, result) => { 
        if (err) {
            return responseAPI(500, "No Data Found", "Error saat membuat koneksi ke server", res)
        } else {
            db.query(insert, [nama, foto, jabatan, result[0].id, proker], (err, insert) => {
                if(err) {
                    return responseAPI(500, "No Data Found", "Error saat membuat koneksi ke server", res)
                } else {
                    const id = result.insertId
                    const linkFoto = `https://www.kmti-umy.tech/anggota/picture/${id}`
                    db.query(insertImgLink, [linkFoto, id], (err, insertLink) => {
                        if(err) {
                            return responseAPI(500, "No Data Found", "Error saat membuat koneksi ke server", res)
                        } else {
                            return  res.status(201).json({
                                response : 201,
                                message : "Berhasil meng-insert data"
                            })
                        }
                    })
                }
            })
        }
    })
}

// delete data
exports.deleteData = (req,res) => {
    const id = req.params.id
    const sql = 'delete from anggotadivisi where id = ?'
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