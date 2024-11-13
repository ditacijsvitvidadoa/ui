import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Favourite from "../../assets/images/Product/Favourite.svg";
import Cart from "../../assets/images/Product/Cart.svg";
import { addToCart } from "../shared/managementCart/addToCart.jsx";

const ProductsList = ({ products, pageCount }) => {
    const navigate = useNavigate();
    const location = useLocation();

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
                        // Если продукт null, то его пропускаем
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
                    );
                })}
            </div>

            {pageCount > 1 && (
                <div className="page-nums-block">
                    {renderPageNumbers()}
                </div>
            )}
        </section>
    );
};

export default ProductsList;
