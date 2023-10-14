const passport = require("passport");
const local = require("passport-local");
const userService = require("../models/user.model");
const { createHash, isValidatePassword } = require("../../utils");
const GitHubStrategy = require("passport-github2");
const jwt = require ('passport-jwt')

const localStrategy = local.Strategy;


const cookieExtractor = req => {
    let token = null
    if (req && req.cookies){
        token = req.cookies["coderCookieToken"]
    }
    return token
}

const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt

const initializePassport = () => {
  passport.use("jwt", new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
    secretOrKey: "12345"
    
}, async(jwt_payload, done) => {
    try {
        return done(null, jwt_payload)
    } catch (error) {
        return done(error)
    }
    
}
))
};






module.exports = initializePassport;
