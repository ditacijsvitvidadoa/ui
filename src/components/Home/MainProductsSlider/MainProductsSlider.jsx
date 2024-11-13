import React, { useState } from 'react';
import Slider from "react-slick";

import "./MainProductsSlider.css";
import Arrow from "../../../assets/images/LeftArrow/leftArrow.svg";

// For Products
import Favourite from "../../../assets/images/Product/Favourite.svg"
import Cart from "../../../assets/images/Product/Cart.svg"
import PriceComponent from "../PriceComponent/PriceComponent.jsx";

function MainProductsSlider({ title, products }) {
    const QuadrupleSliderSettings = {
        arrows: true,
        dots: false,
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 4,
        prevArrow: <img src={Arrow} alt="Previous" style={{ cursor: "pointer" }} />,
        nextArrow: <img src={Arrow} alt="Next" style={{ cursor: "pointer" }} />,
        draggable: false,
        responsive: [
            {
                breakpoint: 841,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    prevArrow: <img src={Arrow} alt="Previous" style={{ cursor: "pointer" }} />,
                    nextArrow: <img src={Arrow} alt="Next" style={{ cursor: "pointer" }} />,
                }
            },
            {
                breakpoint: 641,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    prevArrow: <img src={Arrow} alt="Previous" style={{ cursor: "pointer" }} />,
                    nextArrow: <img src={Arrow} alt="Next" style={{ cursor: "pointer" }} />,
                }
            }
        ]
    };

    return (
        <>
            <section className="main-products-slider">
                <h1 className="main-products-slider-h1">{title}</h1>
                <div className="main-products-slider-list">
                    <Slider {...QuadrupleSliderSettings}>
                        {products.map(product => {
                            return (
                                <a href={`/product/${product.Id}/${encodeURIComponent(product.Title)}`} key={product.Id}
                                   className="main-product__block">
                                    <img src={product.Image_url} alt={product.Title} className="main-product-img"/>
                                    <h1 className="main-product-title">{product.Title}</h1>
                                    <div className="main-product__details">
                                        <article>
                                            <section className="main-products-slider__actions">
                                                <img src={Favourite} alt="Favourite"
                                                     className="main-products-slider__action"
                                                     onClick={(e) => {
                                                         e.preventDefault();
                                                         e.stopPropagation();
                                                     }}/>
                                                <img src={Cart} alt="CartPage" className="main-products-slider__action"
                                                     onClick={(e) => {
                                                         e.preventDefault();
                                                         e.stopPropagation();
                                                     }}/>
                                            </section>
                                            <section>
                                                <p className="main-products-slider__code">Код: {product.Code}</p>
                                                <p className="main-products-slider__articul">Артикул: {product.Articul}</p>
                                            </section>
                                        </article>
                                        <div className="main-product-price">
                                            <PriceComponent price={product.Price} discount={product.Discount}/>
                                        </div>
                                    </div>
                                </a>
                            );
                        })}
                    </Slider>
                </div>
            </section>
        </>
    )
}

export default MainProductsSlider;