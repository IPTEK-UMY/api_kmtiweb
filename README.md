#Route dan Method CRUD

- data anggota divisi

	> CREATE
		route : /anggota
		method : POST
		
		name yang harus di set pada form : nama, jabatan, divisi, foto

	> READ
		$Anggota all
			route : /anggota
			method : GET

		$Anggota by id
			route : /anggota/:id
			method : GET

		$image
			route : /picture/:id
			method : GET

	> UPDATE
		route : /anggota/:id
		method : PUT

	> DELETE
		route : /anggota/:id
		method : DELETE

- data divisi

	> CREATE
		route : /divisi
		method : POST
		
		name yang harus di set pada form : divisi

	> READ
		$divisi all
			route : /divisi
			method : GET
		$divisi by id
			route : /divisi/:id
			method : GET

	> UPDATE
		route : /divisi/:id
		method : PUT

	> DELETE
		route : /divisi/:id
		method : DELETE

- data proker

	> CREATE
		route : /proker
		method : POST
		
		name yang harus di set pada form : proker, divisi(foreign key)

	> READ
		$divisi all
			route : /proker
			method : GET
		$divisi by id
			route : /proker/:id
			method : GET

	> UPDATE
		route : /proker/:id
		method : PUT

	> DELETE
		route : /proker/:id
		method : DELETE

- peningkatan berikutnya : 
	1. memperbaiki kekurangan dari yang sudah ada dalam CREATE, UPDATE, dan DELETE
	2. mencari data api berdasarkan nama untuk READ data
	3. mencari data api berdasarkan nama divisi lalu menampilkan informasi anggota divisi
	4. mengubah route dengan memisak untuk id dan nama
		- /id/:id
		- /nama/:nama

- catatatn penting : 
	1. jangan lupa menggunakan CORS agar API tidak diblokir oleh browser
	2. jangan lupa untuk setiap route tambahkan body parser dan express.urlencoder
	3. untuk API yang membutuhkakn insert data image jangan lupa menggunakan multer
		cara penggunaan multer untuk ubah img jadi blob :
		1. instal multer "npm i multer"
		2. buat variable untuk storage "const storage = multer.memoryStorage()"
		3. buat variable untuk upload = multer({storage})
		4. pada route yang bertugas untuk menginsert data, tambahkan middleware
		   upload.singel('name dari input yang berisi file gambar')
