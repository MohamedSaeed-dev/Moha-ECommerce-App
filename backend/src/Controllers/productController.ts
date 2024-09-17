import { Request, Response, NextFunction } from "express";
import * as dotenv from 'dotenv'
import { db } from "../../db.server";

dotenv.config();


const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = Number(req.query?.page);
        const pageSize = Number(req.query?.pageSize);
        const startIndex = (page - 1) * pageSize || 0;
        const endIndex = page * pageSize;
        const allProducts = await db.product.findMany({
            include: {
                Category: true
            }
        });
        const totalPages = Math.ceil(allProducts.length / pageSize);
        const slicedData = allProducts.slice(startIndex, (endIndex || allProducts.length));
        return res.status(200).json({products: slicedData || allProducts, totalpages: totalPages});
    } catch (e) {
        return res.status(400).json({ message: "something went wrong" })
    }
} 

const addProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { productName, quantity, price, discount, description, imgUrl, categoryId } = req.body;
        const alreadyProduct = await db.product.findMany({
            where: {
                productName: productName,
            }
        })
        if (alreadyProduct.length > 0) {
            return res.status(400).json({message: "Product already exists"})
        }
        let newPrice: string = '';
        if (discount) {
            newPrice = ( price as number - (price as number * (discount as number / 100)) ).toString();
        }
        const newProduct = await db.product.create({
            data: {
                productName: productName,
                quantity: quantity,
                price: price,
                discount: discount,
                newPrice: newPrice,
                description: description,
                imgUrl: imgUrl,
                categoryId: categoryId
            }
        })
        return res.status(200).json({ message: "Product created successfully", product: newProduct})
    } catch (e) {
        return res.status(400).json({ message: "something went wrong" })
    }
}


const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const product = await db.product.findUnique({
            where: {
                id: id
            }
        });
        if (!product) {
            return res.status(400).json({ message: 'Product not found'})
        }
        const deletedProduct = await db.product.delete({
            where: {
                id: id
            }
        });
        return res.status(200).json({message: "Product deleted successfully", product: deletedProduct});
    }
    catch (err) {
        return res.status(400).json({ message: "something went wrong" })
    }
}
const editProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, productName, quantity, price, discount, description, imgUrl, categoryId } = req.body;
        const product = await db.product.findUnique({
            where: {
                id: id
            }
        });
        if (!product) {
            return res.status(400).json({ message: 'Product not found'})
        }
        let newPrice: string = '';
        if (discount) {
            newPrice = ( price as number - (price as number * (discount as number / 100)) ).toString();
        }
        const updatedProduct = await db.product.update({
            where: {
                id: id
            },
            data: {
                productName: productName,
                quantity: quantity,
                price: price,
                discount: discount,
                newPrice: newPrice,
                description: description,
                imgUrl: imgUrl,
                categoryId: categoryId
            }
        });
        return res.status(200).json({message: "Product updated successfully", product: updatedProduct});
    }
    catch (err) {
        return res.status(400).json({ message: "something went wrong" })
    }
}

export {
    getAllProducts,
    addProduct,
    deleteProduct,
    editProduct
}