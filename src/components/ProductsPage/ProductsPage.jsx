import React, { useEffect, useState } from "react";
import FilterBlock from "./FilterGroup.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchdata } from "../../services/fetchdata.js";
import filters from './dummy_data.json';
import "../../pages/AllProductsPage/AllProductsPage.css";
import Favourite from "../../assets/images/Product/favorites.jsx";
import Cart from "../../assets/images/Product/cart.jsx";
import { addToCart } from "../shared/managementCart/addToCart.jsx";
import ItemsPerPage from "./ProductsPageElements/itemsPerPage.jsx";
import RangeSlider from "./ProductsPageElements/RangeInput.jsx";
import SortProducts from "./ProductsPageElements/sortProducts.jsx";

function ProductsPage() {

    return (
        <>
            <div className="products-block">
                <div className="products-filters">
                    <FilterBlock title="Ціна">
                        <div className="products-price-filter">
                            <p>{value[0]}</p>
                            <div className="products-price-filter-stick"></div>
                            <p>{value[1]}</p>
                        </div>
                        <RangeSlider min={details.min_price_product.price} max={details.max_price_product.price}
                                     step={1} value={value} onChange={setValue} isShowTooltip={true}/>
                        <div className="products-price-filter__buttons">
                            <button className="products-price-filter__btn" onClick={handleResetClick}>Скинути</button>
                            <button className="products-price-filter__btn" onClick={handleApplyClick}>Застосувати</button>
                        </div>
                    </FilterBlock>
                    {["categories", "age", "brand", "material", "type"].map(key => (
                        <FilterBlock filters={filters[key].items} title={filters[key].title} queryKey={key} key={key}/>
                    ))}
                </div>
                <div className="products-list">
                    {products.map(product => (
                        <a href={`/product/${product.id}/${encodeURIComponent(product.title)}`} key={product.id}
                           className="products-list__block">
                            <img src={product.image_urls[0]} alt={product.title} className="products-list-img"/>
                            <h1 className="products-list-title">{product.title}</h1>
                            <div className="products-list__details">
                                <article>
                                    <section className="products-list-slider__actions">
                                        <Favourite
                                            className="products-list-slider__action"
                                            onClick={e => e.preventDefault()}
                                        />
                                        <Cart
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
                                <div
                                    className={`products-list-price-component ${product.discount ? "products-list-price-component--with-discount" : "price-component--no-discount"}`}>
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
            </div>
        </>
    );
}

export default ProductsPage;
