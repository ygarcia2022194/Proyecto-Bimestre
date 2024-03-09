import { Router } from "express";
import { check } from "express-validator";
import { cartGet, cartPost, deleteCarrito } from "./cart.controller.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.post(
    "/",
    [
        check("nombreProducto", "The name of product is obligatory").not().isEmpty(),
        check("cantidad", "The amount is mandatory").not().isEmpty()
    ],cartPost);

router.get("/", cartGet);

router.delete("/", deleteCarrito);
export default router;