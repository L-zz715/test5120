const express = require("express")
const app = express()
app.use(require('cors')())
app.use(express.json())
// const router = express.Router()
const port = 3000
// seperate apis
// require('./routes/home')(app)
require('./routes/uv_level')(app)

app.use('/', express.static(__dirname + '/public'))

//type node index.js in terminal to start
app.listen(port, () => {
    console.log(`server started: http://localhost:${port}`)
})