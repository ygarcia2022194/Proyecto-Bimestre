import { Router } from "express";
import { check } from "express-validator";
import {clientPost, clientPut, deleteClient} from "./client.controller.js"
import { existeEmail, existClientById } from "../helpers/db-validators.js";
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

router.put(
    "/:id",
    [
        check("id", "No es un ID valido").isMongoId(),
        check("id").custom(existClientById),
        validarCampos
    ],clientPut);


router.delete(
    "/:id",[
        check("id", "No es un ID valido").isMongoId(),
        check("id").custom(existClientById),
    ],deleteClient);


export default router;
