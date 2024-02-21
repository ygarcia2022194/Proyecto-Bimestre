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