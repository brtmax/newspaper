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

const articles = []

newspapers.forEach(newspaper => {

    // Visit the address using axios
    // Then save this response and pass this HTML into cheerio
    axios.get(newspaper.address).then(response => {
        const pageHTML = response.data
        const $ = cheerio.load(pageHTML)

        // Look for elements that contain word "Ukraine"
        // Grab the title and the url, push this as an object into our articles array
        $('a:contains("Ukraine")', pageHTML).each(function () {
            const title = $(this).text()
            const url = $(this).attr('href')

            articles.push({
                title,
                url: newspaper.baseURL + url,
                source: newspaper.name
            })
        })
    })
})

// Endpoint to collect responses
app.get('/news', (req, res) => {
    res.json(articles)
})
 
// Same as above, new array now also contains the id of the source
app.get('/news/:newspaperId', (req, res) => {
    const newspaperId = req.params.newspaperId

    const newspaperAddress = newspaper.filter(newspaper => newspaper.name == newspaperId)[0].address
    const newspaperBase = newspaper.filter(newspaper => newspaper.name == newspaperId)[0].base

    axios.get(newspaperAddress).then(response => {
        const pageHTML = response.data
        const $ = cheerio.load(pageHTML)
        const specificArticles = []

        $('a:contains("Ukraine")', pageHTML).each(function () {
            const title =$(this).text()
            const url = $(this).attr('href')
            specificArticles.push({
                title, 
                url: newspaperBase + url,
                source: newspaperId
            })
        })
        res.json(specificArticles)
    }).catch(err => console.log(err))
})