const passport = require('passport')
const {Strategy, ExtractJwt} = require('passport-jwt')
const User =  require('../models/user/user.model')
const jwtOps ={
    secretOrKey: 'secret',
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt')
}
const jwtStartegy = new Strategy(jwtOps, async (payload, done)=>{
    try {
        
        const user =  await User.findByPk( payload)
        //console.log(user.dataValues)
    if(!user){
        return done(null, false)
    } 
    return done(null, user)
    } catch (error) {
        return done(null, error)
    }
})
passport.use(jwtStartegy)

const jwtAuth = passport.authenticate('jwt', {session: false})
module.exports = jwtAuth