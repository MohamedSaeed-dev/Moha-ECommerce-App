import express from "express";
import { blockCustomer, deleteCustomer, getAllCustomers } from '../Controllers/customerController'
import { verifyToken } from "../middleware/verifyToken";

const Router = express.Router()
Router.use(verifyToken)
Router.route('/getAllCustomers/:id').get(getAllCustomers)
Router.route('/deleteCustomer').post(deleteCustomer)
Router.route('/blockCustomer').put(blockCustomer)




export default Router;