import {Router} from "express";
import { check } from "express-validator";
import { productDelete, 
    productGet, 
    productPost,
    productPut,
    inventaryControl, 
    searchProductsByName,
    catalogProductsByCategory,
    productsSoldout} from "./products.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { existProductById, productExist, validarPrecio, validarStock} from "../helpers/db-validators.js";
import {validarJWT} from '../middlewares/validar-jwt.js';
import { ChainCondition } from "express-validator/src/context-items/chain-condition.js";
const router = Router();

router.post(
    "/",
    [
        validarJWT,
        check("nombre", "The name is obligatory").not().isEmpty(),
        check("nombre").custom(productExist),
        check("marca", "The brand is obligatory").not().isEmpty(),
        check("precio", "The price is obligatory").not().isEmpty(),
        check("precio").custom(validarPrecio),
        check("stock", "The stock isnt opcional"),
        check("stock").custom(validarStock),
        check("descripcion", "The descripcion isnt opcional").not().isEmpty(),
        validarCampos
    ],productPost);

router.put(
    "/:id",[
        validarJWT,
        check("id", "Id not valid").isMongoId(),
        check("id").custom(existProductById),
        validarCampos
    ],productPut);

router.delete(
    "/:id",[
        validarJWT,
        check("id", "Not ID valid").isMongoId(),
        check("id").custom(existProductById),
        validarCampos
    ],productDelete);

router.get("/", productGet);
router.get("/control-inventary", inventaryControl);
router.get("/buscar", searchProductsByName);
router.get("/productsSoldout", productsSoldout);
router.get("/category/:category", catalogProductsByCategory);

export default router;