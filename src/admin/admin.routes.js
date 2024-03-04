import {Router} from "express";
import { check } from "express-validator";
import { adminPost } from "./admin.controller";
import {existeEmailA} from "../helpers/db-validators";
import { validarCampos } from "../middlewares/validar-campos";


const router = Router();

router.post(
    "/",
    [
        check("nombre","The name is obligatory").not().isEmpty(),
        check("password", "The password must be greater than 6 characters").isLength({min:6}),
        check("correo", "The email is not valid").isEmail(),
        check("correo").custom(existeEmailA),
        validarCampos
    ],adminPost)