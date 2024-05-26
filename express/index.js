/**
 * dependencies
 */
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')

/**
 * express config
 */
const app = express()
const port = 8000

/**
 * npm modules
 */
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

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

/**
 * error handler
 */
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send('Something broke!' )
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
