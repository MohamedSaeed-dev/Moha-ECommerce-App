import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config();

const ACCESS_JWT_SECRET = process.env.ACCESS_JWT_SECERT || "STRONGKEY";
const REFRESH_JWT_SECRET = process.env.REFRESH_JWT_SECERT || "STRONGKEY";


const verifyToken = (req: any, res: Response, next: NextFunction) => {
    const authHeader:string = req.headers.authorization.toString()
    if (!(authHeader?.startsWith("Bearer "))) return res.status(401).json({ message: 'UnAuthorized' });

    const token = authHeader.split(" ")[1];
    jwt.verify(token, ACCESS_JWT_SECRET, (err: any, user:any) => {
        if (err) return res.status(401).json({ message: `UnAuthorized` });
        req.user = user
        next();
    })

}

export { verifyToken };