import React from "react";
import emptyCart from "../../assets/images/CartImages/empty-cart.svg";


export default function EmptyCart() {
    return (
        <section className="empty-cart">
            <img src={emptyCart} alt={emptyCart} className="empty-cart__img"/>
            <h1 className="empty-cart__h1">Нічого немає</h1>
            <p className="empty-cart__p">Це треба виправити!</p>
            <a href="#" className="empty-cart__btn">Наповнити кошик</a>
        </section>
    )
}