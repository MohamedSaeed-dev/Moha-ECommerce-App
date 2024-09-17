import express from "express";
import { SignUp, Login, refresh, logout, deleteAccount, editProfile } from '../Controllers/authController'

const Router = express.Router()

Router.route('/login').post(Login)
Router.route('/signup').post(SignUp)
Router.route('/refresh').get(refresh)
Router.route('/logout').post(logout)
Router.route('/editProfile/:id').put(editProfile)
Router.route('/deleteAccount/:id').delete(deleteAccount)



export default Router;