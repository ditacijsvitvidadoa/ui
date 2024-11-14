import { useState } from "react";
import Arrow from "../../assets/images/LeftArrow/leftArrow.svg";
import CartIcon from "../../assets/images/Product/cart.jsx";
import FavoritesIcon from "../../assets/images/Product/favorites.jsx";
import AddToFavourite from "../../services/FavouritesFetch/AddToFavourite.jsx";
import DeleteFromFavourite from "../../services/FavouritesFetch/DeleteFromFavourite.jsx";
import AddToCart from "../../services/CartFetch/AddToCart.jsx";
import { useAuth } from "../shared/context/AuthContext.jsx";
import AuthToAccountBlock from "../AuthToAccountBlock/AuthToAccountBlock.jsx";

export default function ProductContent({
                                           id, title, description, articul, code, sizes_info, color_info, discount, price, is_favourite, in_cart
                                       }) {
    const { isAuthenticated } = useAuth();
    const [showAuthBlock, setShowAuthBlock] = useState(false);

    const openAuthBlock = () => setShowAuthBlock(true);
    const closeAuthBlock = () => setShowAuthBlock(false);

    const getUrlParam = (param) => new URLSearchParams(window.location.search).get(param);
    const [activeColor, setActiveColor] = useState(getUrlParam('color') || color_info?.default_color || "");
    const [activeSize, setActiveSize] = useState(getUrlParam('size') || sizes_info?.sizes.default_size || "");

    const handleSizeClick = (size) => {
        setActiveSize(size);
        const url = new URL(window.location);
        url.searchParams.set('size', size);
        window.history.pushState({}, '', url);
        window.location.reload();
    };

    const handleColorClick = (color) => {
        setActiveColor(color);
        const url = new URL(window.location);
        url.searchParams.set('color', color);
        window.history.pushState({}, '', url);
        window.location.reload();
    };

    const handleRemoveFromFavourite = () => {
        if (!isAuthenticated) return openAuthBlock();
        DeleteFromFavourite(id);
        window.location.reload();
    };

    const handleAddToFavourite = () => {
        if (!isAuthenticated) return openAuthBlock();
        AddToFavourite(id);
        window.location.reload();
    };

    const handleBuyClick = () => {
        if (!isAuthenticated) return openAuthBlock();
        if (!in_cart) {
            const url = new URL(window.location);
            const size = url.searchParams.get('size');
            const color = url.searchParams.get('color');
            AddToCart(id, size, color);
            window.location.reload();
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
            {sizes_info?.has_table && (
                <div>
                    {sizes_info?.sizes.has_sizes && (
                        <article className="product-content__sizes">
                            {sizes_info.sizes.size_values.map(size => (
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
            {color_info?.colors && color_info.colors.length > 0 && (
                <div className="product-content__colors">
                    {color_info.colors.map(color => (
                        <article
                            key={color}
                            className={`product-content__color ${color === activeColor ? 'active' : ''}`}
                            style={{ backgroundColor: color, cursor: "pointer" }}
                            onClick={() => handleColorClick(color)}
                        />
                    ))}
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
                        style={{ cursor: 'pointer' }}
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
                        style={{ cursor: 'pointer' }}
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
            {showAuthBlock && <AuthToAccountBlock isOpen={showAuthBlock} onClose={closeAuthBlock} />}
        </div>
    );
}
