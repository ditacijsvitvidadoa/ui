import "./css/Footer.css";
import FooterBlock from "./FooterElements/FooterElements.jsx";

import Logo from "../../assets/images/Logo/logo.svg";
import Phone from "./images/phone.svg";
import Clock from "./images/clock.svg";

import Instagram from "../../assets/images/SocialNetwork/Instagram.svg";
import Email from "../../assets/images/SocialNetwork/Email.svg";
import Facebook from "../../assets/images/SocialNetwork/Facebook.svg";
import {useAuth} from "../shared/context/AuthContext.jsx";

function Footer() {
    const { isAuthenticated } = useAuth();

    const AboutUs = [
        { text: "Історія компанії", link: "/company-history" },
        { text: "Місії та цінності", link: "/values" },
        { text: "Контакти", link: "/about-us" }
    ];

    const CarefulInformation = [
        { text: "Правила повернення та обміну", link: "/returns" },
        { text: "Політика конфіденційності", link: "/privacy-policy" },
        { text: "Умови використання сайту", link: "/terms" },
        { text: "Способи оплати та доставки", link: "/payment-delivery" }
    ];

    const ForUsersAuth = [
        { text: "Особистий кабінет", link: "/account" },
        { text: "Каталог", link: "/catalog" },
        { text: "Моя історія замовлень", link: "/order-history" },
        { text: "Бонуси та знижки", link: "/bonuses" }
    ];

    const ForUsersGuest = [
        { text: "Вхід до кабінету", link: "/account/login" },
        { text: "Каталог", link: "/catalog" },
        { text: "Реєстрація", link: "/register" }
    ];

    const Networks = [
        { type: "image", src: Instagram, alt: "instagram-icon", link: "https://instagram.com" },
        { type: "image", src: Email, alt: "email-icon", link: "mailto:info@example.com" },
        { type: "image", src: Facebook, alt: "facebook-icon", link: "https://facebook.com" }
    ];

    return (
        <>
            <footer className="footer">
                <div className="footer-content">
                    <img src={Logo} alt="Logo" className="footer-content__logo" />
                    <FooterBlock title="Про нас" content={AboutUs} />
                    <FooterBlock title="Корисна інформація" content={CarefulInformation} />
                    <FooterBlock
                        title="Клієнтам"
                        content={isAuthenticated ? ForUsersAuth : ForUsersGuest}
                    />
                </div>
                <div className="footer-content">
                    <FooterBlock title="Соціальні мережі" content={Networks} />
                    <article className="footer-content__info">
                        <section>
                            <img src={Phone} alt="Phone" />
                            <p className="footer-content__info-phone">+38(012)-345-67-89</p>
                        </section>
                        <section>
                            <img src={Clock} alt="Clock" />
                            <p className="footer-content__info-clock">Працюємо з 00:00 до 00:00</p>
                        </section>
                    </article>
                </div>
            </footer>

            <footer className="mobile-footer">
                <img src={Logo} alt="Logo" className="mobile-footer-content__logo" />
                <div className="mobile-footer-content">
                    <FooterBlock title="Про нас" content={AboutUs} />
                    <FooterBlock title="Корисна інформація" content={CarefulInformation} />
                    <FooterBlock
                        title="Клієнтам"
                        content={ForUsersAuth}
                    />
                    <FooterBlock title="Соціальні мережі" content={Networks} />
                </div>
                <div className="mobile-footer-content__info">
                    <article>
                        <img src={Phone} alt="Phone" />
                        <p className="mobile-footer-content__info-phone">+38(012)-345-67-89</p>
                    </article>
                    <article>
                        <img src={Clock} alt="Clock" />
                        <p className="mobile-footer-content__info-clock">Працюємо з 00:00 до 00:00</p>
                    </article>
                </div>
            </footer>
        </>
    );
}

export default Footer;
