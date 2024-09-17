
import AddProduct from './Admin/AddProduct';
import Customers from './Admin/Customers';
import EditProduct from './Admin/EditProduct';
import Layout from './Admin/Layout';
import { Main } from './Admin/Main';
import Orders from './Admin/Orders';
import Products from './Admin/Products';
import App from './App'
import Login from './Auth/Login'
import SignUp from './Auth/Signup'
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Carts from './Admin/Carts';
import Category from './Admin/Category';
import AddCategory from './Admin/AddCategory';
import EditCategory from './Admin/EditCategory';
import Profile from './Admin/Profile';
import { useContext } from 'react';
import PersistUser from './Auth/PersistUser';
import { AuthContext } from './Auth/AuthContext';
import {jwtDecode} from 'jwt-decode';
import Cookies from "universal-cookie";
const Root = () => {
    return (
        <>
            <Routes>

                <Route element={<PersistUser />}>
                    <Route element={<AuthAdmin />}>
                        <Route path='dashboard' element={<Layout />}>
                            <Route index element={<Main />} />
                            <Route path='main' element={<Main />}></Route>
                            <Route path='profile' element={<Profile />}></Route>
                            <Route path='products' element={<Products />}></Route>
                            <Route path="products/add-product" element={<AddProduct />}></Route>
                            <Route path="products/edit-product" element={<EditProduct />}></Route>
                            <Route path="orders" element={<Orders />}></Route>
                            <Route path="categories" element={<Category />}></Route>
                            <Route path="categories/add-category" element={<AddCategory />}></Route>
                            <Route path="categories/edit-category" element={<EditCategory />}></Route>
                            <Route path="carts" element={<Carts />}></Route>
                            <Route path="customers" element={<Customers />}></Route>
                        </Route>
                    </Route>
                    <Route element={<AuthUser />}>
                        <Route path='moha' element={<App />}></Route>
                    </Route>
                </Route>

                <Route element={<AuthLogin />}>
                    <Route path='login' element={<Login />}></Route>
                    <Route path='signup' element={<SignUp />}></Route>
                </Route>
                

                <Route path='*' element={<App />}></Route>
            </Routes>
        </>
    )
};

function AuthAdmin() {
  const { user } = useContext(AuthContext);
  if (user.user) {
    return user.user.role === "ADMIN" ? <Outlet /> : <Navigate to="/moha" replace />;
  }
  return <Navigate to="/login" replace />;
}

function AuthUser() {
  const { user } = useContext(AuthContext);
  if (user.user) {
    return user.user.role === "USER" ? <Outlet /> : <Navigate to="/dashboard" replace />;
  }
  return <Navigate to="/login" replace />;
}


const AuthLogin = () => {
    const cookie = new Cookies();
    const token = cookie.get("Bearer") ? jwtDecode(cookie.get("Bearer")) : '';
    if (token) {
        return token.role === "USER" ? <Navigate to="/moha" replace /> : <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};




export default Root