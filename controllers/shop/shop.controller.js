const Product = require('../../models/admin/product.model')
const httpStatus = require('http-status')

exports.getAllProducts = async (req, res, next)=>{
  try {
    const products = await Product.findAll()
     return  res.status(httpStatus.FOUND).json(products)
  } catch (error) {
      return  res.status(httpStatus.BAD_REQUEST)
  }
}
exports.getProduct = async (req, res, next)=>{
    try {
        const {id} = req.params
        const product = await Product.findByPk(id)
         return res.status(httpStatus.FOUND).json(product)
    } catch (error) {
        return  res.status(httpStatus.BAD_REQUEST)
    }
}

exports.addToCart = async (req, res, next)=>{
  try {
    const {id} = req.params
    let product
    const cart = await req.user.getCart()
    const products = await cart.getProducts({where: {id: id}})
    if(products.length > 0){
        product = products[0]
    }
    console.log(product.cartItem)
    let newQuantity = 1
    if(product){
     let oldQuantity = product.cartItem.quantity
        newQuantity = oldQuantity + 1 
     const prod = await Product.findByPk(id)
        await cart.addProduct(prod, {through: {quantity: newQuantity}})
     return res.status(httpStatus.OK).json(prod)
    }
    const prod = await Product.findByPk(id)
      await cart.addProduct(prod, {through: {quantity: newQuantity}})
     return res.status(httpStatus.OK).json(prod)
  } catch (error) {
      return res.status(httpStatus.BAD_REQUEST)
  }
}
exports.getCart = async (req, res, next)=>{
   try {
    const cart = await req.user.getCart()
    const products = await cart.getProducts()
    console.log(products)
    return res.status(httpStatus.FOUND).json(products)
   } catch (error) {
      return res.status(httpStatus.BAD_REQUEST)
   }
}

exports.postCartDeleteProduct = async (req, res, next) => {
    const {id} = req.params;
    const cart = await req.user.getCart();
    const products = await cart.getProducts({ where: { id: id }});
    let product = products[0];
    let newQuantity = product.cartItem.quantity -= 1;
    const curProduct = await Product.findByPk(id);
    await cart.addProduct(curProduct, { through: { quantity: newQuantity } });
 
    // clear out cart items when they delete them all, but leave the cart for future use.
    const checkAllProducts = await cart.getProducts();
    checkAllProducts.forEach(el =>{
        if (el.cartItem.quantity === 0){
            el.cartItem.destroy();
        }
    })
    return res.status(httpStatus.OK).json(curProduct)
};