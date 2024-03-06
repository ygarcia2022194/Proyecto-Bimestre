import Admin from '../admin/admin.js';
import Client from '../client/client.js';
import Product from '../products/products.js';

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

