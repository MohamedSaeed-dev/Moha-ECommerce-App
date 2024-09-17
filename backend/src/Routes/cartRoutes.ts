import express from "express";
import { verifyToken } from "../middleware/verifyToken";
import { addToCart, deleteCartItem, getCart } from "../Controllers/cartController";

const Router = express.Router();

Router.use(verifyToken)

Router.post('/addToCart', addToCart)
Router.get('/getCart/:id', getCart)
Router.delete('/deleteCartItem/:cartItemId', deleteCartItem)

export default Router