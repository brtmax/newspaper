const PORT = process.env.PORT || 8000

const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')

const app = express()

app.listen(PORT, () => console.log('my server is running on PORT ${PORT} rocketship'))

//First endpoint, just displays a little welcome message
app.get('/', (req, res) => {
    res.json('Welcome to my newspaper API')
})

// Some of those sources don't provide their baseURL when linking to an article on their website,
// but only a relative path. So it's a good idea to have a baseURL property
const newspapers = [
    {
        name: 'nyt',
        address: 'https://www.nytimes.com/',
        baseURL: ''
    },
    {
        name: 'un',
        address: 'https://www.un.org/',
        baseURL: ''
    },
    {
        name: 'nyp',
        address: 'https://nypost.com/',
        baseURL: ''
    }


]
 
