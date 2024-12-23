import {
  obtenerSuperheroePorId,
  obtenerTodosLosSuperheroe,
  crearSuperheroe,
  actualizarSuperheroe,
  eliminarSuperheroe,
} from "../services/superheroesService.mjs";

// Obtener todos los superhéroes
export async function obtenerTodosLosSuperheroeController(req, res) {
  try {
    const superheroes = await obtenerTodosLosSuperheroe();
    res.render("dashboard", { superheroes });
  } catch (error) {
    res.status(500).json({ mensaje: "Error interno del servidor", error });
  }
}

// Obtener un superhéroe por ID
export async function obtenerSuperheroePorIdController(req, res, render = false) {
  try {
    const { id } = req.params;

    const superheroe = await obtenerSuperheroePorId(id);
    if (!superheroe) {
      return res.status(404).json({ mensaje: "Superhéroe no encontrado" });
    }

    if (render) {
      return superheroe; // Devuelve el objeto si se llama desde otra función
    } else {
      res.json(superheroe); // Renderiza JSON por defecto
    }
  } catch (error) {
    res.status(500).json({ mensaje: "Error interno del servidor", error });
  }
}

// Crear un nuevo superhéroe
export async function crearSuperheroeController(req, res) {
  try {
    const { poderes } = req.body;

    // Validar poderes: cada uno debe tener al menos 3 caracteres
    const listaPoderes = poderes.split(",").map((poder) => poder.trim());
    const poderesInvalidos = listaPoderes.filter((poder) => poder.length < 3);

    if (poderesInvalidos.length > 0) {
      return res.render("addSuperhero", {
        errores: [
          `Los siguientes poderes no son válidos: ${poderesInvalidos.join(", ")}. Cada poder debe tener al menos 3 caracteres.`,
        ],
        superheroe: req.body, // Mantener los datos ingresados en el formulario
      });
    }

    // Si todo está bien, proceder a crear el superhéroe
    const superheroe = await crearSuperheroe(req.body);

    // Redirigir al dashboard tras crear el superhéroe
    res.redirect("/api/heroes?mensaje=Superhéroe creado con éxito");
  } catch (error) {
    // Manejo genérico de errores
    res.status(500).send("Error interno del servidor");
  }
}

// Actualizar un superhéroe por ID
export async function actualizarSuperheroeController(req, res, render = false) {
  try {
    const { id } = req.params;
    const datosActualizados = req.body;

    const superheroe = await actualizarSuperheroe(id, datosActualizados);
    if (!superheroe) {
      return res.status(404).json({ mensaje: "Superhéroe no encontrado" });
    }

    if (render) {
      return superheroe; // Devuelve el objeto si se llama desde otra función
    } else {
      res.json({
        mensaje: "Superhéroe actualizado con éxito",
        superheroe,
      });
    }
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        mensaje: "Error de validación",
        errores: Object.values(error.errors).map((e) => e.message),
      });
    }
    res.status(500).json({
      mensaje: "Error interno del servidor",
      error: error.message,
    });
  }
}

// Eliminar un superhéroe por ID
export async function eliminarSuperheroeController(req, res) {
  try {
    const { id } = req.params;

    const superheroeEliminado = await eliminarSuperheroe(id);
    if (!superheroeEliminado) {
      return res.status(404).json({ mensaje: "Superhéroe no encontrado" });
    }

    res.redirect("/api/heroes?mensaje=Superhéroe eliminado con éxito");
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al eliminar el superhéroe",
      error: error.message,
    });
  }
}