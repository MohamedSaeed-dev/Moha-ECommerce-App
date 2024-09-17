import { Request, Response, NextFunction } from "express";
import * as dotenv from 'dotenv'
import { db } from "../../db.server";

dotenv.config();

const getAllCustomers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const customers = await db.user.findMany({
            where: {
                role: 'USER'
            }
        });
        return res.status(200).json(customers);
    }
    catch (err) {
        return res.status(400).json({ message: "something went wrong" })
    }
}
const deleteCustomer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.body;
        const customer = await db.user.findUnique({
            where: {
                id: id
            }
        });
        if (!customer) {
            return res.status(400).json({ message: 'Customer not found'})
        }
        const deletedCustomer = await db.user.delete({
            where: {
                id: id
            }
        });
        return res.status(200).json({message: "Customer deleted successfully", customer: deletedCustomer});
    }
    catch (err) {
        return res.status(400).json({ message: "something went wrong" })
    }
}
const blockCustomer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.body;
        const customer = await db.user.findUnique({
            where: {
                id: id
            }
        });
        if (!customer) {
            return res.status(400).json({ message: 'Customer not found'})
        }
        const isBloked = customer.isBlocked;
        const blockedCustomer = await db.user.update({
            where: {
                id:id
            },
            data: {
                isBlocked: !isBloked
            }
        });
        return res.status(200).json({ message: !isBloked ? "Customer blocked successfully" : "Customer unblocked successfully", customer: blockedCustomer });
    }
    catch (err) {
        return res.status(400).json({ message: "something went wrong" })
    }
}





export {
    getAllCustomers,
    deleteCustomer,
    blockCustomer
}