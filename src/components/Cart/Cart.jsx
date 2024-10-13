import React, { useState, useEffect } from "react";

import "./css/EmptyCart.css";
import "./css/Cart.css";

import UseBreadcrumbs from "../shared/Breadcrumbs/Breadcrumbs.jsx";
import EmptyCart from "./images/empty-cart.svg";
import Trash from "./images/trash.svg";
import products from "./dummy_data.json";
import PriceComponent from "../shared/PriceComponent/PriceComponent.jsx";

function Cart() {
    const IsEmpty = false;
    const [totalSum, setTotalSum] = useState(0);
    const [counts, setCounts] = useState(products.map(() => 1)); // Инициализируем количество для каждого товара

    useEffect(() => {
        // Рассчитываем общую сумму при инициализации, используя цену со скидкой, если она есть
        const initialTotal = products.reduce((sum, product, index) => {
            const productPrice = product.Discount ? product.Discount : product.Price;
            return sum + productPrice * counts[index];
        }, 0);
        setTotalSum(initialTotal);
    }, [counts]); // Общая сумма будет пересчитываться, когда изменяется `counts`

    const updateTotal = (index, newCount) => {
        const newCounts = [...counts];
        newCounts[index] = newCount;
        setCounts(newCounts); // Обновляем состояние с новыми количествами
    };

    return (
        <>
            <UseBreadcrumbs />
            {IsEmpty ? (
                <section className="empty-cart">
                    <img src={EmptyCart} alt={EmptyCart} className="empty-cart__img" />
                    <h1 className="empty-cart__h1">Нічого немає</h1>
                    <p className="empty-cart__p">Це треба виправити!</p>
                    <a href="#" className="empty-cart__btn">Наповнити кошик</a>
                </section>
            ) : (
                <section className="cart">
                    <p className="cart__total-price">
                        Всього: <span>{totalSum} ₴</span>
                    </p>
                    <div>
                        {products.map((product, index) => {
                            const count = counts[index];

                            const increment = () => {
                                updateTotal(index, count + 1);
                            };

                            const decrement = () => {
                                if (count > 1) {
                                    updateTotal(index, count - 1);
                                }
                            };

                            // Если есть скидка, используем её вместо обычной цены
                            const productPrice = product.Discount ? product.Discount : product.Price;
                            const totalPrice = productPrice * count;

                            return (
                                <article key={product.Code} className="cart-product">
                                    <img
                                        src={product.Image_url}
                                        alt={product.Title}
                                        className="cart-product__img"
                                    />
                                    <section className="cart-product-content">
                                        <img
                                            src={Trash}
                                            alt="trash-svg"
                                            className="cart-product-content__remove"
                                        />
                                        <h1 className="cart-product-content__title">{product.Title}</h1>
                                        <div className="cart-product-content__id">
                                            <p>Код: {product.Code}</p>
                                            <p>Артикул: {product.Articul}</p>
                                        </div>
                                        <div className="cart-product-content__counter">
                                            <p
                                                onClick={decrement}
                                                className="cart-product-content__counter-decrement"
                                            >
                                                -
                                            </p>
                                            <p className="cart-product-content__counter-value">{count}</p>
                                            <p
                                                onClick={increment}
                                                className="cart-product-content__counter-increment"
                                            >
                                                +
                                            </p>
                                        </div>
                                        <div className="product-price">
                                            <PriceComponent
                                                price={totalPrice}
                                                discount={product.Discount ? totalPrice : null}
                                            />
                                        </div>
                                    </section>
                                </article>
                            );
                        })}
                    </div>
                    <div className="cart-design-btn">Оформити</div>
                </section>
            )}
        </>
    );
}

export default Cart;
