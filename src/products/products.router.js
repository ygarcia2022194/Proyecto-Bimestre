import {Router} from "express";
import { check } from "express-validator";
import { productPost } from "./products.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { existProductById, productExist } from "../helpers/db-validators.js";

const router = Router();

router.post(
    "/",
    [
        check("nombre", "The name is obligatory").not().isEmpty(),
        check("nombre").custom(productExist),
        check("marca", "The brand is obligatory").not().isEmpty(),
        check("precio", "The price is obligatory").not().isEmpty(),
        validarCampos
    ],productPost)