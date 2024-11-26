import SuperHeroRepository from "../repositories/SuperHeroRepository.mjs";
import mongoose from "mongoose";

export async function obtenerSuperheroePorId(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("ID inválido");
  }
  return await SuperHeroRepository.obtenerPorId(id);
}

export async function obtenerTodosLosSuperheroe() {
  return await SuperHeroRepository.obtenerTodos();
}

export async function buscarSuperheroePorAtributo(atributo, valor) {
  if (!atributo || !valor) {
    throw new Error("Atributo o valor no proporcionados");
  }
  return await SuperHeroRepository.buscarPorAtributo(atributo, valor);
}

export async function obtenerSuperheroesMayoresDe30() {
  return await SuperHeroRepository.obtenerMayoresDe30();
}

export async function crearSuperheroe(superheroe) {
  if (!superheroe.nombreSuperHeroe || !superheroe.nombreReal || !superheroe.edad) {
    throw new Error("Faltan campos obligatorios");
  }
  return await SuperHeroRepository.crear(superheroe);
}

export async function actualizarSuperheroe(id, datos) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("ID inválido");
  }

  const superheroe = await SuperHeroRepository.actualizar(id, datos);
  if (!superheroe) {
    throw new Error("Superhéroe no encontrado");
  }

  return superheroe;
}

export async function eliminarSuperheroe(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("ID inválido");
  }

  const resultado = await SuperHeroRepository.eliminar(id);
  if (!resultado) {
    throw new Error("Superhéroe no encontrado");
  }

  return resultado;
}


export async function eliminarSuperheroePorNombre(nombre) {
  return await SuperHeroRepository.eliminarPorNombre(nombre);
}