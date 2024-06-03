const express = require('express')

const app = express()

app.get('/order', (request, response) => {
    return response.send('We are running')
})

app.listen(3000)