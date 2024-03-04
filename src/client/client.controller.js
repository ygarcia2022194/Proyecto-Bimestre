import {response, request} from "express";
import bcryptjs from 'bcryptjs';
import Client from './client.js';

export const clientPost = async (req, res)=>{
    const {nombre, correo, password, role} = req.body;
    const client = new Client({nombre, correo, password, role});

    const salt = bcryptjs.genSaltSync();
    client.password = bcryptjs.hashSync(password, salt);

    await client.save();

    res.status(200).json({
        client
    });
}

export const clientPut = async(req, res =response)=>{
    const {id} = req.params;
    const {_id, password, ...rest} = req.body;

    if(password){
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);
    }

    await Client.findByIdAndUpdate(id, rest);
    const client = await Client.findOne({_id:id});
    res.status(200).json({
        msg: 'Your profile has been updated',
        client
    })
} 

export const deleteClient = async(req, res)=>{
    const {id} = req.params;
    const client = await Client.findByIdAndUpdate(id, {estado: false});
    const authenticatedClient = req.client;
    res.status(200).json({
        msg: 'Your profile has been deleted',
        client,
        authenticatedClient
    })
}