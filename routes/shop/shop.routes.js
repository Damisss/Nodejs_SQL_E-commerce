const {Router} = require('express')
const shopController = require('../../controllers/shop/shop.controller')
const jwtAuth = require('../../util/authorization')

const router = new Router()
router.get('/all-products', shopController.getAllProducts)
router.get('/single-product/:id', shopController.getProduct)
router.post('/add-to-cart/:id',jwtAuth, shopController.addToCart)
router.get('/get-cart',jwtAuth, shopController.getCart)
router.post('/delete-product-from-cart/:id', jwtAuth,shopController.postCartDeleteProduct)
module.exports = router