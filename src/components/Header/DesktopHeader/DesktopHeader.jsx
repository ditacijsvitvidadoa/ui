import Logo from "../../../assets/images/Logo/logo.svg";
import Phone from "../images/phone.svg";
import Clock from "../images/clock.svg";
import Instagram from "../../../assets/images/SocialNetwork/Instagram.svg";
import Email from "../../../assets/images/SocialNetwork/Email.svg";
import Facebook from "../../../assets/images/SocialNetwork/Facebook.svg";
import Search from "../images/search.svg";
import Giveaway from "../images/giveaway.svg";
import Favorites from "../../../assets/images/Svg/favorites.jsx";
import Cart from "../../../assets/images/Svg/cart.jsx";
import User from "../images/user.svg";
import MainHeaderUserBlock from "../HeaderElements/MainHeaderUserBlock.jsx";
import Boy from "../../../assets/images/Categories/forBoy.svg";
import Girl from "../../../assets/images/Categories/forGirl.svg";
import Infants from "../../../assets/images/Categories/forInfants.svg";
import SoftToy from "../../../assets/images/Categories/softToy.svg";
import BuildingSet from "../../../assets/images/Categories/buildingSets.svg";
import Bookstore from "../../../assets/images/Categories/bookstore.svg";
import Creativity from "../../../assets/images/Categories/creativity.svg";
import School from "../../../assets/images/Categories/forSchool.svg";
import Sport from "../../../assets/images/Categories/forSport.svg";
import Footwear from "../../../assets/images/Categories/footswear.svg";
import Accessories from "../../../assets/images/Categories/accessories.svg";
import SecondDesktopHeader from "../SecondDesktopHeader/SecondDesktopHeader.jsx";
import React, {useEffect, useRef, useState} from "react";
import {useAuth} from "../../shared/context/AuthContext.jsx";


export default function DesktopHeader() {
    const [showSecondHeader, setShowSecondHeader] = useState(false);
    const [showUserBlock, setShowUserBlock] = useState(false);
    const headerRef = useRef(null);
    const { isAuthenticated } = useAuth();

    const handleScroll = () => {
        if (headerRef.current) {
            const headerHeight = headerRef.current.getBoundingClientRect().bottom;
            if (headerHeight < -10) {
                setShowSecondHeader(true);
            } else {
                setShowSecondHeader(false);
            }
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            <header className="main-header" >
                <nav className="main-header__nav">
                    <ul className="main-header__nav-ul">
                        <li><a className="main-header__nav-link" href="/">Головна</a></li>
                        <li><a className="main-header__nav-link" href="/about-us">Про нас</a></li>
                        <li><a className="main-header__nav-link" href="/discount-products">Акції</a></li>
                        <li><a className="main-header__nav-link" href="/contacts">Контакти</a></li>
                    </ul>
                </nav>
                <div>
                    <a href="/">
                        <img src={Logo} alt={Logo} className="main-header__logo"/>
                    </a>
                    <article className="main-header__contact-info">
                        <section className="main-header__contact-info-point">
                            <img src={Phone} alt={Phone} />
                            <p className="main-header__phone">+38(012)-345-67-89</p>
                        </section>
                        <section className="main-header__contact-info-point">
                            <img src={Clock} alt={Clock} />
                            <p>Працюємо з 00:00 до 00:00</p>
                        </section>
                        <section className="main-header__contact-info-networks">
                            <a href="#">
                                <img src={Instagram} alt={Instagram} />
                            </a>
                            <a href="#">
                                <img src={Email} alt={Email} className="main-header__contact-info-network"/>
                            </a>
                            <a href="#">
                                <img src={Facebook} alt={Facebook} className="main-header__contact-info-network"/>
                            </a>
                        </section>
                    </article>
                    <article className="main-header__search">
                        <form className="main-header__search-form">
                            <input className="main-header__search-form-input" />
                            <button type="submit" className="main-header__search-form-btn">
                                <img src={Search} alt={Search} className="main-header__search-form-btn-content" />
                            </button>
                        </form>
                    </article>
                    <a href="/bonuses" className="main-header-svg-a">
                        <img src={Giveaway} alt={Giveaway} className="main-header-svg" />
                    </a>
                    <a href="/favourites" className="main-header-svg-a">
                        <Favorites className="main-header-svg" />
                    </a>
                    <a href="/cart" className="main-header-svg-a">
                        <Cart className="main-header-svg" />
                    </a>

                    <div className="main-header__stick"></div>
                    {isAuthenticated ? (
                        <a href="/account" className="main-header-svg-a">
                            <img src={User} alt={User} className="main-header-svg"/>
                        </a>
                    ) : (
                        <>
                            <p
                                className="main-header-svg-a main-header-svg-static"
                                onClick={() => setShowUserBlock(!showUserBlock)}
                                style={{ cursor: "pointer" }}
                            >
                                <img src={User} alt={User} className="main-header-svg"/>
                            </p>
                            {showUserBlock && <MainHeaderUserBlock />}
                        </>
                    )}
                </div>
                <div className="categories" ref={headerRef}>
                    <a href="/products?categories=ForBoys" className="category">
                        <img src={Boy} alt={Boy} />
                        <p>Хлопцям</p>
                    </a>
                    <a href="/products?categories=ForGirls" className="category">
                        <img src={Girl} alt={Girl} />
                        <p>Дівчатам</p>
                    </a>
                    <a href="/products?categories=ForInfants" className="category">
                        <img src={Infants} alt={Infants} />
                        <p>Немовлятам</p>
                    </a>
                    <a href="/products?categories=SoftToys" className="category">
                        <img src={SoftToy} alt={SoftToy} />
                        <p>М’які іграшки</p>
                    </a>
                    <a href="/products?categories=BuildingSets" className="category">
                        <img src={BuildingSet} alt={BuildingSet} />
                        <p>Конструктори</p>
                    </a>
                    <a href="/products?categories=Bookstore" className="category">
                        <img src={Bookstore} alt={Bookstore} />
                        <p>Книгарня</p>
                    </a>
                    <a href="/products?categories=Creativity" className="category">
                        <img src={Creativity} alt={Creativity} />
                        <p>Творчість</p>
                    </a>
                    <a href="/products?categories=ForSchool" className="category">
                        <img src={School} alt={School} />
                        <p>Шкільне</p>
                    </a>
                    <a href="/products?categories=ForSport" className="category">
                        <img src={Sport} alt={Sport} />
                        <p>Спорт</p>
                    </a>
                    <a href="/products?categories=Footswear" className="category">
                        <img src={Footwear} alt={Footwear} />
                        <p>Взуття</p>
                    </a>
                    <a href="/products?categories=Accessories" className="category">
                        <img src={Accessories} alt={Accessories} />
                        <p>Аксесуари</p>
                    </a>
                </div>
            </header>
            {showSecondHeader && ( <SecondDesktopHeader /> )}
        </>
    )
}