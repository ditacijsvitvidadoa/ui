import React, { useEffect, useState } from "react";
import Trash from "../../assets/images/CartImages/trash.svg";
import PriceComponent from "../Home/PriceComponent/PriceComponent.jsx";
import {fetchdata} from "../../services/fetchdata.js";
import DeleteFromCart from "../../services/CartFetch/DeleteFromCart.jsx";

function FilledCart() {
    const [products, setProducts] = useState([]);
    const [totalSum, setTotalSum] = useState(0);
    const [counts, setCounts] = useState([]);
    const fetchProducts = async () => {
        try {
            const { data, status } = await fetchdata("/api/get-cart-products");
            if (status !== 200) {
                throw new Error("Ошибка при получении товаров: " + status);
            }
            setProducts(data);
            setCounts(data.map(() => 1));
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        const initialTotal = products.reduce((sum, product, index) => {
            const productPrice = product.discount ? product.discount : product.price;
            return sum + productPrice * counts[index];
        }, 0);
        setTotalSum(initialTotal);
    }, [counts, products]);

    const updateTotal = (index, newCount) => {
        const newCounts = [...counts];
        newCounts[index] = newCount;
        setCounts(newCounts);
    };

    const deleteFromCart = (id) => {
        DeleteFromCart(id)
        window.location.reload()
    }

    return (
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

                    const productPrice = product.discount ? product.discount : product.price;
                    const totalPrice = productPrice * count;

                    return (
                        <article key={product.code} className="cart-product">
                            <img
                                src={product.image_urls[0]}
                                alt={product.title}
                                className="cart-product__img"
                            />
                            <section className="cart-product-content">
                                <img
                                    src={Trash}
                                    alt="trash-svg"
                                    className="cart-product-content__remove"
                                    onClick={() => deleteFromCart(product.id)}
                                    style={{ cursor: "pointer" }}
                                />
                                <h1 className="cart-product-content__title">{product.title}</h1>
                                <div className="cart-product-content__id">
                                    <p>Код: {product.code}</p>
                                    <p>Артикул: {product.articul}</p>
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
                                        price={product.price}
                                        discount={product.discount ? totalPrice : null}
                                    />
                                </div>
                            </section>
                        </article>
                    );
                })}
            </div>
            <a href="/purchase-process" className="cart-design-btn">Оформити</a>
        </section>
    );
}

export default FilledCart;
