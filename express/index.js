const express = require('express')
const app = express()
const port = 8000

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

/**
 * auth router
 */
app.use('/auth', require('./routes/auth.js'))

/**
 * api router
 */
app.use('/api', require('./routes/api.js'))

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})