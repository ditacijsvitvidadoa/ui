import OpenBurger from "../images/open-burger-btn.svg";
import Logo from "../../../assets/images/Logo/logo.svg";
import Search from "../images/search.svg";
import Favorites from "../../../assets/images/Svg/favorites.jsx";
import Cart from "../../../assets/images/Svg/cart.jsx";
import User from "../images/user.svg";
import MainHeaderUserBlock from "../HeaderElements/MainHeaderUserBlock.jsx";
import React, {useEffect, useRef, useState} from "react";
import { useAuth } from "../../shared/context/AuthContext.jsx";
import CloseBurger from "../../../assets/images/Cross/cross.svg";
import Phone from "../../../assets/images/Contacts/phone.svg";
import Clock from "../../../assets/images/Contacts/clock.svg";
import Instagram from "../../../assets/images/SocialNetwork/Instagram.svg";
import Email from "../../../assets/images/SocialNetwork/Email.svg";
import Facebook from "../../../assets/images/SocialNetwork/Facebook.svg";
import Home from "../../../assets/images/NavigationSvgs/Home.svg";
import AboutUs from "../../../assets/images/NavigationSvgs/about-us.svg";
import Discount from "../../../assets/images/NavigationSvgs/discount.svg";
import Contacts from "../../../assets/images/NavigationSvgs/contacts.svg";
import CollapsibleBlock from "../HeaderElements/HeaderElements.jsx";
import Categories from "../images/Categories.svg";
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


export default function MobileHeader() {
    const [showUserBlock, setShowUserBlock] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (menuOpen) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }

        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, [menuOpen]);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <>
            <header className="mobile-header">
                <img src={OpenBurger} alt="Open Menu" className="mobile-header__open-burger" onClick={toggleMenu} />
                <a href="/" className="mobile-header__logo-a">
                    <img src={Logo} alt={Logo} className="mobile-header__logo" />
                </a>
                <form className="mobile-header__search-form">
                    <input className="mobile-header__search-form-input" />
                    <button type="submit" className="mobile-header__search-form-btn">
                        <img src={Search} alt={Search} className="mobile-header__search-form-btn-content" />
                    </button>
                </form>
                <div>
                    <a href="/favourites" className="mobile-header-svg-a">
                        <Favorites className="mobile-header-svg mobile-header-svg__favourites" />
                    </a>
                    <a href="/cart" className="mobile-header-svg-a">
                        <Cart className="mobile-header-svg mobile-header-svg__cart" />
                    </a>
                    {isAuthenticated ? (
                        <a href="/account" className="mobile-header-svg-a">
                            <img src={User} alt={User} className="mobile-header-svg mobile-header-svg__user"/>
                        </a>
                    ) : (
                        <>
                            <a className="mobile-header-svg-a" onClick={() => setShowUserBlock(!showUserBlock)}>
                                <img src={User} alt={User} className="mobile-header-svg mobile-header-svg__user"/>
                            </a>
                            {showUserBlock && <MainHeaderUserBlock/>}
                        </>
                    )}
                </div>
            </header>
            <div className={`mobile-header-menu ${menuOpen ? 'active' : ''}`}>
                <article className="close-menu-block">
                    <img src={CloseBurger} alt={CloseBurger} className="header-burder-close" onClick={closeMenu} />
                </article>
                <article className="header-burder__contact-info">
                    <section className="header-burder__contact-info-item">
                        <img src={Phone} alt={Phone} className="" />
                        <p className="header-burder__contact-info-phone">+38(012)-345-67-89</p>
                    </section>
                    <section className="header-burder__contact-info-item">
                        <img src={Clock} alt={Clock} className="" />
                        <p>Працюємо з 00:00 до 00:00</p>
                    </section>
                    <section className="header-burder__contact-info-networks">
                        <a href="#" className="header-burder__contact-info-instargram-link">
                            <img src={Instagram} alt={Instagram} className="header-burder__contact-info-network" />
                        </a>
                        <a href="#">
                            <img src={Email} alt={Email} className="header-burder__contact-info-network"/>
                        </a>
                        <a href="#">
                            <img src={Facebook} alt={Facebook} className="header-burder__contact-info-network"/>
                        </a>
                    </section>
                </article>
                <article className="header-burder__stick"></article>
                <nav className="header-burder__nav">
                    <ul className="header-burder__nav-ul">
                        <li><a className="header-burder__nav-link" href="/">
                            <img src={Home} alt={Home} className="header-burder__nav-link-img" />
                            <p>Головна</p>
                        </a></li>
                        <li><a className="header-burder__nav-link" href="/about-us">
                            <img src={AboutUs} alt={AboutUs} className="header-burder__nav-link-img" />
                            <p>Про нас</p>
                        </a></li>
                        <li><a className="header-burder__nav-link" href="/discount-products">
                            <img src={Discount} alt={Discount} className="header-burder__nav-link-img" />
                            <p>Акції</p>
                        </a></li>
                        <li><a className="header-burder__nav-link" href="/contacts">
                            <img src={Contacts} alt={Contacts} className="header-burder__nav-link-img" />
                            <p>Контакти</p>
                        </a></li>
                    </ul>
                </nav>
                <article className="header-burder__stick"></article>
                <CollapsibleBlock img={Categories} title="Категорії">
                    <section className="header-burger__categories">
                        <a href="/products?categories=ForBoys" className="header-burger__category">
                            <img src={Boy} alt={Boy}/>
                            <p>Хлопцям</p>
                        </a>
                        <a href="/products?categories=ForGirls" className="header-burger__category">
                            <img src={Girl} alt={Girl}/>
                            <p>Дівчатам</p>
                        </a>
                        <a href="/products?categories=ForInfants" className="header-burger__category">
                            <img src={Infants} alt={Infants}/>
                            <p>Немовлятам</p>
                        </a>
                        <a href="/products?categories=SoftToys" className="header-burger__category">
                            <img src={SoftToy} alt={SoftToy}/>
                            <p>М’які іграшки</p>
                        </a>
                        <a href="/products?categories=BuildingSets" className="header-burger__category">
                            <img src={BuildingSet} alt={BuildingSet}/>
                            <p>Конструктори</p>
                        </a>
                        <a href="/products?categories=Bookstore" className="header-burger__category">
                            <img src={Bookstore} alt={Bookstore}/>
                            <p>Книгарня</p>
                        </a>
                        <a href="/products?categories=Creativity" className="header-burger__category">
                            <img src={Creativity} alt={Creativity}/>
                            <p>Творчість</p>
                        </a>
                        <a href="/products?categories=ForSchool" className="header-burger__category">
                            <img src={School} alt={School}/>
                            <p>Шкільне</p>
                        </a>
                        <a href="/products?categories=ForSport" className="header-burger__category">
                            <img src={Sport} alt={Sport}/>
                            <p>Спорт</p>
                        </a>
                        <a href="/products?categories=Footswear" className="header-burger__category">
                            <img src={Footwear} alt={Footwear}/>
                            <p>Взуття</p>
                        </a>
                        <a href="/products?categories=Accessories" className="header-burger__category">
                            <img src={Accessories} alt={Accessories}/>
                            <p>Аксесуари</p>
                        </a>
                    </section>
                </CollapsibleBlock>
            </div>

            {menuOpen && (
                <div className="mobile-header-menu-overlay" onClick={closeMenu}></div>
            )}
        </>
    )
}