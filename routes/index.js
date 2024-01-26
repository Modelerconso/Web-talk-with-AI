const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const app = express()

app.use(bodyParser.json())
app.use(cors())

app.use(express.static("../public"))

// Start page ..
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/index.html'))
})

// Send text to bard ..
app.post('/message/user', (req, res) => {
    const text = req.body.message
    res.send({
        message: "success"
    })
})

// Start the server
const port = 8000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});