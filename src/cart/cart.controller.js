import Cart from './cart.js';
import Products from '../products/products.js';
import { validationResult } from 'express-validator';

export const cartPost = async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {nombreProducto, cantidad} = req.body;
    const cliente = req.cliente;

    try {
        const product = await Products.findOne({nombre:nombreProducto});
        if(!product){
            return res.status(404).json({msg: 'Product not found'});
        }
        if(product.stock < cantidad){
            return res.status(400).json({msg: 'Insufficient stock '})
        }
        const price = product.precio;
        const subTotal = cantidad * price;

        const existCart= await Cart.findOne({cliente});
        if(existCart){
            const existProduct = existCart.productos.findIndex(product => product.nombreProducto === nombreProducto);
            if(existProduct!==-1){
                existCart.productos[existProduct].cantidad += cantidad;
                existCart.productos[existProduct].subTotal += subTotal;
            }else{
                if (!existCart.producto) {
                    existCart.producto = [];
                }
                existCart.producto.push({nombreProducto, cantidad, price, subTotal});
            }
            await existCart.save();
        }else{
            const newCart = new Cart({
                cliente,
                productos: [{nombreProducto, cantidad, price, subTotal}]
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

export const cartGet = async (req, res) =>{
    const cliente = req.cliente;
    try{
        const cart = await Cart.findOne({cliente});
        if(!cart){
            return res.status(404).json({msg: 'No products found in cart'});

        }
        let totalPrice = 0;
        const productsCart = cart.productos.map(producto =>{
            const subTotal = producto.precio * producto.cantidad;
            totalPrice += subTotal;
            return{
                cliente: cliente.nombre,
                producto: producto.nombreProducto,
                cantidad: producto.cantidad,
                precio: producto.precio,
                subTotal: subTotal 
            }
        });
        const cartId = cart._id;
        return res.status(200).json({cartId, productsCart, totalPrice});
    } catch (error) {
        console.log('Error getting products in cart', error);
        res.status(500).json({error: 'Error getting products in cart'});
        
    }
}

export const deleteCarrito = async (req, res) => {
    const { nombreProducto } = req.query;
    const cliente = req.cliente;
    try {
        const carritoExistente = await Cart.findOne({ cliente });
        if (!carritoExistente) {
            return res.status(404).json({ msg: 'Carrito no encontrado para este usuario' });
        }
        const productoIndex = carritoExistente.productos.findIndex(item => item.nombreProducto === nombreProducto);
        if (productoIndex === -1) {
            return res.status(404).json({ msg: 'Producto no encontrado en el carrito' });
        }
        const cantidad = carritoExistente.productos[productoIndex].cantidad;
        carritoExistente.productos.splice(productoIndex, 1);
        await carritoExistente.save();
        await Products.findOneAndUpdate(
            { nombre: nombreProducto },
            { $inc: { stock: cantidad } }
        );

        return res.status(200).json({ msg: 'Producto eliminado del carrito' });
        
    } catch (error) {
        console.error('Error al eliminar producto del carrito', error);
        res.status(500).json({ msg: 'Error al eliminar producto del carrito'});
    }
}