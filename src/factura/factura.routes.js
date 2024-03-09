import { Router } from "express";
import {
    crearFactura,
    obtenerFacturasUsuario,
    obtenerDetallesFactura,
} from "./facturas.controller.js";

const router = Router();
router.post("/",crearFactura);
router.get('/', obtenerFacturasUsuario);
router.get('/:facturaId', obtenerDetallesFactura);
export default router;