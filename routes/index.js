const express = require('express')
const cors = require('cors')
const path = require('path')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const app = express()

const { doc, addDoc, collection, getDocs, setDoc } = require('firebase/firestore');
const { db, auth, firebaseConfig } = require('./firebase');

const { conversationHistory } = require('./gemini');
const { error } = require('console');

const secret = "mysecret"

app.use(express.json())
app.use(cors())

app.use(express.static('../public'))

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
        role: 'AI',
        message: text
    })
})

// Get data api
app.get('/get/apikey', async (req,res) => {
    res.json(firebaseConfig);
})

// Login user.
app.post('/user/login', async (req,res) => {
    try{
        // get username and password.
        let usernameLogin = req.body.username
        let passwordLogin = req.body.password

        // get user data in firebase.
        let userSnapshot = await getDocs(collection(db, 'user'));
        let users = userSnapshot.docs.map(doc => doc.data());

        // check user and password.
        let user = users.find(user => user.username === usernameLogin);

        // Compare password login with password in firebase by bcrypt.
        const passwordMatch = await bcrypt.compare(passwordLogin, user.password)

        if(user != "" && passwordMatch != false){
            // JWT 
            const token = jwt.sign(
                {
                    username: user.username
                },
                    secret,
                {
                    expiresIn: "1h"
                }
            )
            
            // Send token to frond end.
            res.json({ 
                message: 'login success',
                token
            })

        }else {
            res.json({
                message: 'login failed'
            })
        }
        
    }catch(error){
        console.log(error);
    }
})

// Register user.
app.post('/user/register', async (req, res) => {
    try{
        // Check username and email is not duplicate.

        

        // bcrypt password
        const passwordBcrypt = await bcrypt.hash(req.body.password, 10);
        
        // add data to firebase.
        await addDoc(collection(db, "user"), {
            username: req.body.username,
            nickname: req.body.nickname,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: passwordBcrypt
        });
        
        res.json({
            message: "register success"
        });

    }catch(error){
        console.log(error);
    }
})

// Start the server
const port = 8000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});