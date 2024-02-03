const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()
const { conversationHistory } = require("./gemini")

app.use(express.json())
app.use(cors())

app.use(express.static("../public"))

// Start page ..
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/index.html'))
})

// Chatbox page ..
app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/index.html'))
})

// Profile page.
app.get('/profile.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/profile.html'))
})

// Stats page.
app.get('/stats.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/stats.html'))
})

// Login page.
app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/login.html'))
})

// Register page.
app.get('/register.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/register.html'))
})

// Send text to bard ..
app.post('/message/user', async (req, res) => {
    const text = await conversationHistory(req.body.message,req.body.historys)
    res.json({
        role: "AI",
        message: text
    })
})

// Start the server
const port = 8000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});