import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Favourite from "../../assets/images/Product/favorites.jsx";
import Cart from "../../assets/images/Product/cart.jsx";
import { addToCart } from "../shared/managementCart/addToCart.jsx";
import { useAuth } from "../shared/context/AuthContext.jsx";
import AddToFavourite from "../../services/FavouritesFetch/AddToFavourite.jsx";
import DeleteFromFavourite from "../../services/FavouritesFetch/DeleteFromFavourite.jsx";
import AuthToAccountBlock from "../AuthToAccountBlock/AuthToAccountBlock.jsx";
import useAuthBlock from "../AuthToAccountBlock/UseAuthBlock.jsx";
import ProductAnalyticsFetch from "../../services/ProductsFetch/ProductAnalytics.jsx";
import logIn from "../LogIn/LogIn.jsx";
import DeleteFromCart from "../../services/CartFetch/DeleteFromCart.jsx";

const ProductsList = ({ products = [], pageCount = 1 }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated } = useAuth();
    const [showAuthBlock, setShowAuthBlock] = useState(false);

    const openAuthBlock = () => setShowAuthBlock(true);
    const closeAuthBlock = () => setShowAuthBlock(false);

    const pageNumbers = Array.from({ length: pageCount }, (_, i) => i + 1);
    const currentPage = parseInt(new URLSearchParams(location.search).get('pageNum')) || 1;

    if (!products || products.length === 0) {
        return (
            <section className="all-products-list">
                <p className="no-products-message">Не знайдено товарів</p>
            </section>
        );
    }

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
        <section className="all-products-list">
            <div className="products-list">
                {products.map(product => (
                    <a href={`/product/${product.id}/${encodeURIComponent(product.title)}`} key={product.id}
                       className="products-list__block" onClick={() => ProductAnalyticsFetch(product.id, "Clicks", 1)}>
                        <img src={product.image_urls[0]} alt={product.title} className="products-list-img"/>
                        <h1 className="products-list-title">{product.title}</h1>
                        <div className="products-list__details">
                            <article>
                                <section className="products-list-slider__actions">
                                    <Favourite
                                        fill={product.is_favourite ? "#FF5756" : "#29292999"}
                                        className="products-list-slider__action"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            console.log(product.is_favourite)
                                            {product.is_favourite ? handleRemoveFromFavourite(product.id) : handleAddToFavourite(product.id)}
                                        }}
                                    />
                                    <Cart
                                        color={product.in_cart ? "#FF5756" : "#29292999"}
                                        className="products-list-slider__action"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            {product.in_cart ? handleRemoveFromCart(product.id) : handleAddToCart(product.id)}
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
                ))}
            </div>

            {pageCount > 1 && (
                <div className="page-nums-block">
                    {renderPageNumbers()}
                </div>
            )}

            {showAuthBlock && <AuthToAccountBlock isOpen={showAuthBlock} onClose={closeAuthBlock} />}
        </section>
    );
};

export default ProductsList;
