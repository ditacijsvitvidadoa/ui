import React, { useState } from 'react';
import Slider from "react-slick";
import { useAuth } from "../../shared/context/AuthContext.jsx";
import Favourite from "../../../assets/images/Product/favorites.jsx";
import Cart from "../../../assets/images/Product/cart.jsx";
import PriceComponent from "../PriceComponent/PriceComponent.jsx";
import AuthToAccountBlock from "../../AuthToAccountBlock/AuthToAccountBlock.jsx";
import useAuthBlock from "../../AuthToAccountBlock/UseAuthBlock.jsx";
import AddToFavourite from "../../../services/FavouritesFetch/AddToFavourite.jsx";
import DeleteFromFavourite from "../../../services/FavouritesFetch/DeleteFromFavourite.jsx";
import { addToCart } from "../../shared/managementCart/addToCart.jsx";

import "./MainProductsSlider.css";
import Arrow from "../../../assets/images/LeftArrow/leftArrow.svg";
import ProductAnalyticsFetch from "../../../services/ProductsFetch/ProductAnalytics.jsx";
import DeleteFromCart from "../../../services/CartFetch/DeleteFromCart.jsx";

function MainProductsSlider({ title, products }) {
    const { isAuthenticated } = useAuth();
    const [showAuthBlock, setShowAuthBlock] = useState(false);

    const openAuthBlock = () => setShowAuthBlock(true);
    const closeAuthBlock = () => setShowAuthBlock(false);

    const [showAuthModal, setShowAuthModal] = useState(false);
    const [currentProductId, setCurrentProductId] = useState(null);
    const [actionType, setActionType] = useState("");

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

    const handleAddToFavourite = async (productId) => {
        if (!isAuthenticated) return openAuthBlock();
        try {
            await AddToFavourite(productId);
            await ProductAnalyticsFetch(productId, "Favourites", 1);
            window.location.reload();
        } catch (error) {
            console.error("Error adding to favourites:", error);
        }
    };

    const handleRemoveFromFavourite = async (productId) => {
        if (!isAuthenticated) return openAuthBlock();
        try {
            await DeleteFromFavourite(productId);
            window.location.reload();
        } catch (error) {
            console.error("Error removing from favourites:", error);
        }
    };

    const handleAddToCart = async (productId) => {
        if (!isAuthenticated) return openAuthBlock();
        try {
            await ProductAnalyticsFetch(productId, "AddedToCart", 1);
            await addToCart(productId);
            window.location.reload();
        } catch (error) {
            console.error("Error adding product to cart:", error);
        }
    };

    const handleRemoveFromCart = async (productId) => {
        if (!isAuthenticated) return openAuthBlock();
        try {
            await DeleteFromCart(productId);
            window.location.reload();
        } catch (error) {
            console.error("Error removing product to cart:", error);
        }
    }

    return (
        <>
            <section className="main-products-slider">
                <h1 className="main-products-slider-h1">{title}</h1>
                <div className="main-products-slider-list">
                    <Slider {...QuadrupleSliderSettings}>
                        {products.map(product => (
                            <a href={`/product/${product.id}/${encodeURIComponent(product.title)}`} key={product.id}
                               className="main-product__block" onClick={() => ProductAnalyticsFetch(product.id, "Clicks", 1)}>
                                <img src={product.image_urls[0]} alt={product.title} className="main-product-img"/>
                                <h1 className="main-product-title">{product.title}</h1>
                                <div className="main-product__details">
                                    <article>
                                        <section className="main-products-slider__actions">
                                            <Favourite
                                                fill={product.is_favourite ? "#FF5756" : "#29292999"}
                                                className="main-products-slider__action"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    {product.is_favourite ? handleRemoveFromFavourite(product.id) : handleAddToFavourite(product.id)}
                                                }}
                                            />
                                            <Cart
                                                color={product.in_cart ? "#FF5756" : "#29292999"}
                                                className="main-products-slider__action"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    {product.in_cart ? handleRemoveFromCart(product.id) : handleAddToCart(product.id)}
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
                                        <PriceComponent price={product.price} discount={product.discount}/>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </Slider>
                </div>
            </section>

            {showAuthBlock && <AuthToAccountBlock isOpen={showAuthBlock} onClose={closeAuthBlock} />}
        </>
    );
}

export default MainProductsSlider;
