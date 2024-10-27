import products from "./dummy_data.json";
import Trash from "../../assets/images/CartImages/trash.svg";
import PriceComponent from "../Home/PriceComponent/PriceComponent.jsx";
import React, {useEffect, useState} from "react";


function FilledCart() {
    const [totalSum, setTotalSum] = useState(0);
    const [counts, setCounts] = useState(products.map(() => 1));

    useEffect(() => {
        const initialTotal = products.reduce((sum, product, index) => {
            const productPrice = product.Discount ? product.Discount : product.Price;
            return sum + productPrice * counts[index];
        }, 0);
        setTotalSum(initialTotal);
    }, [counts]);

    const updateTotal = (index, newCount) => {
        const newCounts = [...counts];
        newCounts[index] = newCount;
        setCounts(newCounts);
    };

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
    )
}

export default FilledCart;