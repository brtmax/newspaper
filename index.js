const PORT = process.env.PORT || 8000

const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')

const app = express()

app.listen(PORT, () => console.log('my server is running on PORT ${PORT} rocketship'))

app.get('/', (req, res) => {
    res.json('Welcome to my newspaper API')
})