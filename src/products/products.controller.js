import {response, request} from "express";
import mongoose from "mongoose";
import Products from './products.js';
import Categories from '../categories/categories.js';



export const productPost = async (req, res) => {
    const data = req.body;

    try {
        const category = await Categories.findOne({ nombre: data.categoria });
        if (!category) {
            return res.status(400).json({ msg: 'Category not found' });
        }
        const newProduct = new Products({
            ...data,
            categoria: category._id
        });
        await newProduct.save();
        if (!category.products) {
            category.products = [];
        }
        category.products.push(newProduct._id);
        await category.save();
        res.status(201).json({ msg: 'Product successfully added', newProduct });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
};

export const productGet = async (req, res) => {
    const { limite, desde } = req.query;
    try {
        const [total, products] = await Promise.all([
            Products.countDocuments({ estado: true }),
            Products.find({ estado: true })
                .populate('categoria', 'nombre')  // Agrega esta línea para hacer el populate del campo 'categoria' y obtener solo el campo 'nombre'
                .skip(Number(desde))
                .limit(Number(limite))
        ]);
        res.status(200).json({
            total,
            products
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'There was an error when obtaining the products.' });
    }
};
export const productPut = async (req, res)=>{
    const {id} = req.params;
    const {_id, ...resto} = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({msg: 'The id not valid'});
    }

    try {
        if(resto.category && !mongoose.Types.ObjectId.isValid(resto.category)){
            const category = await Categories.findOne({nombre: resto.category});

            if(!categories){
                return res.status(404).json({msg: 'Category not found'});
            }
            resto.category = category._id;
        }
        const product = await Products.findByIdAndUpdate(id, resto, {new: true});
        if(!product){
            return res.status(404).json({msg: 'Product not found'});
        }
        res.status(200).json({
            msg: 'Update product',
            product
        })
        
    } catch (error) {
        console.error('Error Error updating product:', error);
        res.status(500).json({msg: 'Error updating product'});
    }
}

export const productDelete = async (req, res)=>{
    const {id} = req.params;
    const product = await Products.findByIdAndUpdate(id, {estado: false});
    res.status(200).json({msg: 'Eliminate product', product});
}

export const inventaryControl = async (req, res)=>{
    try {
        const product = await Products.find({}, 'nombre stock descripcion');
        res.status(200).json(product);
    } catch (error) {
        console.error('Error getting inventory control', error);
        res.status(500).json({error: 'Error getting inventory control'});
    }
}

export const productsSoldout = async(req,res)=>{
    Products.find({stock: 0}, 'nombre descripcion stock')
        .then(productsSoldout =>{
            res.status(200).json(productsSoldout);
        })
        .catch(error =>{
            console.error('Error getting products sold out', error);
            res.status(500).json({error:'Error getting products sold out'})
        });
}

export const searchProductsByName = async(req, res)=>{
    const {nombre} = req.query;
    Products.find({nombre: {$regex: new RegExp(nombre, 'i')}})
        .then(products =>{
            res.status(200).json(products);
        })
        .catch(error =>{
            console.error('Error to search product with name', error);
            res.status(500).json({error: 'Error to search product with name'});
        })
}

export const catalogProductsByCategory = async(req, res)=>{
    const {category} = req.params;
    Categories.findOne({nombre:category})
        .then(categoryFound=>{
            if(!categoryFound){
                return res.status(404).json({error: 'Category not found'});
            }
            return Products.find({category: categoryFound._id});
        })
        .then(product=>{
            res.status(200).json(product);
        })
        .catch(error=>{
            console.log('Error to getting catalog with products', error);
            res.status(500).json({error: 'Error to getting catalog with products'});
        });
}


