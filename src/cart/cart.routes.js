import { Router } from "express";
import { check } from "express-validator";
import { cartPost } from "./cart.controller.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.post(
    "/",
    [
        validarJWT,
        check("nombreProducto", "The name of product is obligatory").not().isEmpty(),
        check("cantidad", "The amount is mandatory").not().isEmpty()
    ],cartPost);

export default router;