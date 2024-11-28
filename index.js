const express = require('express')
const cors = require('cors')
const application =  require('./src/app/routes/index')
const path = require('path')
const port = process.env.PORT


const app = express()
app.set('views', path.join(__dirname, 'src/app/views'))
app.set('view engine', 'ejs')

// untuk mengizinkan hanya method get yang di izinkan
const corsOptions = {
    origin : '*',
    methods : ['GET'],
    allowHeader : ['Content-Type']
}

app.use(cors(corsOptions))

app.use('/', application)

app.listen(port, () => {
    console.log(`app listen on link : http://localhost:${port}`)
})