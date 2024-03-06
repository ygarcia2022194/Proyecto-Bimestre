import {response, request} from "express";
import Products from './products.js';

export const productPost = async (req, res)=>{
    const {nombre, marca, precio, stock} = req.body;
    const product = new Products({nombre, marca, precio, stock});

    await product.save();
    res.status(200).json({
        product
    });
}

