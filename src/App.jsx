import React from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout.jsx";
import Home from "./Components/Home/Home.jsx";
import Cart from "./Components/Cart/Cart.jsx";
import Products from "./Components/Products/Products.jsx";
import Categories from "./Components/Categories/Categories.jsx";
import Brands from "./Components/Brands/Brands.jsx";
import Login from "./Components/Login/Login.jsx";
import Register from "./Components/Register/Register.jsx";
import Notfound from "./Components/Notfound/Notfound.jsx";
import UserContextProvider from "./context/UserContext.jsx";
import CartContextProvider from "./context/CartContext"; 
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute.jsx";
import ProductDetails from "./Components/ProductDetails/ProductDetails.jsx";
import Checkout from "./Components/Checkout/Checkout.jsx";
import Allorders from "./Components/Allorders/Allorders.jsx";
import Wishlist from "./Components/Wishlist/Wishlist.jsx";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword.jsx";
import Code from "./Components/ForgetPassword/Code.jsx";
import NewPassword from "./Components/ForgetPassword/NewPassword.jsx";

let x = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { path: "/", element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: "brands", element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "productdetails/:id/:category", element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
      { path: "products", element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: "checkout", element: <ProtectedRoute><Checkout /></ProtectedRoute> },
      { path: "fresh-cart-ecommerce-bay.vercel.app/allorders", element: <ProtectedRoute><Allorders /></ProtectedRoute> },
      { path: "categories", element: <ProtectedRoute><Categories /></ProtectedRoute> },
      { path: "wishlist", element: <ProtectedRoute><Wishlist /></ProtectedRoute> },
      { path: "forgetpassword", element: <ForgetPassword /> },
      { path: "code", element: <Code /> },
      { path: "newpassword", element: <NewPassword /> },
      { path: "*", element: <Notfound /> },
    ],
  },
]);

function App() {
  return (
    <>
      <UserContextProvider>
        <CartContextProvider> 
            <RouterProvider router={x}></RouterProvider>
        </CartContextProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
