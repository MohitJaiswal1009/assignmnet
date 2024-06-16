import express from 'express';
import { Product } from '../schema.js';
import nodeCache from '../cache.js';

const router = express.Router();

router.put('/', async (req, res) => {
    try {
        const product = await Product.findById(req.query.id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        // Update product fields dynamically
        const updates = req.body;
        for (const key in updates) {
            if (product[key] !== undefined) {
                product[key] = updates[key];
            }
        }

        await product.save();

        // Invalidate the cache
        nodeCache.del("products");

        return res.json({
            success: true,
            message: "Product updated successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

export default router;

