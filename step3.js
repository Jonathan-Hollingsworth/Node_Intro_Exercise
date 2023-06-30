const fs = require('fs')
const axios = require('axios')

function processError(error) {
    console.error(error)
    process.exit(1)
}

function write(output, text) {
    fs.writeFile(output, text, 'utf8', function(error) {
        if (error) {
            processError(error)
        }
    })
}

function fileCat(file) {
    fs.readFile(file, 'utf8', function(error, data) {
        if (error) {
            processError(error)
        }
        console.log(data)
    })
}

function fileCopy(output, file) {
    fs.readFile(file, 'utf8', function(error, data) {
        if (error) {
            processError(error)
        }
        write(output, data)
    })
}

function webCat(url) {
    try {
        axios.get(url).then(resp => console.log(resp.data))
    } catch (error) {
        processError(error)
    }
}

function webCopy(output, url) {
    try {
        axios.get(url).then(resp => write(output, resp.data))    
    } catch (error) {
        processError(error)
    }
}

if (process.argv[2] === '--out') {
    if (process.argv[4].includes('http:') || process.argv[4].includes('https:')) {
        webCopy(process.argv[3], process.argv[4])
    } else {
        fileCopy(process.argv[3], process.argv[4])
    }
} else {
    if (process.argv[2].includes('http:') || process.argv[2].includes('https:')) {
        webCat(process.argv[2])
    } else {
        fileCat(process.argv[2])
    }
}