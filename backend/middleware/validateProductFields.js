// middleware/validateProductFields.js

const validateProductFields = (req, res, next) => {
    try {
        const { name, photo, price, stock, category } = req.body;
        
        if (!name || !photo || !price || !stock || !category) {
            throw new Error('All fields are required');
        }

        next(); // Call next to pass control to the next middleware or route handler
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

export default validateProductFields;

