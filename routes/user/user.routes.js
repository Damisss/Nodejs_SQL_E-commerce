const {Router} = require('express')
const userController = require('../../controllers/user/user.controller')

const router = new Router()

router.post('/signup', userController.signup)
router.post('/login', userController.login)
module.exports = router