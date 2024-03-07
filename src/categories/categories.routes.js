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

router.get("/", categoriesGet);

router.post(
    "/"
    ,[
        check("nombre").custom(existCategorie),
        check('descripcion', "The description is obligatory").not().isEmpty(),
        validarCampos
    ],categoriesPost);

router.put(
    "/:id",[
        check("id","Id no valid").isMongoId(),
        check("id").custom(existCategorieById),
        validarCampos
    ],categoriesPut);


export default router;