// routes/getProducts.js
import express from 'express';
import { Product } from '../schema.js';
import nodeCache from '../cache.js';

const router = express.Router();

router.get('/', async (req, res) => {
    let products;
    if (nodeCache.has("products")) {
        products = JSON.parse(nodeCache.get("products"));
    } else {
        products = await Product.find({});
        nodeCache.set("products", JSON.stringify(products));
    }
    return res.json({
        success: true,
        products,
    });
});

export default router;
