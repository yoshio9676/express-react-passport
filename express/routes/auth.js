const router = require('express').Router()
const passport = require('../middlewares/auth-middleware.js')

router.get('/', (req, res, next) => {
    res.send('Hello auth router!')
})

router.post('/login',
    passport.authenticate('login', {session: false}),
    (req, res, next) => {
        console.log(req.user)
        res.send({
            user: req.user
        })
    }
)

module.exports = router
