const router = require('express').Router()
const passport = require('../middlewares/auth-middleware.js')

router.post('/register', 
    passport.authenticate('register', {session: false}),
    async (req, res, next) => {
        console.log(req.user)
        res.send({
            user: req.user
        })
    }
)

router.post('/login',
    passport.authenticate('login', {session: false}),
    async (req, res, next) => {
        console.log(req.user)
        res.send({
            user: req.user
        })
    }
)

router.get('/logout',
    passport.authenticate('verify', {session: false}),
    async (req, res, next) => {
        try {
            res.send({
                })
        } catch (err) {
            next(err)
        }
    }
)

module.exports = router
