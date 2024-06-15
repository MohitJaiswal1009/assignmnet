// routes/addProduct.js
import express from 'express';
import { Product } from '../schema.js';
import nodeCache from '../cache.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const { name, photo, price, stock, category } = req.body;

    if (!name || !photo || !price || !stock || !category) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const newProduct = new Product({
        name,
        photo,
        price,
        stock,
        category,
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    await newProduct.save();

    // Invalidate the cache
    nodeCache.del("products");

    return res.json({
        message: 'Product added successfully',
        product: newProduct
    });
});

export default router;
