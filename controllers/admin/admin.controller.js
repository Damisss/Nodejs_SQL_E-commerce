const Product = require('../../models/admin/product.model')
const httpStatus = require('http-status')
const User = require('../user/user.controller')


exports.addProduct =  async (req, res, next)=>{
   try {
      const{name, description, price} = req.body
      //console.log(req.user.dataValues)
      req.user.createProduct({
        name: name,
        description: description,
        price: price
      })
      return  res.status(httpStatus.CREATED).json('done')
   } catch (err) {
      return  res.status(httpStatus.BAD_REQUEST)
   }
}
exports.editProduct = async (req, res, next)=>{
   try {
       const {id} = req.params
       const product = await Product.findByPk(id)
        Object.keys(req.body).forEach(elt=>{
            product[elt] = req.body[elt]
        })    
       return res.status(httpStatus.OK).json(await product.save())
   } catch (error) {
       return  res.status(httpStatus.BAD_REQUEST)
   }
}
exports.deleteProduct = async (req, res, next)=>{
   try {
      const {id} = req.params
       let product
        const products =  await req.user.getProducts({where: {id: id}})
          product = products[0]
       await product.destroy()
      return res.status(httpStatus.OK).json(product)
   } catch (error) {
      return  res.status(httpStatus.BAD_REQUEST)
   }
}