import express from "express";
import { verifyToken } from "../middleware/verifyToken";
import { addProduct, deleteProduct, editProduct, getAllProducts } from "../Controllers/productController";

const Router = express.Router();


Router.get('/getAllProducts', getAllProducts)
Router.use(verifyToken)
Router.post('/addProduct', addProduct)
Router.delete('/deleteProduct/:id', deleteProduct)
Router.put('/editProduct', editProduct)

export default Router