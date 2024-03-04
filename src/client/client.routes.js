import { Router } from "express";
import { check } from "express-validator";
import {clientPost} from "./client.controller.js"
import { existeEmail } from "../helpers/db-validators.js";
import { validarCampos } from "../middlewares/validar-campos.js";
const router = Router();

router.post(
    "/",
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("password", "El password debe ser mayor a 6 caracteres").isLength({min: 6}),
        check("correo", "Este no es un correo valido").isEmail(),
        check("correo").custom(existeEmail),
        validarCampos
    ],clientPost);



export default router;
