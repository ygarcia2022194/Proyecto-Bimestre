import jwt  from "jsonwebtoken";
import Admin from '../admin/admin.js';
import Client from '../client/client.js';
import {request, response} from 'express';

export const validarJWT = async(req = request, res= response, next)=>{
    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }

    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const admin = await Admin.findById(uid);
        if(!admin){
            return res.status(401).json({
                msg: "Not admin"
            });
        }
        if(!admin.estado){
            return res.status(401).json({
                msg: "Invalid token, user with false status"
            });
        }
        req.admin = admin;
        next();
    } catch (e){
        console.log(e);
        res.status(401).json({
            msg: 'Token no valido'
        })
        
    }
}