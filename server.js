const express = require('express')

const app = express()

app.get('/callback', (req, res)=>{
    res.send('worked').status(200)
})
