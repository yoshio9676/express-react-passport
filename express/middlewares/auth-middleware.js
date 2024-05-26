const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const jwt = require('jsonwebtoken')
const userModel = require('../models/user.js')

passport.use('register', new LocalStrategy({
    usernameField: 'email',
    session: false,
    passReqToCallback: true
}, async (req, email, password, done) => {
    const name = req.body.name
    const user = await userModel.insertUser(name, email, password)
    done(null, user)
}))

passport.use('login', new LocalStrategy({
    usernameField: 'email',
    session: false,
    passReqToCallback: true
}, async (req, email, password, done) => {
    await userModel.checkRegisterUser(email, password)
    .then(res => {
        console.log('login', res)
        const user = res
        const token = generateToken({ email })
    
        done(null, {
            user,
            token
        })
    })
    .catch(err => {
        done(null, false)
    })
}))

passport.use('verify', new JwtStrategy({
    jwtFromRequest: (req) => {
        if (req && req.cookies) {
            return req.cookies.token ?? null
        } else {
            return null
        }
    },
    secretOrKey: 'secret'
}, async (payload, done) => {
    const email = payload.email
    const user = await userModel.findUserByEmail(email)
    if (user) {
        const token = generateToken(user)
        done(null, {
            email: payload.email,
            token
        })
    } else {
        done(null, false)
    }
}))

module.exports = passport

function generateToken(user) {
    return jwt.sign(user, 'secret', { expiresIn: '2h' })
}