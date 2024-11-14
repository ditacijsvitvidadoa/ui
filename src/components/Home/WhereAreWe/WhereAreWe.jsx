import Map from "./images/Map.jpg"
import Location from "./images/location.png"

import "./css/WhereAreWe.css"

function WhereAreWe() {
    return (
        <section className="WhereAreWe-block">
            <div className="WhereAreWe-map">
                <img src={Map || ""} alt="Map" />
            </div>
            <div className="WhereAreWe-content">
                <h1 className="WhereAreWe-content__h1">Де нас знайти?</h1>
                <p className="WhereAreWe-content__p">Відвідайте нас за однією з цих адрес, щоб отримати консультацію, зробити замовлення або просто завітати. Ми завжди раді вам допомогти:</p>
                <article className="WhereAreWe-content-item">
                    <img src={Location || ""} alt="location svg" />
                    <p>вулиця Генерала Петрова, 48В, Мукачево</p>
                </article>
                <article className="WhereAreWe-content-item">
                    <img src={Location || ""} alt="location svg" />
                    <p>вулиця Возз'єднання, 8/а, Мукачево</p>
                </article>
                <article className="WhereAreWe-content-item">
                    <img src={Location || ""} alt="location svg" />
                    <p>вулиця Легоцького, 80 (ЖК "PARKLAND"), Ужгород</p>
                </article>
            </div>
        </section>
    )
}

export default WhereAreWe;