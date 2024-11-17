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

function MainProductsSlider({ title, products }) {
    const { isAuthenticated } = useAuth();
    const { showAuthBlock, toggleAuthBlock } = useAuthBlock();

    const [showAuthModal, setShowAuthModal] = useState(false);
    const [currentProductId, setCurrentProductId] = useState(null);
    const [actionType, setActionType] = useState(""); // 'favourite' or 'cart'

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

    const handleAddToFavourite = (productId) => {
        if (!isAuthenticated) {
            toggleAuthBlock(); // show authentication block if not authenticated
            return;
        }
        AddToFavourite(productId);
    };

    const handleRemoveFromFavourite = (productId) => {
        if (!isAuthenticated) {
            toggleAuthBlock(); // show authentication block if not authenticated
            return;
        }
        DeleteFromFavourite(productId);
    };

    const handleAddToCart = async (productId) => {
        if (!isAuthenticated) {
            toggleAuthBlock(); // show authentication block if not authenticated
            return;
        }
        try {
            await addToCart(productId);
        } catch (error) {
            console.error("Error adding product to cart:", error.message);
        }
    };

    const openAuthModal = (productId, type) => {
        setCurrentProductId(productId);
        setActionType(type);
        setShowAuthModal(true);
    };

    const closeAuthModal = () => {
        setShowAuthModal(false);
        setCurrentProductId(null);
        setActionType("");
    };

    const handleAction = () => {
        if (actionType === 'favourite') {
            if (products.find(product => product.id === currentProductId).is_favourite) {
                handleRemoveFromFavourite(currentProductId);
            } else {
                handleAddToFavourite(currentProductId);
            }
        } else if (actionType === 'cart') {
            handleAddToCart(currentProductId);
        }
        closeAuthModal();
    };

    return (
        <>
            <section className="main-products-slider">
                <h1 className="main-products-slider-h1">{title}</h1>
                <div className="main-products-slider-list">
                    <Slider {...QuadrupleSliderSettings}>
                        {products.map(product => (
                            <a href={`/product/${product.Id}/${encodeURIComponent(product.Title)}`} key={product.Id}
                               className="main-product__block">
                                <img src={product.Image_url} alt={product.Title} className="main-product-img"/>
                                <h1 className="main-product-title">{product.Title}</h1>
                                <div className="main-product__details">
                                    <article>
                                        <section className="main-products-slider__actions">
                                            <Favourite
                                                fill="#29292999"
                                                className="main-products-slider__action"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    openAuthModal(product.Id, 'favourite');
                                                }}
                                            />
                                            <Cart
                                                color="#29292999"
                                                className="main-products-slider__action"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    openAuthModal(product.Id, 'cart');
                                                }}
                                            />
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
                        ))}
                    </Slider>
                </div>
            </section>

            {showAuthBlock && <AuthToAccountBlock />}
            {showAuthModal && (
                <AuthToAccountBlock isOpen={showAuthModal} onClose={closeAuthModal} onAction={handleAction} />
            )}
        </>
    );
}

export default MainProductsSlider;
