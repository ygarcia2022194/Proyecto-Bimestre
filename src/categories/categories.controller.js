import {response, request} from "express";
import Categories from './categories.js';

export const categoriesPost = async (req, res)=>{
    const {nombre, descripcion} = req.body;
    const categories = new Categories({nombre,descripcion});

    await categories.save();
    res.status(200).json({
        categories
    });
}

export const categoriesGet = async(req = request, res= response)=>{
    const {limite, desde} = req.query;
    const query = {estado: true};

    const [total, categories] = await Promise.all([
        Categories.countDocuments(query),
        Categories.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        categories
    })
}

export const categoriesPut= async (req, res= response)=>{
    const {id} = req.params;
    const {_id, ...resto} = req.body;

    try {
        const updateCategorie = await Categories.findByIdAndUpdate(id, resto, {new: true});
        const filter = { idCategoria: id };
        const update = {$set: {idCategoria: updateCategorie._id}};
        await Producto.updateMany(filter, update);
        res.status(200).json({
            msg: "Categorie update",
            categorie: updateCategorie
        })
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export const categoriesDelete = async(req, res)=>{
    const {id} = req.params; 

    try {
        const categorie = await Categories.findById(id);
        if(!categorie){
            return res.status(404).json({
                msg: "Categorie not found"
            });
        }
        const alternativeCategorie = await Categories.findOne({nombre: "Almacen"});
        const filter = {idCategorie: id};
        const update = {$et:{idCategorie: alternativeCategorie ? alternativeCategorie._id : null}};
        await Producto.updateMany(filter, update);
        const updateCategorie = await Categories.findByIdAndUpdate(id, {estado: false},{new: true});
        res.status(200).json({
            msg: "Successfully deleted category",
            categorie: updateCategorie
        });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}