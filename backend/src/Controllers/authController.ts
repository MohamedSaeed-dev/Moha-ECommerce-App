import { Request, Response, NextFunction } from "express";
import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { db } from "../../db.server";
dotenv.config();
const ACCESS_JWT_SECRET = process.env.ACCESS_JWT_SECERT || "STRONGKEY";
const REFRESH_JWT_SECRET = process.env.REFRESH_JWT_SECERT || "STRONGKEY";

const SignUp = async (req: Request, res: Response) => {
    try {
        const { username, email, phone, password, role } = req.body;
        const error = handleSignUpData(username, email, phone, password)
        if (error) {
            return res.status(400).json({ message: "incoming data are in incorrect format" })
        }
        const existUser = await db.user.findMany({
            where: {
                OR: [
                    {
                        username: username
                    },
                    {
                        email: email
                    },
                    {
                        phone: phone
                    },
                ]
            }
        })
        if (existUser.length > 0) {
            return res.status(400).json({ message: "User is exist" })
        }
        const hashedPassword = await bcrypt.hashSync(password, 10);
        const accessToken = jwt.sign({
            "username": username,
            "role": role || 'USER'
        }, ACCESS_JWT_SECRET, { expiresIn: '29s' });

        const refreshToken = jwt.sign({
            "username": username,
        }, REFRESH_JWT_SECRET, { expiresIn: '1d' });

        const newUser = await db.user.create({
            data: {
                username: username,
                email: email,
                phone: phone,
                password: hashedPassword,
                role: role || 'USER'
            }
        });
        res.cookie("jwt_token", refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.status(201).json({ message: "User has created successfully", user: newUser, token: accessToken })
    
    }
    catch (e) {
        return res.status(400).json({ message: `something went wrong: ${e} ` })
    }
}

const Login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const error = handleLoginData(username, password);
        if (error) {
            return res.status(400).json({ message: "incoming data are in incorrect format" });
        }
        const user = await db.user.findUnique({
            where: {
                username: username,
            }
        });
        if (!user) {
            return res.status(403).json({ message: "username or password is incorrect" });
        }
        const verifiedPassword = await bcrypt.compare(password, user.password);
        if (!verifiedPassword) {
            return res.status(403).json({ message: "username or password is incorrect" });
        }

        if (user.isBlocked) {
            return res.status(403).json({ message: "You are not allowed to login"})
        }

        const accessToken = jwt.sign({
            username: username,
            role: user.role
        }, ACCESS_JWT_SECRET, { expiresIn: '29s' });

        const refreshToken = jwt.sign({
            username: username,
        }, REFRESH_JWT_SECRET, { expiresIn: '1d' });

        res.cookie("jwt_token", refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({ message: "Logged in successfully", user, accessToken });
    }
    catch (e) {
        return res.status(400).json({ message: `something went wrong: ${e} ` });
    }
}

const refresh = (req: Request, res: Response, next: NextFunction) => {
    const { jwt_token } = req?.cookies;
    if (!jwt_token) return res.status(403).json({ message: 'Forbidden' });

    jwt.verify(jwt_token, REFRESH_JWT_SECRET, async (err: any, decoded: any) => {
        if (err) return res.status(403).json({ message: 'Forbidden' });

        const foundUser = await db.user.findUnique({
            where: {
                username: decoded.username
            }
        });
        if (!foundUser) return res.status(401).json({ message: 'Unauthorized' });

        const accessToken = jwt.sign({
            username: foundUser.username,
            role: foundUser.role || 'USER'
        }, ACCESS_JWT_SECRET, { expiresIn: '29s' });

        res.json({ user: foundUser, accessToken });
    });
}


const logout = (req: Request, res: Response, next: NextFunction) => {
    const { jwt_token } = req?.cookies;
    if (!jwt_token) return res.status(403).json({ message: 'Forbidden' });
    res.clearCookie('jwt_token', { httpOnly: true })
    return res.status(204).json({ message: 'Logged out successfully' });
}


const deleteAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const account = await db.user.findUnique({
            where: {
                id: id,
            }
        });

        if (!account) return res.status(404).json({message : 'Account not found'});

        const deleteUser = await db.user.delete({
            where: {
                id: id,
            }
        });

        if (!deleteUser) return res.status(400).json({ message: 'something went wrong' });
        res.clearCookie("jwt_token", { httpOnly: true });
        return res.status(200).json({message : 'Account deleted successfully'})

    }
    catch (e) {
        return res.status(400).json({ message: `something went wrong: ${e} ` });
    }


};


const editProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, email, imgUrl, phone, password, oldPassword } = req.body;
        const { id } = req.params;

        const user = await db.user.findUnique({
            where: {
                id: id
            }
        })
        if (!user) return res.status(404).json({ message: 'User not found' })
        let newPassword = "";
        if (!(oldPassword === "" || password === "")) {
            const verifyPassword = await bcrypt.compare(oldPassword, user.password)
            if (!verifyPassword) return res.status(401).json({ message: 'Password is incorrect' })
            newPassword = password.length > 7 ? await bcrypt.hashSync(password, 10) : password;
        }
        const profile = await db.user.update({
            where: {
                id: id
            },
            data: {
                username: username.length >= 5 ? username : user.username,
                email: (email.endsWith(".com") && email.includes("@")) ? email : user.email,
                phone: phone.length < 9 ? phone : user.phone,
                imgUrl: imgUrl.length > 0 ? imgUrl : user.imgUrl,
                password: newPassword || user.password
            }
        })

        return res.status(200).json({ message: 'the user data was updated successfully', user: profile })
        
    } catch (e) {
        return res.status(400).json({message : `something went wrong: ${e} `})
    }
}


const handleSignUpData = (username: string, email: string, phone: string, password: string) => {
    if ( (username === '' || username.length < 5) || ( email === '' || !(email.endsWith(".com") && email.includes("@")) ) || (phone === '' || phone.length < 9) || (password === '' || password.length < 7)) {
        return true
    }
    return false
}

const handleProfileData = (username: string, email: string, phone: string, password: string, oldpassword: string) => {
    if ( (username.length < 5) || !(email.endsWith(".com") && email.includes("@"))  || ( phone.length < 9) || ( password.length < 7) || ( oldpassword.length < 7)) {
        return true
    }
    return false
}

const handleLoginData = (username: string, password: string) => {
    if ((username === '' || username.length < 5) || (password === '' || password.length < 7)) {
        return true
    }
    return false
}

export {
    SignUp,
    Login,
    logout,
    refresh,
    editProfile,
    deleteAccount
}