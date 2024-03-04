import Client from '../client/client.js';

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