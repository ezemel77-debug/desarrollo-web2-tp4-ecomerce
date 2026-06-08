import { Router } from 'express';
// import productRoutes from './src/routes/productRoutes.js'
import productosRoutes from './productosRoutes.js';
// ... aqui importaríamos routers de otros modelos
import categoriasRoutes from './categoriasRoutes.js';
import clientesRoutes from './clientesRoutes.js';
import pedidosRoutes from './pedidosRoutes.js';
import usuariosAdminRoutes from './usuariosAdminRoutes.js';

/*
Indexaremos todos los routers individuales en uno global y declararemos el url estático donde se ubicará cada uno.
*/
const router = Router(); 

router.use('/productos', productosRoutes);
router.use('/categorias', categoriasRoutes);
router.use('/clientes', clientesRoutes);
router.use('/pedidos', pedidosRoutes);
router.use('/usuariosAdmin', usuariosAdminRoutes);

export default router;