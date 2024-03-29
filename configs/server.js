'use strict'

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import clientRoutes from '../src/client/client.routes.js';
import adminRoutes from '../src/admin/admin.routes.js';
import authRoutes from '../src/auth/auth.routes.js';
import categorieRoutes from '../src/categories/categories.routes.js';
import productRoutes from '../src/products/products.router.js';
import cartRoutes from '../src/cart/cart.routes.js';
import facturaRoutes from '../src/factura/factura.routes.js';


class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.clientPath = '/salesCompany/v1/client';
        this.adminPath = '/salesCompany/v1/admin';
        this.authPath = '/salesCompany/v1/auth';
        this.categoriePath = '/salesCompany/v1/categorie';
        this.productPath = '/salesCompany/v1/product';
        this.cartPath = '/salesCompany/v1/cart';
        this.facturaPath = '/salesCompany/v1/factura';

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
        this.app.use(this.authPath, authRoutes);
        this.app.use(this.categoriePath, categorieRoutes);
        this.app.use(this.productPath, productRoutes);
        this.app.use(this.cartPath, cartRoutes);
        this.app.use(this.facturaPath, facturaRoutes);
    }
    listen(){
        this.app.listen(this.port, () =>{
            console.log('Servidor ejecutandose y escuchando el puerto', this.port)
        })
    }
}

export default Server;