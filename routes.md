### Paso 4: Creación de Rutas CRUD para los Modelos

En este paso, implementaremos las operaciones básicas de **C**rear, **R**ecuperar (Leer), **A**ctualizar y **D**estruir (CRUD) para nuestro modelo `Product`.

1.  **Organización de Rutas:**
    Para mantener nuestro código organizado, crearemos una carpeta `src/routes` y dentro de ella, un archivo de rutas por cada modelo que necesitemos implementar, además de un archivo indexador (`index.js`).
   

2.  **Rutas para el Modelo `Product`:**
    Crea el archivo `src/routes/productRoutes.js`:

    ```javascript
    // src/routes/producto.routes.js
    import { Router } from 'express';
    import { Product } from '../models/index.js'; 

    const router = Router();

    // GET /api/products 
    router.get('/', async (req, res) => {
        try {
            /*
            Producto.findAll(): Obtiene todos los productos que haya guardados en la DB
            */
            const productos = await Product.findAll();
            res.status(200).json(productos);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener productos', error: error.message });
        }
    });

    // GET /api/product/:id (Obtener uno producto por su id)
    router.get('/:id', async (req, res) => {
        try {
            const { id } = req.params;
            /*
            Product.findByPk(id): Similar a findAll, pero obteniendo sólo el registro que coincida con el ID proporcionado.
            */
            const product = await Product.findByPk(id);
            if (product) {
                res.status(200).json(product);
            } else {
                res.status(404).json({ message: 'Producto no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener producto', error: error.message });
        }
    });

    // POST /api/products (Crear uno nuevo)
    router.post('/', async (req, res) => {
        try {
            /*
            Product.create(req.body): Crea un nuevo producto. Recibe un objeto con los atributos que querramos registrar, podemos validar aquí o "confiar" que el objeto viene validado desde el frontend
            */
            const nuevoProducto = await Product.create(req.body);
            res.status(201).json(nuevoProducto);
        } catch (error) {
            if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
                // A veces, pueden ocurrir multiples errores a la vez, el detalle lo encontramos en `error.errors`, el cual es un array y podemos mapearlo.
                return res.status(400).json({ message: 'Error de validación', errors: error.errors ? error.errors.map(e => e.message) : error.message });
            }
            res.status(500).json({ message: 'Error al crear producto', error: error.message });
        }
    });

    // PUT /api/products/:id (Actualizar uno existente)
    router.put('/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const producto = await Product.findByPk(id);
            if (producto) {
                /*
                producto.update(req.body): Actualiza la instancia del producto enviandole un objeto con los atributos a reemplazar. 
                Notar que `.update()` es un método de instancia, no estático como `.findAll()`
                */
                const productoActualizado = await producto.update(req.body);
                res.status(200).json(productoActualizado);
            } else {
                res.status(404).json({ message: 'Producto no encontrado para actualizar' });
            }
        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                return res.status(400).json({ message: 'Error de validación', error: error.message });
            }
            res.status(500).json({ message: 'Error al actualizar producto', error: error.message });
        }
    });

    // DELETE /api/products/:id (Eliminar uno)
    router.delete('/:id', async (req, res) => {
        try {
            const { id } = req.params;
            // Product.destroy({ where: { id } }): Elimina el producto filtrando por el campo `id`. Devuelve la cantidad de registros afectados por la eliminación.
            const resultado = await Product.destroy({ where: { id: id } });
            if (resultado > 0) {
                res.status(200).json({ message: 'Producto eliminado exitosamente' });
            } else {
                res.status(404).json({ message: 'Producto no encontrado para eliminar' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar producto', error: error.message });
        }
    });

    export default router;
    ```

3.  **Indexar rutas de Product en `src/routes/index.js`:**

    ```javascript
    // src/routes/index.js
    import { Router } from 'express';
    import productRoutes from './src/routes/productRoutes.js'
    // ... aqui importaríamos routers de otros modelos

    /*
    Indexaremos todos los routers individuales en uno global y declararemos el url estático donde se ubicará cada uno.
    */
    const router = Router(); 
    
    app.use('/api/products', productRoutes)
    
    export default router;
    ```

4.  **Cargamos las Rutas en `app.js`:**
    Modifica tu archivo `app.js` para cargar rutas:

    ```javascript
    // src/app.js 

    // ... 
    import routes from './routes/index.js';
    // ... 


    // --- Montar las rutas (antes de `app.listen(...)`) ---
    app.use('/', routes);
    // ... 

    ```

5. **Consideraciones Adicionales y Próximos Pasos:**

    *   **Pruebas:** Ahora puedes usar herramientas como Postman o Insomnia para probar tus endpoints CRUD.
        *   `GET http://localhost:${PORT}/api/products`
        *   `POST http://localhost:${PORT}/api/products` con un cuerpo JSON como `{"name": "Harina 000", "price": 750}`
        *   Y así sucesivamente para los demás modelos y operaciones.
    *   **Validación Avanzada:** Para aplicaciones más robustas, querrás implementar validaciones más detalladas de los datos de entrada. Bibliotecas como `express-validator` o `joi` son excelentes para esto.
    *   **Manejo de Errores Centralizado:** Puedes crear un *middleware* de manejo de errores en Express para capturar y responder a los errores de una manera más consistente.
    *   **Controladores:** A medida que la lógica de tus rutas crece, es una buena práctica separar la lógica de manejo de solicitudes en archivos de "controladores" (siguiendo el patrón Modelo-Vista-Controlador o similar), manteniendo los archivos de rutas más limpios y enfocados en el enrutamiento.