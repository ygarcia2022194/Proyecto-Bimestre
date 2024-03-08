import Cart from './cart.js';
import Products from '../products/products.js';
import { validationResult } from 'express-validator';

export const cartPost = async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {nombreProducto, cantidad} = req.body;
    const user = req.client;

    try {
        const product = await Products.findOne({nombre:nombreProducto});
        if(!product){
            return res.status(404).json({msg: 'Product not found'});
        }
        if(product.stock < cantidad){
            return res.status(400).json({msg: 'Insufficient stock '})
        }
        const price = product.price;
        const subTotal = cantidad * price;

        const existCart= await Cart.findOne({usuario});
        if(existCart){
            const existProduct = existCart.product.findIndex(product => product.nombreProducto === nombreProducto);
            if(existProduct!==-1){
                existCart.product[existProduct].cantidad += cantidad;
                existCart.product[existProduct].subTotal += subTotal;
            }else{
                existCart.product.push({nombreProducto, cantidad, precio, subTotal});
            }
            await existCart.save();
        }else{
            const newCart = new Cart({
                user,
                product: [{nombreProducto, cantidad, price, subTotal}]
            });
            await newCart.save();
        }
        product.stock -= cantidad;
        await product.save();
        return res.status(200).json({msg: 'Product add to the cart'});
    } catch (error) {
        console.error('Error adding product to cart', error);
        res.status(500).json({msg: 'Error adding product to cart'});
        
    }
}