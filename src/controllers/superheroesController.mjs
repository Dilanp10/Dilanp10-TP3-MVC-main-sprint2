import {
  obtenerSuperheroePorId,
  obtenerSuperheroesMayoresDe30,
  obtenerTodosLosSuperheroe,
  buscarSuperheroePorAtributo,
  crearSuperheroe,
  actualizarSuperheroe,
  eliminarSuperheroe,
  eliminarSuperheroePorNombre,
} from "../services/superheroesService.mjs";

import {
  renderizarSuperheroe,
  renderizarListaSuperheroes,
} from "../views/responseView.mjs";

import mongoose from "mongoose";

export async function obtenerSuperheroePorIdController(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ mensaje: "ID inválido" });
    }

    const superheroe = await obtenerSuperheroePorId(id);
    if (!superheroe) {
      return res.status(404).send({ mensaje: "Superhéroe no encontrado" });
    }

    res.send(superheroe);
  } catch (error) {
    res.status(500).send({ mensaje: "Error interno del servidor", error });
  }
}

export async function obtenerTodosLosSuperheroeController(req, res) {
  try {
    const superheroes = await obtenerTodosLosSuperheroe();
    res.send(renderizarListaSuperheroes(superheroes));
  } catch (error) {
    res.status(500).send({ mensaje: "Error interno del servidor", error });
  }
}

export async function buscarSuperheroePorAtributoController(req, res) {
  try {
    const { atributo, valor } = req.params;
    const superheroes = await buscarSuperheroePorAtributo(atributo, valor);
    if (superheroes.length > 0) {
      res.send(renderizarListaSuperheroes(superheroes));
    } else {
      res
        .status(404)
        .send({ mensaje: "No se encontraron superhéroes con ese atributo" });
    }
  } catch (error) {
    res.status(500).send({ mensaje: "Error interno del servidor", error });
  }
}

export async function obtenerSuperheroesMayoresDe30Controller(req, res) {
  try {
    const superheroes = await obtenerSuperheroesMayoresDe30();
    if (superheroes.length === 0) {
      return res
        .status(404)
        .json({ mensaje: "No se encontraron superhéroes mayores de 30 años" });
    }

    res.send(superheroes);
  } catch (error) {
    res.status(500).send({ mensaje: "Error interno del servidor", error });
  }
}

export async function crearSuperheroeController(req, res) {
  try {
    const superheroe = await crearSuperheroe(req.body);
    res.status(201).json({
      mensaje: "Superhéroe creado con éxito",
      superheroe,
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al crear el superhéroe",
      error: error.message,
    });
  }
}

export async function actualizarSuperheroeController(req, res) {
  try {
    const { id } = req.params;
    const datosActualizados = req.body;

    const superheroe = await actualizarSuperheroe(id, datosActualizados);
    if (superheroe) {
      res.json({
        mensaje: "Superhéroe actualizado con éxito",
        superheroe, // Devuelve el superhéroe actualizado
      });
    } else {
      res.status(404).json({ mensaje: "Superhéroe no encontrado" });
    }
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al actualizar el superhéroe",
      error: error.message,
    });
  }
}

export async function eliminarSuperheroeController(req, res) {
  try {
    const { id } = req.params;

    const superheroeEliminado = await eliminarSuperheroe(id);
    if (superheroeEliminado) {
      res.json({
        mensaje: "Superhéroe eliminado con éxito",
        superheroe: superheroeEliminado, // Devuelve el superhéroe eliminado
      });
    } else {
      res.status(404).json({ mensaje: "Superhéroe no encontrado" });
    }
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al eliminar el superhéroe",
      error: error.message,
    });
  }
}


export async function eliminarSuperheroePorNombreController(req, res) {
  try {
    const { nombre } = req.params; // Obtener el nombre del superhéroe desde los parámetros
    const resultado = await eliminarSuperheroePorNombre(nombre);

    if (resultado.deletedCount === 0) {
      return res.status(404).json({ mensaje: "Superhéroe no encontrado" });
    }

    res.json({ mensaje: `Superhéroe '${nombre}' eliminado correctamente` });
  } catch (error) {
    res.status(500).json({ mensaje: "Error interno del servidor", error });
  }
}