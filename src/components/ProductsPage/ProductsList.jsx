// ProductsList.jsx
import React from "react";
import Favourite from "../../assets/images/Product/Favourite.svg";
import Cart from "../../assets/images/Product/Cart.svg";
import { addToCart } from "../shared/managementCart/addToCart.jsx";

const ProductsList = ({ products }) => {
    console.log(products)
    return (
        <div className="products-list">
            {products.map(product => (
                <a href={`/product/${product.id}/${encodeURIComponent(product.title)}`} key={product.id} className="products-list__block">
                    <img src={product.image_urls[0]} alt={product.title} className="products-list-img" />
                    <h1 className="products-list-title">{product.title}</h1>
                    <div className="products-list__details">
                        <article>
                            <section className="products-list-slider__actions">
                                <img
                                    src={Favourite}
                                    alt="Favourite"
                                    className="products-list-slider__action"
                                    onClick={e => e.preventDefault()}
                                />
                                <img
                                    src={Cart}
                                    alt="Cart"
                                    className="products-list-slider__action"
                                    onClick={async (e) => {
                                        e.preventDefault();
                                        try {
                                            await addToCart(product.id);
                                        } catch (error) {
                                            console.error("Error adding product to cart:", error.message);
                                        }
                                    }}
                                />
                            </section>
                            <section>
                                <p className="products-list-slider__code">Код: {product.code}</p>
                                <p className="products-list-slider__articul">Артикул: {product.articul}</p>
                            </section>
                        </article>
                        <div className={`products-list-price-component ${product.discount ? "products-list-price-component--with-discount" : "price-component--no-discount"}`}>
                            {product.discount ? (
                                <>
                                    <p className="products-list-price-component__original-price">{product.price} ₴</p>
                                    <p className="products-list-price-component__discount">{product.discount} ₴</p>
                                </>
                            ) : (
                                <p className="products-list-price-component__price">{product.price} ₴</p>
                            )}
                        </div>
                    </div>
                </a>
            ))}
        </div>
    );
};

export default ProductsList;
