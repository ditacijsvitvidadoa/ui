import SadSvg from "../../assets/images/GiftBonuses/sad-person.svg";

import "./BonusesPage.css";

export default function BonusesPage() {
    return (
        <section className="bonuses">
            <img src={SadSvg || ""} alt="sad-svg" className="bonuses__img"/>
            <h1 className="bonuses__h1">Подарків та бонусів поки-що немає</h1>
            <a href="/" className="empty-cart__btn">На головну сторінку</a>
        </section>
    )
}