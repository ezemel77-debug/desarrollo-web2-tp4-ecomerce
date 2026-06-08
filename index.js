import app from "./src/app.js";
import { sequelize, testConnection } from "./src/config/database.js";
import Productos from "./src/models/productos.js";
import Categorias from "./src/models/categorias.js";
import Clientes from "./src/models/clientes.js";
import Pedidos from "./src/models/pedidos.js";
import UsuariosAdmin from "./src/models/usuariosAdmin.js";

const startServer = async () => {
  try {
    // Paso A: Verificar la conexión
    await testConnection();

    // Paso B: Crear tablas (si no existen)
    await sequelize.sync({ force: false });
    console.log("✅ Tablas sincronizadas");

    // Paso C: Abrir el puerto
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 App corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("💥 Error fatal:", error);
  }
};

startServer();
