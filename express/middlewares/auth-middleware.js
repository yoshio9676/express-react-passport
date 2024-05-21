const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const jwt = require('jsonwebtoken')

passport.use('login', new LocalStrategy({
    usernameField: 'email',
    session: false,
    passReqToCallback: true
}, async (req, email, password, done) => {
    console.log(email)
    console.log(password)
    const token = generateToken({ email })
    const refreshToken = generateRefreshToken({ email })

    done(null, {
        email,
        password,
        token,
        refreshToken
    })
}))

passport.use('verify', new JwtStrategy({
    jwtFromRequest: (req) => {
        return req.headers.authorization
    },
    secretOrKey: 'secret'
}, (payload, done) => {
    console.log(payload)
    const token = generateToken(payload)
    const refreshToken = generateRefreshToken(payload)
    done(null, {
        email: payload.email,
        token,
        refreshToken
    })
}))

module.exports = passport

function generateToken(user) {
    return jwt.sign(user, 'secret', { expiresIn: '1h' })
}

function generateRefreshToken(user) {
    return jwt.sign(user, 'secret', { expiresIn: '7d' })
}