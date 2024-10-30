import { useState, useEffect } from "react";
import Arrow from "../../assets/images/LeftArrow/leftArrow.svg";
import Cart from "../../assets/images/Svg/cart.jsx";
import CartIcon from "../../assets/images/Svg/cart.jsx";
import FavoritesIcon from "../../assets/images/Svg/favorites.jsx";
import AddToFavourite from "../../services/FavouritesFetch/AddToFavourite.jsx";
import DeleteFromFavourite from "../../services/FavouritesFetch/DeleteFromFavourite.jsx";
import AddToCart from "../../services/CartFetch/AddToCart.jsx";

export default function ProductContent({ id, title, description, articul, code, size_info, discount, price, is_favourite, in_cart }) {
    const [hasTable] = useState(size_info.has_table);
    const [hasSizes] = useState(size_info.sizes.has_sizes);
    const [sizes] = useState(size_info.sizes.size_values);
    const [defaultSize] = useState(size_info.sizes.default_size);
    const [activeSize, setActiveSize] = useState(defaultSize);

    const handleSizeClick = (size) => {
        setActiveSize(size);
    };

    useEffect(() => {
        const url = new URL(window.location);
        url.searchParams.set('size', activeSize);
        window.history.pushState({}, '', url);
    }, [activeSize]);

    const handleRemoveFromFavourite = () => {
        DeleteFromFavourite(id)
        window.location.reload()
    }

    const handleAddToFavourite = () => {
        AddToFavourite(id)
        window.location.reload()
    }

    const handleBuyClick = () => {
        if (!in_cart) {
            const url = new URL(window.location);
            const size = url.searchParams.get('size');

            AddToCart(id, size);
            window.location.reload()
        } else {
            window.location.href = '/cart';

        }
    };

    return (
        <div className="product-content">
            <h1 className="product-content__h1">{title}</h1>
            <p className="product-content__desc">{description}</p>
            <article className="product-content__actions">
                <p className="product-content__action">Артикул: {articul}</p>
                <p className="product-content__action">Код: {code}</p>
            </article>
            {hasTable && (
                <div>
                    {hasSizes && (
                        <article className="product-content__sizes">
                            {sizes.map(size => (
                                <p
                                    key={size}
                                    className={`product-content__size ${size === activeSize ? 'active' : ''}`}
                                    onClick={() => handleSizeClick(size)}
                                >
                                    {size}
                                </p>
                            ))}
                        </article>
                    )}
                    <article className="product-content__sizes-table">
                        <p className="product-content__sizes-table__p">Таблиця розмірів</p>
                        <img src={Arrow} alt="left arrow" className="product-content__sizes-table__arrow"/>
                    </article>
                </div>
            )}
            <div className="product-content__down-block">
                {discount ? (
                    <article className="product-content__price-component product-content__price-component--with-discount">
                        <p className="product-content__price-component__original-price">{price} ₴</p>
                        <p className="product-content__price-component__discount">{discount} ₴</p>
                    </article>
                ) : (
                    <article className="product-content__price-component product-content__price-component--no-discount">
                        <p className="product-content__price-component__price">{price} ₴</p>
                    </article>
                )}
                <article className="product-content__btns">
                    <div
                        className="product-content__buy-btn"
                        style={{cursor: 'pointer'}}
                        onClick={handleBuyClick}
                    >
                        <article className="product-content__cart-block">
                            <CartIcon color="#fff" className="product-content__cart"/>
                        </article>
                        <p className="product-content__buy-p">
                            {in_cart ? (
                                <span>Відкрити кошик</span>
                            ) : (
                                <span>Купити</span>
                            )}
                        </p>
                    </div>
                    <div
                        className="product-content__favourite-btn"
                        onClick={is_favourite ? handleRemoveFromFavourite : handleAddToFavourite}
                        style={{cursor: 'pointer'}}
                    >
                        <article className="product-content__favourite-block">
                            <FavoritesIcon fill="#FF5756" className="product-content__favourite"/>
                        </article>
                        <p className="product-content__favourite-p">
                            {is_favourite ? (
                                <span>З улюблених</span>
                            ) : (
                                <span>В улюблені</span>
                            )}
                        </p>
                    </div>
                </article>
            </div>
        </div>
    );
}
