import express from "express";
import methodOverride from "method-override";
import path from "path";
import { connectDB } from "./config/dbConfig.mjs";
import superHeroRoutes from "./routes/superHeroRoutes.mjs";

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración del motor de vistas
app.set("view engine", "ejs");
app.set("views", path.resolve("views"));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method")); // Interpreta _method en los formularios
// Conexión a la base de datos
connectDB();

// Rutas
app.use("/api", superHeroRoutes);

// Middleware para rutas no encontradas
app.use((req, res) => {
  res.status(404).send({ mensaje: "Ruta no encontrada" });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

// http://localhost:3000/api/heroes/agregar  es la dirección