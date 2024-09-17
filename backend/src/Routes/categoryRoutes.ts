import express from "express";
import { verifyToken } from "../middleware/verifyToken";
import { addCategory, deleteCategory, editCategory, getAllCategories } from "../Controllers/categoryController";

const Router = express.Router();

Router.use(verifyToken)

Router.get('/getAllCategories', getAllCategories)
Router.post('/addCategory', addCategory)
Router.delete('/deleteCategory/:id', deleteCategory)
Router.put('/editCategory', editCategory)

export default Router