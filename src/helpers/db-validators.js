import Admin from '../admin/admin.js';
import Client from '../client/client.js';
import Product from '../products/products.js';
import Categories from '../categories/categories.js'

export const existeEmail = async(correo='')=>{
    const existeEmail = await Client.findOne({correo});
    if(existeEmail){
        throw new Error(`El email ${correo} ya fue registrado`);
    }
}

export const existClientById = async (id = '')=>{
    const existClient = await Client.findById(id);
    if(!existClient){
        throw new Error(`The ID: ${id} doesn't exist`);
    }
}

export const existeEmailA = async(correo='')=>{
    const existEmailA = await Admin.findOne({correo});
    if(existEmailA){
        throw new Error(`The email ${correo} has already been registered`);
    }
}

export const productExist = async(nombre='')=>{
    const existProduct = await Product.findOne({nombre});
    if(existProduct){
        throw new Error(`The product ${nombre} has already exists`);
    }
}

export const existProductById = async(id='')=>{
    const existProductById = await Product.findById(id);
    if(!existClientById){
        throw new Error(`The product by ID: ${id} doesn't exist`);
    }
}

export const existCategorie = async (nombre='')=>{
    const existCategorie = await Categories.findOne({nombre});
    if(existCategorie){
        throw new Error(`The categorie ${nombre} has already been registered`);
    }
}

export const existCategorieById = async(id='')=>{
    const existCategorie = await Categories.findById(id);
    if(!existCategorie){
        throw new Error(`The ID: ${nombre} don't exist`)
    }
}

export const validarPrecio = async (precio='')=>{
    if(precio === null || isNaN(precio) || precio <0){
        throw new Error('The price must be a valid number greater than 0');
    }
    if(precio <0){
        throw new Error('The price cannot be negative');
    }
    if(precio==0){
        throw new Error('The price cannot be 0')
    }
}

export const validarStock = async (stock= '')=>{
    if(stock === null || isNaN(stock) || stock <0){
        throw new Error('The stock must be a valid number greater than 0');
    }
    if(!Number.isInteger(stock)){
        throw new Error('The stock must be a whole number');
    }
    if(stock < 0){
        throw new Error('The stock cannot be a negative');
    }
}

