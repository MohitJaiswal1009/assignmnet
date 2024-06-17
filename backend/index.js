import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import addProduct from './routes/addProduct.js';
import deleteProduct from './routes/deleteProduct.js';
import updateProduct from './routes/updateProduct.js';
import getProduct from './routes/getProduct.js';
//import c from "./middleware/customLogger.js";
//import validateProductFields from "./middleware/validateProductFields";


dotenv.config({});

const app=express();
const PORT=process.env.PORT || 5000;


app.use(express.json());



app.get("/",(req,res)=>{
    res.send("APIs Working");
});

app.use('/api/products', getProduct);
app.use('/api/add',addProduct);
app.use('/api/update', updateProduct);
app.use('/api/delete', deleteProduct);



app.listen(PORT,() => {
    connectDB();
    console.log(`Server listen at port ${PORT}`);
})


