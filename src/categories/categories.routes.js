import { Router } from "express";
import { check } from "express-validator";

import { categoriesPost,
        categoriesDelete,
        categoriesGet,
        categoriesPut           
} from "./categories.controller.js";

import {existCategorie,existCategorieById} from '../helpers/db-validators.js';

import {validarCampos} from '../middlewares/validar-campos.js';
import {validarJWT} from '../middlewares/validar-jwt.js';

const router = Router();

router.get("/", categoriesPost);

router.post(
    "/"
    ,[
        check("nombre").custom(existCategorie),
        check('descripcion', "The descriptin is obligatory").not().isEmpty(),
        validarCampos
    ],categoriesPost);

export default router;