import SuperHeroRepository from "../repositories/SuperHeroRepository.mjs";

export async function obtenerTodosLosSuperheroe() {
  return await SuperHeroRepository.obtenerTodos();
}

export async function obtenerSuperheroePorId(id) {
  return await SuperHeroRepository.obtenerPorId(id);
}

export async function crearSuperheroe(superheroe) {
  if (superheroe.poderes) {
    // Dividir poderes en un array, eliminando espacios innecesarios
    const poderesArray = superheroe.poderes.split(",").map(poder => poder.trim());

    // Validar que cada poder tenga al menos 3 caracteres
    const poderesInvalidos = poderesArray.filter(poder => poder.length < 3);
    if (poderesInvalidos.length > 0) {
      throw new Error(
        `Los siguientes poderes no son válidos (menos de 3 caracteres): ${poderesInvalidos.join(", ")}`
      );
    }

    // Asignar el array validado al objeto superhéroe
    superheroe.poderes = poderesArray;
  }

  return await SuperHeroRepository.crear(superheroe);
}

export async function actualizarSuperheroe(id, datos) {
  return await SuperHeroRepository.actualizar(id, datos);
}

export async function eliminarSuperheroe(id) {
  return await SuperHeroRepository.eliminar(id);
}
