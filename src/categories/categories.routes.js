import { Router } from "express";
import { check } from "express-validator";

import { categoriesPost,
        categoriesDelete,
        categoriesGet,
        categoriesPut           
} from "./categories.controller";

import {existCategorie,existCategorieById} from '../helpers/db-validators.js';

import {validarCampos} from '../middlewares/validar-campos.js';
import {validarJWT} from '../middlewares/validar-jwt.js';

const router = Router();

router.get("/", categoriesPost);

