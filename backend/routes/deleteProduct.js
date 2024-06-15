// routes/deleteProduct.js
import express from 'express';
import { Product } from '../schema.js';
import nodeCache from '../cache.js';

const router = express.Router();

router.delete('/:id', async (req, res) => {
    const productId = req.params.id;

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
        return res.status(404).json({ error: 'Product not found' });
    }

    // Invalidate the cache
    nodeCache.del("products");

    return res.json({
        success: true,
        message: "Product deleted successfully"
    });
});

export default router;
