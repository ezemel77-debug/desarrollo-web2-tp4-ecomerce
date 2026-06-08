import { Router } from 'express';
import { UsuariosAdmin } from '../models/index.js'; 

const router = Router();

// GET /api/products 
router.get('/', async (req, res) => {
    try {
        /*
        Producto.findAll(): Obtiene todos los productos que haya guardados en la DB
        */
        const usuariosAdmin = await UsuariosAdmin.findAll();
        res.status(200).json(usuariosAdmin);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
    }
});

// GET /api/product/:id (Obtener uno producto por su id)
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        /*
        Product.findByPk(id): Similar a findAll, pero obteniendo sólo el registro que coincida con el ID proporcionado.
        */
        const usuario = await UsuariosAdmin.findByPk(id);
        if (usuario) {
            res.status(200).json(usuario);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuario', error: error.message });
    }
});

// POST /api/products (Crear uno nuevo)
router.post('/', async (req, res) => {
    try {
        /*
        Product.create(req.body): Crea un nuevo producto. Recibe un objeto con los atributos que querramos registrar, podemos validar aquí o "confiar" que el objeto viene validado desde el frontend
        */
        const nuevoUsuario = await UsuariosAdmin.create(req.body);
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            // A veces, pueden ocurrir multiples errores a la vez, el detalle lo encontramos en `error.errors`, el cual es un array y podemos mapearlo.
            return res.status(400).json({ message: 'Error de validación', errors: error.errors ? error.errors.map(e => e.message) : error.message });
        }
        res.status(500).json({ message: 'Error al crear usuario', error: error.message });
    }
});

// PUT /api/products/:id (Actualizar uno existente)
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await UsuariosAdmin.findByPk(id);
        if (usuario) {
            /*
            producto.update(req.body): Actualiza la instancia del producto enviandole un objeto con los atributos a reemplazar. 
            Notar que `.update()` es un método de instancia, no estático como `.findAll()`
            */
            const usuarioActualizado = await usuario.update(req.body);
            res.status(200).json(usuarioActualizado);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado para actualizar' });
        }
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ message: 'Error de validación', error: error.message });
        }
        res.status(500).json({ message: 'Error al actualizar usuario', error: error.message });
    }
});

// DELETE /api/products/:id (Eliminar uno)
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        // Product.destroy({ where: { id } }): Elimina el producto filtrando por el campo `id`. Devuelve la cantidad de registros afectados por la eliminación.
        const resultado = await UsuariosAdmin.destroy({ where: { id: id } });
        if (resultado > 0) {
            res.status(200).json({ message: 'Usuario eliminado exitosamente' });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado para eliminar' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar usuario', error: error.message });
    }
});

export default router;
