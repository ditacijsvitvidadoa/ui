import React, { useState, useEffect, useRef } from 'react';
import Slider from "react-slick";
import { useAuth } from "../../shared/context/AuthContext.jsx";
import Favourite from "../../../assets/images/Product/favorites.jsx";
import Cart from "../../../assets/images/Product/cart.jsx";
import PriceComponent from "../PriceComponent/PriceComponent.jsx";
import AuthToAccountBlock from "../../AuthToAccountBlock/AuthToAccountBlock.jsx";
import useAuthBlock from "../../AuthToAccountBlock/UseAuthBlock.jsx";
import AddToFavourite from "../../../services/FavouritesFetch/Auth/AddToFavourite.jsx";
import DeleteFromFavourite from "../../../services/FavouritesFetch/Auth/DeleteFromFavourite.jsx";
import { addToCart } from "../../shared/managementCart/addToCart.jsx";

import "./MainProductsSlider.css";
import Arrow from "../../../assets/images/LeftArrow/leftArrow.svg";
import ProductAnalyticsFetch from "../../../services/ProductsFetch/ProductAnalytics.jsx";
import DeleteFromCart from "../../../services/CartFetch/Auth/DeleteFromCart.jsx";
import AddToUnAuthCart from "../../../services/CartFetch/UnAuth/AddToUnAuthCart.jsx";
import DeleteFromUnAuthCart from "../../../services/CartFetch/UnAuth/DeleteFromUnAuthCart.jsx";
import CheckInCart from "../../Cart/CheckInCart.jsx";
import AddToUnAuthFavourite from "../../../services/FavouritesFetch/UnAuth/AddToUnAuthFavourite.jsx";
import DeleteFromUnAuthFavourite from "../../../services/FavouritesFetch/UnAuth/DeleteFromUnAuthFavourite.jsx";
import CheckInFavourites from "../../Favourites/CheckInFavourites.jsx";

function MainProductsSlider({ title, products }) {
    const { isAuthenticated } = useAuth();
    console.log(isAuthenticated)
    console.log(!isAuthenticated)
    const [isLoaded, setIsLoaded] = useState(false);
    const sliderRef = useRef(null);

    useEffect(() => {
        const sliderElement = sliderRef.current;

        let startX = 0;
        let startY = 0;
        let isSwiping = false;

        const handleTouchStart = (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        };

        const handleTouchMove = (e) => {
            const diffX = Math.abs(e.touches[0].clientX - startX);
            const diffY = Math.abs(e.touches[0].clientY - startY);

            if (diffX > diffY) {
                isSwiping = true;
                e.preventDefault();
            }
        };

        const handleTouchEnd = () => {
            isSwiping = false;
        };

        if (sliderElement) {
            sliderElement.addEventListener("touchstart", handleTouchStart);
            sliderElement.addEventListener("touchmove", handleTouchMove, { passive: false });
            sliderElement.addEventListener("touchend", handleTouchEnd);
        }

        return () => {
            if (sliderElement) {
                sliderElement.removeEventListener("touchstart", handleTouchStart);
                sliderElement.removeEventListener("touchmove", handleTouchMove);
                sliderElement.removeEventListener("touchend", handleTouchEnd);
            }
        };
    }, []);

    useEffect(() => {
        if (products && products.length > 0) {
            setIsLoaded(true);
        } else {
            setIsLoaded(false);
        }
    }, [products]);

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
                }
            },
            {
                breakpoint: 641,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            }
        ]
    };

    const handleAddToFavourite = async (productId) => {
        if (!isAuthenticated) {
            AddToUnAuthFavourite(productId);
            return window.location.reload();
        }
        try {
            await AddToFavourite(productId);
            await ProductAnalyticsFetch(productId, "Favourites", 1);
            window.location.reload();
        } catch (error) {
            console.error("Error adding to favourites:", error);
        }
    };

    const handleRemoveFromFavourite = async (productId) => {
        if (!isAuthenticated) {
            DeleteFromUnAuthFavourite(productId);
            return window.location.reload();
        }
        try {
            await DeleteFromFavourite(productId);
            window.location.reload();
        } catch (error) {
            console.error("Error removing from favourites:", error);
        }
    };

    const handleAddToCart = async (productId) => {
        if (!isAuthenticated) {
            AddToUnAuthCart(productId);
            return window.location.reload();
        }

        try {
            await ProductAnalyticsFetch(productId, "AddedToCart", 1);
            await addToCart(productId);
            window.location.reload();
        } catch (error) {
            console.error("Error adding product to cart:", error);
        }
    };

    const handleRemoveFromCart = async (productId) => {
        if (!isAuthenticated) {
            DeleteFromUnAuthCart(productId);
            return window.location.reload();
        }
        try {
            await DeleteFromCart(productId);
            window.location.reload();
        } catch (error) {
            console.error("Error removing product to cart:", error);
        }
    };

    return (
        <>
            <section className="main-products-slider">
                <h1 className="main-products-slider-h1">{title}</h1>

                {isLoaded ? (
                    <div className="main-products-slider-list">
                        <Slider {...QuadrupleSliderSettings}>
                            {products.map(product => (
                                <a href={`/product/${product.id}/${encodeURIComponent(product.title)}`} key={product.id}
                                   className="main-product__block" onClick={() => ProductAnalyticsFetch(product.id, "Clicks", 1)}>
                                    <img src={product.image_urls[0]} alt={product.title} className="main-product-img" />
                                    <h1 className="main-product-title">{product.title}</h1>
                                    <div className="main-product__details">
                                        <article>
                                            <section className="main-products-slider__actions">
                                                <Favourite
                                                    fill={CheckInFavourites(product, isAuthenticated) ? "#FF5756" : "#29292999"}
                                                    className="main-products-slider__action"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        {CheckInFavourites(product, isAuthenticated) ? handleRemoveFromFavourite(product.id) : handleAddToFavourite(product.id)}
                                                    }}
                                                />
                                                <Cart
                                                    color={CheckInCart(product, isAuthenticated) ? "#FF5756" : "#29292999"}
                                                    className="main-products-slider__action"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        {CheckInCart(product, isAuthenticated) ? handleRemoveFromCart(product.id) : handleAddToCart(product.id)}
                                                    }}
                                                />
                                            </section>
                                            <section>
                                                {product.code !== -1 && (
                                                    <p className="main-products-slider__code">Код: {product.code}</p>
                                                )}
                                                {product.articul !== -1 && (
                                                    <p className="main-products-slider__articul">Артикул: {product.articul}</p>
                                                )}
                                            </section>
                                        </article>
                                        <div className="main-product-price">
                                            <PriceComponent price={product.price} discount={product.discount} />
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </Slider>
                    </div>
                ) : (
                    <p className="main-products-slider-loading"></p>
                )}
            </section>
        </>
    );
}

export default MainProductsSlider;
