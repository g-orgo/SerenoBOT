const express = require('express')
const credentials = require('./credentials')

const app = express()
const port = credentials.port

app.listen(port, () => {
    console.log(`Sereno is on port ${port}`)
})

app.get('/', (req, res)=>{
    res.send('')
})
