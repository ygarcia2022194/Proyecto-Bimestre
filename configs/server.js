'use strict'

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import clientRoutes from '../src/client/client.routes.js';
import adminRoutes from '../src/admin/admin.routes.js';


class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.clientPath = '/salesCompany/v1/client';
        this.adminPath = '/salesCompany/v1/admin';

        this.conectarDB();
        this.middlewares();
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        this.app.use(express.static('public'));
        this.app.use(cors());
        this.app.use(express.json());
    }
    routes(){
        this.app.use(this.clientPath, clientRoutes);
        this.app.use(this.adminPath, adminRoutes);
    }
    listen(){
        this.app.listen(this.port, () =>{
            console.log('Servidor ejecutandose y escuchando el puerto', this.port)
        })
    }
}

export default Server;