import mongoose from "mongoose";

const superheroSchema = new mongoose.Schema({
  nombreSuperHeroe: {
    type: String,
    required: [true, "El nombre del superhéroe es obligatorio"],
    trim: true, // Elimina espacios al principio y al final
    minlength: [3, "El nombre debe tener al menos 3 caracteres"],
    maxlength: [60, "El nombre no puede exceder 60 caracteres"],
  },
  nombreReal: { type: String, required: true, trim: true },
  edad: { type: Number, min: 0, required: true },
  planetaOrigen: { type: String, default: "Desconocido", trim: true },
  debilidad: { type: String, trim: true },
  poderes: [{ type: String, trim: true }],
  aliados: [{ type: String, trim: true }],
  enemigos: [{ type: String, trim: true }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("SuperHero", superheroSchema, "Grupo-14");
