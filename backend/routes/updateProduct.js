// routes/updateProduct.js
import express from 'express';
import { Product } from '../schema.js';
import nodeCache from '../cache.js';

const router = express.Router();

router.put('/', async (req, res) => {
    const product = await Product.findById(req.query.id);
    product.name = req.body.name;

    await product.save();

    // Invalidate the cache
    nodeCache.del("products");

    return res.json({
        success: true,
        message: "Product updated successfully"
    });
});

export default router;
