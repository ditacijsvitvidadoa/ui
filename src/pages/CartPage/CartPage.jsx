import React, { useState, useEffect } from "react";

import "./EmptyCart.css";
import "./Cart.css";

import UseBreadcrumbs from "../../components/shared/Breadcrumbs/Breadcrumbs.jsx";
import EmptyCart from "../../components/Cart/EmptyCart.jsx";
import FilledCart from "../../components/Cart/FilledCart.jsx";
import { fetchdata } from "../../services/fetchdata.js";
import GetCartProducts from "../../services/CartFetch/GetCartProducts.jsx";

function CartPage() {
    const [isEmpty, setIsEmpty] = useState(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await GetCartProducts();
                setProducts(data);
                setIsEmpty(data.length === 0);
            } catch (error) {
                console.error("Error fetching products from cart:", error);
                setIsEmpty(true);
            }
        };
        fetchProducts();
    }, []);

    return (
        <>
            <UseBreadcrumbs />
            {(isEmpty === null || isEmpty) ? <EmptyCart /> : <FilledCart products={products} />}
        </>
    );
}

export default CartPage;
