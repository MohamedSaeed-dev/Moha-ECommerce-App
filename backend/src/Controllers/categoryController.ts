import { Request, Response, NextFunction } from "express";
import * as dotenv from 'dotenv'
import { db } from "../../db.server";

dotenv.config();


const getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = Number(req.query?.page);
        const pageSize = Number(req.query?.pageSize);
        const startIndex = (page - 1) * pageSize || 0;
        const endIndex = page * pageSize;

        const allCategories = await db.category.findMany({
            include: {
                Products: true
            }
        });
        const totalPages = Math.ceil(allCategories.length / pageSize);
        const slicedData = allCategories.slice(startIndex, (endIndex || allCategories.length));
        return res.status(200).json({categories: slicedData || allCategories, totalPages: totalPages});
    } catch (e) {
        return res.status(400).json({ message: "something went wrong" })
    }
};


const addCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { categoryName } = req.body;
        const alreadyCategory = await db.category.findMany({
            where: {
                categoryName: categoryName
            },
        })
        if (alreadyCategory.length > 0) {
            return res.status(400).json({message: "Category already exists"})
        }
        const newCategory = await db.category.create({
            data: {
                categoryName: categoryName
            }
        })
        return res.status(200).json({ message: "Category created successfully", category: newCategory})
    } catch (e) {
        return res.status(400).json({ message: "something went wrong" })
    }
}


const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const category = await db.category.findUnique({
            where: {
                id: id
            }
        });
        if (!category) {
            return res.status(400).json({ message: 'Category not found'})
        }
        const deletedCategory = await db.category.delete({
            where: {
                id: id
            }
        });
        return res.status(200).json({message: "Category deleted successfully", category: deletedCategory});
    }
    catch (err) {
        return res.status(400).json({ message: "something went wrong" , e:err })
    }
}
const editCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, categoryName } = req.body;
        const category = await db.category.findUnique({
            where: {
                id: id
            }
        });
        if (!category) {
            return res.status(400).json({ message: 'Category not found'})
        }
        const updatedCategory = await db.category.update({
            where: {
                id: id
            },
            data: {
                categoryName: categoryName
            }
        });
        return res.status(200).json({message: "Category updated successfully", category: updatedCategory});
    }
    catch (err) {
        return res.status(400).json({ message: "something went wrong" })
    }
}

export {
    getAllCategories,
    addCategory,
    deleteCategory,
    editCategory
}