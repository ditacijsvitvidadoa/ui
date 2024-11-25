import BrokeHeart from "../../assets/images/Favourite/break-favourite.svg";
import React from "react";

export default function EmptyFavourites() {
    return (
        <section className="empty-favoutites">
            <img src={BrokeHeart || ""} alt="broke heart" className="empty-favoutites__img"/>
            <h1 className="empty-favoutites__h1">У вас немає улюблених товарів!</h1>
            <p className="empty-favoutites__p">Ви не додали ще жодного товару до улюблених</p>
            <a href="/products" className="empty-cart__btn">Перейти до товарів</a>
        </section>
    )
}