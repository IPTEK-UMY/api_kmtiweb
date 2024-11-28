const db = require('../infrastructure/database/connection');
const responseAPI = require('../infrastructure/response')

// get all data
exports.getAllData = (req,res) => {
    const sql = `
SELECT 
	p.idProker, 
	p.nama_proker, 
	p.deskripsi, 
	GROUP_CONCAT(a.nama ORDER BY a.nama ASC) AS penanggungJawab 
FROM proker p 
	JOIN 
    	penanggungJawabProker r ON p.idProker = r.idProker 
	JOIN 
	    anggotadivisi a ON r.idAnggota = a.idFoto
GROUP BY p.idProker, p.nama_proker, p.deskripsi
    `

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
// get all data
exports.getDataById = (req,res) => {
    const id = req.params.id
    const sql = `
SELECT 
	p.idProker, 
	p.nama_proker, 
	p.deskripsi, 
	GROUP_CONCAT(a.nama ORDER BY a.nama ASC) AS penanggungJawab 
FROM proker p 
	JOIN 
	    penanggungJawabProker r ON p.idProker = r.idProker 
	JOIN 
	    anggotadivisi a ON r.idAnggota = a.idFoto
WHERE p.idProker = ?
GROUP BY p.idProker, p.nama_proker, p.deskripsi`

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

// insert data
exports.inserPj = (req, res) => {
    const {proker, anggota} = req.body
    const prokerSrc = 'select idProker from proker where proker = ?'
    const anggotSrc = 'select idFoto from anggotadivisi where nama = ?'
    const insert = 'insert into penanggungjawabproker(idProker, idAnggota) values (?,?)'

    db.query(prokerSrc, proker, (err, prokerID) => {
        if (err) {
            return responseAPI(500, "No Data Found", "Error saat membuat koneksi ke server", res)
        } else {
            if(prokerID.length <= 0) {
                return responseAPI(404, result, "Data tidak Ditemukan", res)
            } else {
                db.query(anggotSrc, anggota, (err, anggotaID) => {
                    if (err) {
                        return responseAPI(500, "No Data Found", "Error saat membuat koneksi ke server", res)
                    } else {
                        if(prokerID.length <= 0) {
                            return responseAPI(404, result, "Data tidak Ditemukan", res)
                        } else {
                            db.query(insert, [prokerID[0].idProker,anggotaID[0].idFoto], (err, result) => {
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
                    }
                })
            }
        }
    })
}

exports.updatePj = (req,res) => {
    const id = req.params.id
    const anggota = req.body
    const anggotaSrc = 'select idFoto from anggotadivisi where nama = ?'

    const sql = 'update penanggungjawabproker set idProker = ?, idAnggota = ? where id = ?'

    db.query(anggotaSrc, anggota, (err, anggotaID) => {
        if (err) {
            return responseAPI(500, "No Data Found", "Error saat membuat koneksi ke server", res)
        } else {
            if(anggotaID.length <= 0) {
                return responseAPI(404, result, "Data tidak Ditemukan", res)
            } else {
                            db.query(sql, [ id, anggotaID], (err, result) => {
                                if(anggotaID.length <= 0) {
                                    return responseAPI(404, result, "Data tidak Ditemukan", res)
                                } else {
                                    return  res.status(201).json({
                                        response : 201,
                                        message : "Berhasil menambah data"
                                    })
                                }
                            })
                        }
                    }
                })
}

exports.deletePj = (req, res) => {
    const id = req.params.id
    const anggota = req.body

    const anggotaSrc = 'select idFoto from anggotadivisi where nama = ?'
    const sql = 'delete from penanggungjawabproker where idProker = ? and idAnggota = ?'

    db.query(anggotaSrc, anggota, (err, anggotaID) => {
        if(err) {
            return responseAPI(500, "No Data Found", "Error saat membuat koneksi ke server", res)
        } else {
            if(anggotaID.length <= 0) {
                return responseAPI(404, result, "Data tidak Ditemukan", res)
            } else {
                db.query(sql, [id, anggotaID], (err, result) => {
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
        }
    })
}