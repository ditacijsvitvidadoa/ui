import React, { useState, useEffect } from "react";

import "./EmptyCart.css";
import "./Cart.css";

import UseBreadcrumbs from "../../components/shared/Breadcrumbs/Breadcrumbs.jsx";
import EmptyCart from "../../assets/images/CartImages/empty-cart.svg";
import FilledCart from "../../components/Cart/FilledCart.jsx";

function CartPage() {
    const IsEmpty = false;

    return (
        <>
            <UseBreadcrumbs />
            {IsEmpty ? (
                <EmptyCart />
            ) : (
                <FilledCart />
            )}
        </>
    );
}

export default CartPage;
