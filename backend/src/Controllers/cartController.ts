import { Request, Response, NextFunction } from "express";
import * as dotenv from 'dotenv'
import { db } from "../../db.server";

dotenv.config();

const addToCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { productId, userId } = req.body;
        const isExist = await db.cartItem.findFirst({
                where: {
                    productId: productId,
                }
        });
        if(isExist) return res.status(403).json({message: 'Cart item already exists'})
        const cart = await db.cart.findFirst({
            where: {
                userId: userId,
            }
        });
        if (cart) {
            const cartItem = await db.cartItem.create({
                data: {
                    productId: productId,
                    cartId: cart.id
                }
            });
        }
        else {
            const newCart = await db.cart.create({
                data: {
                    userId: userId,
                }
            });
            const newCartItem = await db.cartItem.create({
                data: {
                    productId: productId,
                    cartId: newCart.id
                }
            })
        }
        return res.status(200).json("the product was created successfully");
    } catch (e) {
        return res.status(400).json({ message: "something went wrong" })
    }
} 

const getCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const getCart = await db.cart.findFirst({
            where: {
                userId: id
            },
            include: {
                CartItem: {
                    include: {
                        product: true
                    }
                }
            }
        });
        return res.status(200).json(getCart);
    } catch (e) {
        return res.status(400).json({ message: "something went wrong" })
    }
};


const deleteCartItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { cartItemId } = req.params;

        const cartItem = await db.cartItem.findUnique({
            where: {
                id: cartItemId
            }
        });

        if (!cartItem) return res.status(404).json({ message: "The cart item does not exist" });

        const deletedItem = await db.cartItem.delete({
            where: {
                id: cartItemId
            }
        });

        if (!deletedItem) return res.status(404).json({ message: "The cart item does not deleted" });
        return res.status(200).json({ message: "Cart item deleted successfully", id: deletedItem.id})

    } catch (e) {
        
    }
}

export {
    addToCart,
    getCart,
    deleteCartItem
}