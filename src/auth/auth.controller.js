import {request, response} from "express";
import Client from "../client/client.js";
import Admin from '../admin/admin.js';
import bcryptjs from 'bcryptjs';

import {generarJWT} from '../helpers/generate-jwt.js';
export const login = async (req = request, res= response)=>{
    const {correo, password} =req.body;
    try {
        let user = await Admin.findOne({correo});
        if(!user){
            user = await Client.findOne({correo});
            if(!user){
                console.log('User not found');
                return res.status(400).json({
                    msg: "Incorrect credentials, email don't exist in the data base"
                });
            } 
        }
        console.log('User found:', user);
        
        if(!user.estado){
            return res.status(400).json({
                msg: "The user don't exist in the data base"
            });
        }
        const validPassword = bcryptjs.compareSync(password, user.password);
        if(!validPassword){
            return res.status(400).json({
                msg: "The password is incorrect"
            });
        }
        const token = await generarJWT(user.id);
        res.status(200).json({
            msg: "Welcome",
            user,
            token
        })
    } catch (error) {
        console.log(e);
        res.status(500).json({
            msg: "Comunicate with admnistrator"
        });
    }
}