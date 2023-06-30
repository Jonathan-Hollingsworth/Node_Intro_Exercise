const fs = require('fs')
const axios = require('axios')

function fileCat(file) {
    fs.readFile(file, 'utf8', function(err, data) {
        if (err) {
            console.error(err)
            process.exit(1)
        }
        console.log(data)
    })
}

function webCat(url) {
    try {
        axios.get(url).then(resp => console.log(resp.data))
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

if (process.argv[2].includes('http:') || process.argv[2].includes('https:')) {
    webCat(process.argv[2])
} else {
    fileCat(process.argv[2])
}