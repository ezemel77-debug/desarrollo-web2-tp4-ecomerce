import { Router } from 'express';
import { Clientes } from '../models/index.js'; 

const router = Router();

// GET /api/products 
router.get('/', async (req, res) => {
    try {
        /*
        Producto.findAll(): Obtiene todos los productos que haya guardados en la DB
        */
        const clientes = await Clientes.findAll();
        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener clientes', error: error.message });
    }
});

// GET /api/product/:id (Obtener uno producto por su id)
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        /*
        Product.findByPk(id): Similar a findAll, pero obteniendo sólo el registro que coincida con el ID proporcionado.
        */
        const cliente = await Clientes.findByPk(id);
        if (cliente) {
            res.status(200).json(cliente);
        } else {
            res.status(404).json({ message: 'Cliente no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener cliente', error: error.message });
    }
});

// POST /api/products (Crear uno nuevo)
router.post('/', async (req, res) => {
    try {
        /*
        Product.create(req.body): Crea un nuevo producto. Recibe un objeto con los atributos que querramos registrar, podemos validar aquí o "confiar" que el objeto viene validado desde el frontend
        */
        const nuevoCliente = await Clientes.create(req.body);
        res.status(201).json(nuevoCliente);
    } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            // A veces, pueden ocurrir multiples errores a la vez, el detalle lo encontramos en `error.errors`, el cual es un array y podemos mapearlo.
            return res.status(400).json({ message: 'Error de validación', errors: error.errors ? error.errors.map(e => e.message) : error.message });
        }
        res.status(500).json({ message: 'Error al crear cliente', error: error.message });
    }
});

// PUT /api/products/:id (Actualizar uno existente)
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const cliente = await Clientes.findByPk(id);
        if (cliente) {
            /*
            producto.update(req.body): Actualiza la instancia del producto enviandole un objeto con los atributos a reemplazar. 
            Notar que `.update()` es un método de instancia, no estático como `.findAll()`
            */
            const clienteActualizado = await cliente.update(req.body);
            res.status(200).json(clienteActualizado);
        } else {
            res.status(404).json({ message: 'Producto no encontrado para actualizar' });
        }
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ message: 'Error de validación', error: error.message });
        }
        res.status(500).json({ message: 'Error al actualizar cliente', error: error.message });
    }
});

// DELETE /api/products/:id (Eliminar uno)
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        // Product.destroy({ where: { id } }): Elimina el producto filtrando por el campo `id`. Devuelve la cantidad de registros afectados por la eliminación.
        const resultado = await Clientes.destroy({ where: { id: id } });
        if (resultado > 0) {
            res.status(200).json({ message: 'Cliente eliminado exitosamente' });
        } else {
            res.status(404).json({ message: 'Cliente no encontrado para eliminar' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar cliente', error: error.message });
    }
});

export default router;
