import express from 'express';
import { Product } from '../schema.js';
import nodeCache from '../cache.js';
import validateProductFields from '../middleware/validateProductFields.js';

const router = express.Router();

// Apply the validateProductFields middleware to the POST route
router.post('/', validateProductFields, async (req, res) => {
    try {
        const { name, photo, price, stock, category } = req.body;

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
            success: true,
            message: 'Product added successfully',
            product: newProduct
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

export default router;
