import Logo from "../../../assets/images/Logo/logo.svg";
import Home from "../../../assets/images/NavigationSvgs/Home.svg";
import Discount from "../../../assets/images/NavigationSvgs/discount.svg";
import Contacts from "../../../assets/images/NavigationSvgs/contacts.svg";
import AboutUs from "../../../assets/images/NavigationSvgs/about-us.svg";
import Giveaway from "../images/giveaway.svg";
import Favorites from "../../../assets/images/Svg/favorites.jsx";
import Cart from "../../../assets/images/Svg/cart.jsx";
import User from "../images/user.svg";
import MainHeaderUserBlock from "../HeaderElements/MainHeaderUserBlock.jsx";
import React, {useState} from "react";
import {useAuth} from "../../shared/context/AuthContext.jsx";
import Search from "../images/search.svg";


function SecondDesktopHeader() {
    const {isAuthenticated} = useAuth();
    const [showUserBlock, setShowUserBlock] = useState(false);

    return (
        <header className="second-desktop-header">
            <div>
                <a href="/">
                    <img src={Logo || ""} alt="logo" className="second-desktop-header__logo"/>
                </a>
                <article className="second-desktop-header__nav">
                    <a href="/">
                        <img src={Home || ""} alt="home" title="Головна сторінка"
                             className="second-desktop-header__img"/>
                    </a>
                    <a href="/about-us">
                        <img src={AboutUs || ""} alt="about us" title="Про нас"
                             className="second-desktop-header__img"/>
                    </a>
                    <a href="/discount">
                        <img src={Discount || ""} alt="discount" title="Знижки"
                             className="second-desktop-header__img"/>
                    </a>
                    <a href="/contacts">
                        <img src={Contacts || ""} alt="contacts" title="Контакти"
                             className="second-desktop-header__img"/>
                    </a>
                </article>
                <article className="second-desktop-header__sec-nav">
                    <article className="main-header__search">
                        <form className="main-header__search-form">
                            <input className="main-header__search-form-input"/>
                            <button type="submit" className="main-header__search-form-btn">
                                <img src={Search} alt={Search} className="main-header__search-form-btn-content"/>
                            </button>
                        </form>
                    </article>
                    <a href="/bonuses">
                        <img src={Giveaway} alt={Giveaway} className="second-desktop-header__img"/>
                    </a>
                    <a href="/favourites">
                        <Favorites className="second-desktop-header__img"/>
                    </a>
                    <a href="/cart">
                        <Cart className="second-desktop-header__img"/>
                    </a>

                    {isAuthenticated ? (
                        <a href="/account">
                            <img src={User || ""} alt="user" className="second-desktop-header__img"/>
                        </a>
                    ) : (
                        <>
                            <p
                                className="main-header-svg-a main-header-svg-static"
                                onClick={() => setShowUserBlock(!showUserBlock)}
                                style={{cursor: "pointer"}}
                            >
                                <img src={User} alt={User} className="second-desktop-header__img"/>
                            </p>
                            {showUserBlock && <MainHeaderUserBlock/>}
                        </>
                    )}
                </article>
            </div>
        </header>
    )
}

export default SecondDesktopHeader;