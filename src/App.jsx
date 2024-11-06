// App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage.jsx";
import NotFound from "./components/NotFound/NotFound";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer.jsx";
import CartPage from "./pages/CartPage/CartPage.jsx";
import AccountPage from "./pages/AccountPage/AccountPage.jsx";
import ProductsPage from "./components/ProductsPage/ProductsPage.jsx";
import LogIn from "./components/LogIn/LogIn.jsx";
import {fetchdata} from "./services/fetchdata.js";
import {AuthProvider} from "./components/shared/context/AuthContext.jsx";
import SignUp from "./components/SignUp/SignUp.jsx";
import AllProductsPage from "./pages/AllProductsPage/AllProductsPage.jsx";
import ProductPage from "./pages/ProductPage/ProductPage.jsx";
import PurchaseProcessPage from "./pages/PurchaseProcessPage/PurchaseProcessPage.jsx";
import AdminPanelPage from "./pages/AdminPanelPage/AdminPanelPage.jsx";
import PrivacyPolicy from "./pages/TamplatePages/PrivacyPolicy.jsx";
import PaymentDelivery from "./pages/TamplatePages/PaymentDelivery.jsx";
import Temps from "./pages/TamplatePages/Temps.jsx";
import Returns from "./pages/TamplatePages/Returns.jsx";
import CompanyHistory from "./pages/TamplatePages/CompanyHistory.jsx";
import Values from "./pages/TamplatePages/Values.jsx";

function App() {
    return (
        <AuthProvider>
            <Router>
                <MainLayout />
            </Router>
        </AuthProvider>
    );
}

function MainLayout() {
    const location = useLocation();
    const isAdminPanel = location.pathname === "/admin-panel";

    return (
        <>
            {!isAdminPanel && <Header />}
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/products" element={<AllProductsPage />} />
                <Route path="/account/login" element={<LogIn />} />
                <Route path="/account/sign-up" element={<SignUp />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/product/:id/:title" element={<ProductPage />} />
                <Route path="/purchase-process" element={<PurchaseProcessPage />} />
                <Route path="/admin-panel" element={<AdminPanelPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/payment-delivery" element={<PaymentDelivery />} />
                <Route path="/terms" element={<Temps />} />
                <Route path="/returns" element={<Returns />} />
                <Route path="/company-history" element={<CompanyHistory />} />
                <Route path="/values" element={<Values />} />
            </Routes>
            {!isAdminPanel && <Footer />}
        </>
    );
}

export default App;
