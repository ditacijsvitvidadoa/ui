import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Favourite from "../../assets/images/Product/Favourite.svg";
import Cart from "../../assets/images/Product/Cart.svg";
import { addToCart } from "../shared/managementCart/addToCart.jsx";
import { useAuth } from "../shared/context/AuthContext.jsx";
import AddToFavourite from "../../services/FavouritesFetch/AddToFavourite.jsx";
import DeleteFromFavourite from "../../services/FavouritesFetch/DeleteFromFavourite.jsx";
import AuthToAccountBlock from "../AuthToAccountBlock/AuthToAccountBlock.jsx";
import useAuthBlock from "../AuthToAccountBlock/UseAuthBlock.jsx";

const ProductsList = ({ products, pageCount }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated } = useAuth();
    const { showAuthBlock, toggleAuthBlock } = useAuthBlock();

    const [showAuthModal, setShowAuthModal] = useState(false);
    const [currentProductId, setCurrentProductId] = useState(null);
    const [actionType, setActionType] = useState(""); // 'favourite' or 'cart'

    const pageNumbers = Array.from({ length: pageCount }, (_, i) => i + 1);
    const currentPage = parseInt(new URLSearchParams(location.search).get('pageNum')) || 1;

    const handlePageClick = (pageNum) => {
        const params = new URLSearchParams(location.search);
        params.set('pageNum', pageNum);
        navigate(`${location.pathname}?${params.toString()}`);
    };

    const renderPageNumbers = () => {
        const pages = [];
        if (pageCount <= 5) {
            return pageNumbers.map(pageNum => (
                <p
                    key={pageNum}
                    className={`page-num-item ${pageNum === currentPage ? 'active' : ''}`}
                    onClick={() => handlePageClick(pageNum)}
                >
                    {pageNum}
                </p>
            ));
        }

        pages.push(
            <p
                key={1}
                className={`page-num-item ${currentPage === 1 ? 'active' : ''}`}
                onClick={() => handlePageClick(1)}
            >
                1
            </p>
        );

        if (currentPage > 3) {
            pages.push(<span key="ellipsis-start" className="page-num-item">...</span>);
        }

        for (let i = Math.max(2, currentPage - 1); i <= Math.min(pageCount - 1, currentPage + 1); i++) {
            pages.push(
                <p
                    key={i}
                    className={`page-num-item ${i === currentPage ? 'active' : ''}`}
                    onClick={() => handlePageClick(i)}
                >
                    {i}
                </p>
            );
        }

        if (currentPage < pageCount - 2) {
            pages.push(<span key="ellipsis-end" className="page-num-item">...</span>);
        }

        pages.push(
            <p
                key={pageCount}
                className={`page-num-item ${currentPage === pageCount ? 'active' : ''}`}
                onClick={() => handlePageClick(pageCount)}
            >
                {pageCount}
            </p>
        );

        return pages;
    };

    const handleAddToFavourite = (productId) => {
        if (!isAuthenticated) return toggleAuthBlock();
        AddToFavourite(productId);
        window.location.reload();
    };

    const handleRemoveFromFavourite = (productId) => {
        if (!isAuthenticated) return toggleAuthBlock();
        DeleteFromFavourite(productId);
        window.location.reload();
    };

    const handleAddToCart = async (productId) => {
        if (!isAuthenticated) return toggleAuthBlock();
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

    if (!products || products.length === 0) {
        return (
            <section className="all-products-list">
                <p className="no-products-message">Не знайдено товарів</p>
            </section>
        );
    }

    return (
        <section className="all-products-list">
            <div className="products-list">
                {products.map(product => {
                    if (!product) {
                        return null;
                    }

                    return (
                        <a href={`/product/${product.id}/${encodeURIComponent(product.title)}`} key={product.id}
                           className="products-list__block">
                            <img src={product.image_urls[0]} alt={product.title} className="products-list-img"/>
                            <h1 className="products-list-title">{product.title}</h1>
                            <div className="products-list__details">
                                <article>
                                    <section className="products-list-slider__actions">
                                        <img
                                            src={Favourite}
                                            alt="Favourite"
                                            className="products-list-slider__action"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                openAuthModal(product.id, 'favourite');
                                            }}
                                        />
                                        <img
                                            src={Cart}
                                            alt="Cart"
                                            className="products-list-slider__action"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                openAuthModal(product.id, 'cart');
                                            }}
                                        />
                                    </section>
                                    <section>
                                        <p className="products-list-slider__code">Код: {product.code}</p>
                                        <p className="products-list-slider__articul">Артикул: {product.articul}</p>
                                    </section>
                                </article>
                                <div
                                    className={`products-list-price-component ${product.discount ? "products-list-price-component--with-discount" : "price-component--no-discount"}`} >
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
                    );
                })}
            </div>

            {pageCount > 1 && (
                <div className="page-nums-block">
                    {renderPageNumbers()}
                </div>
            )}

            {showAuthBlock && <AuthToAccountBlock />}
            {showAuthModal && (
                <AuthToAccountBlock isOpen={showAuthModal} onClose={closeAuthModal} onAction={handleAction} />
            )}
        </section>
    );
};

export default ProductsList;
