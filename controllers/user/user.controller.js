const httpStatus = require('http-status')
const User = require('../../models/user/user.model')
const { hashSync, compareSync} = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')

exports.signup = async (req, res, next)=>{
    try {
        const {username, email, password} = req.body
          //hashSync(password)
        const user = await User.create({
            username: username,
            email: email,
            password: hashSync(password)
        })
          await user.createCart()
        // console.log(token)
         return res.status(httpStatus.CREATED).json({...user.dataValues, token: `JWT ${jwt.sign(user.id, 'secret')}`})
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST)
    }
}

exports.login = async (req, res, next)=>{
    try {
        const {username, password} = req.body
        const user = await User.findOne({where: {username: username}})
        const comparePassword = compareSync(password, user.password)
        if(!user){
            return res.status(httpStatus.BAD_REQUEST).json('Invalid username or password')
        }else if(!comparePassword){
            return res.status(httpStatus.BAD_REQUEST).json('Invalid username or password')
        }
       return res.status(httpStatus.OK).json({...user.dataValues, token: `JWT ${jwt.sign(user.id, 'secret')}`})

    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST)
    }
}
