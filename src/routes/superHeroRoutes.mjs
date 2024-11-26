import express from "express";

import {
  obtenerSuperheroePorIdController,
  buscarSuperheroePorAtributoController,
  obtenerSuperheroesMayoresDe30Controller,
  obtenerTodosLosSuperheroeController,
  crearSuperheroeController,
  actualizarSuperheroeController,
  eliminarSuperheroeController,
  eliminarSuperheroePorNombreController,
} from "../controllers/superheroesController.mjs";

const router = express.Router();

router.get("/heroes", obtenerTodosLosSuperheroeController);
router.get("/heroes/:id", obtenerSuperheroePorIdController);
router.get("/heroes/buscar/:atributo/:valor", buscarSuperheroePorAtributoController); // Probar endpoint y todos los demas
router.get("/heroes/mayores/30", obtenerSuperheroesMayoresDe30Controller); // Solucionar endpoint
router.post("/heroes", crearSuperheroeController);
router.put("/heroes/:id", actualizarSuperheroeController);
router.delete("/heroes/:id", eliminarSuperheroeController);
router.delete("/heroes/nombre/:nombre", eliminarSuperheroePorNombreController);

export default router;
