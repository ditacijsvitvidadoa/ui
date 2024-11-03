import React, { useState, useEffect } from "react";

import "./EmptyCart.css";
import "./Cart.css";

import UseBreadcrumbs from "../../components/shared/Breadcrumbs/Breadcrumbs.jsx";
import EmptyCart from "../../components/Cart/EmptyCart.jsx";
import FilledCart from "../../components/Cart/FilledCart.jsx";
import { fetchdata } from "../../services/fetchdata.js";

function CartPage() {
    const [IsEmpty, SetEmpty] = useState(null);
    const [product, setProduct] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetchdata(`/api/get-cart-products`);
                if (response.status === 204) {
                    SetEmpty(true);
                }else if (response.status === 200 && response.data.length > 0) {
                    setProduct(response.data);
                    SetEmpty(false);
                }  else {
                    console.warn(`Failed to fetch product: Status ${response.status}`);
                }
            } catch (error) {
                console.error("Error fetching product:", error.message);
            }
        };
        fetchProduct();
    }, []);

    return (
        <>
            <UseBreadcrumbs />
            {IsEmpty === null ? (
                <p>Loading...</p>
            ) : IsEmpty ? (
                <EmptyCart />
            ) : (
                <FilledCart products={product} />
            )}
        </>
    );
}

export default CartPage;
