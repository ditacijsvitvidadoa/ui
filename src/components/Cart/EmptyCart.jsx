import React from "react";


function EmptyCart() {
    return (
        <section className="empty-cart">
            <img src={EmptyCart} alt={EmptyCart} className="empty-cart__img"/>
            <h1 className="empty-cart__h1">Нічого немає</h1>
            <p className="empty-cart__p">Це треба виправити!</p>
            <a href="#" className="empty-cart__btn">Наповнити кошик</a>
        </section>
    )
}