import React, { useState, useEffect, useRef } from 'react';

import Logo from "../../assets/images/logo.svg"

import Phone from "./images/phone.svg"
import Clock from "./images/clock.svg"

import Instagram from "../../assets/images/instagram.svg"
import Email from "../../assets/images/email.svg"
import Facebook from "../../assets/images/facebook.svg"

import Categories from "./images/categories.svg"
import Boy from "./images/boy.svg"
import Girl from "./images/girl.svg"
import Infants from "./images/infants.svg"
import SoftToy from "./images/soft-toy.svg"
import BuildingSet from "./images/building-set.svg"
import Bookstore from "./images/bookstore.svg"
import Creativity from "./images/creativity.svg"
import School from "./images/school.svg"
import Sport from "./images/sport.svg"
import Footwear from "./images/footwear.svg"
import Accessories from "./images/accessories.svg"

import Search from "./images/search.svg"
import Giveaway from "./images/giveaway.svg"
import Favorites from "./images/favorites.svg"
import Cart from "./images/cart.svg"
import User from "./images/user.svg"

import OpenBurger from "./images/open-burger-btn.svg"
import CloseBurger from "./images/close-burger.svg"

import Home from "./images/Home.svg"
import AboutUs from "./images/about-us.svg"
import Discount from "./images/discount.svg"
import Contacts from "./images/contacts.svg"

import "./css/Header.css"
import CollapsibleBlock from "./HeaderElements/HeaderElements"
import SecondHeader from "./SecondHeader.jsx";
import { useAuth } from "../shared/context/AuthContext.jsx";
import MainHeaderUserBlock from "./HeaderElements/MainHeaderUserBlock.jsx";

function Header() {
    const [showUserBlock, setShowUserBlock] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [showSecondHeader, setShowSecondHeader] = useState(false);
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

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

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

    return (
    < >
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
        <a href="#" className="main-header-svg-a">
            <img src={Giveaway} alt={Giveaway} className="main-header-svg" />
        </a>
        <a href="#" className="main-header-svg-a">
            <img src={Favorites} alt={Favorites} className="main-header-svg" />
        </a>
        <a href="/cart" className="main-header-svg-a">
            <img src={Cart} alt={Cart} className="main-header-svg" />
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
        {showSecondHeader && ( <SecondHeader /> )}

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
        <a href="#" className="mobile-header-svg-a">
            <img src={Favorites} alt={Favorites} className="mobile-header-svg mobile-header-svg__favourites" />
        </a>
        <a href="/cart" className="mobile-header-svg-a">
            <img src={Cart} alt={Cart} className="mobile-header-svg mobile-header-svg__cart" />
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

export default Header