require('dotenv').config()

const express = require('express')

const cors = require('cors')

const router = require('./routes/router')

require('./db/connection')

const server = express()

const PORT = process.env.PORT || 4000

server.use(cors())

server.use(express.json())

// to make the server files available or static
server.use("/uploads", express.static("./uploads"))

// put after cors and express use statements
server.use(router)

server.get('/',(req,res)=>{
    res.send('ems alive!')
})

server.listen(PORT, ()=>{
    console.log(`ems listening at ${PORT}`);
})