const {Router} = require('express')
const adminController = require('../../controllers/admin/admin.controller')
const jwtAuth = require('../../util/authorization')

const router = new Router()

router.post('/add-product', jwtAuth, adminController.addProduct)
router.patch('/edit-product/:id',jwtAuth, adminController.editProduct)
router.delete('/delete-product/:id', jwtAuth,adminController.deleteProduct)
module.exports = router 