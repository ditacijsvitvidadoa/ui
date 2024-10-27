// App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage.jsx";
import NotFound from "./components/NotFound/NotFound";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer.jsx";
import CartPage from "./pages/CartPage/CartPage.jsx";
import AccountPage from "./pages/AccountPage/AccountPage.jsx";
import ProductsPage from "./components/ProductsPage/ProductsPage.jsx";
import LogIn from "./components/LogIn/LogIn.jsx";
import {fetchdata} from "./components/shared/fetchData/fetchdata.js";
import {AuthProvider} from "./components/shared/context/AuthContext.jsx";
import SignUp from "./components/SignUp/SignUp.jsx";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Header/>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/cart" element={<CartPage/>}/>
                    <Route path="/account" element={<AccountPage/>}/>
                    <Route path="/products" element={<ProductsPage/>}/>
                    <Route path="/account/login" element={<LogIn/>}/>
                    <Route path="/account/sign-up" element={<SignUp/>} />
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
                <Footer/>
            </Router>
        </AuthProvider>
    );
}

export default App;
