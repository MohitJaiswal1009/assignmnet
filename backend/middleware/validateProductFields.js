const validateProductFields = (req, res, next) => {
    const { name, photo, price, stock, category } = req.body;
    if (!name || !photo || !price || !stock || !category) {
        return res.status(400).json({ error: 'All fields are required' });
    }
   next();
//    res.json({
//     message:"hello"
//    });
   
};

export default validateProductFields;
