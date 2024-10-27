import "./css/WhoAreWe.css"

import Slide1 from "./images/Slide1.jpg"

function WhoAreWe() {
    return (
        <section className="WhoAreWe-block">
            <div className="WhoAreWe-content">
                <h1 className="WhoAreWe-content__h1">Хто ми?</h1>
                <p className="WhoAreWe-content__p"><span>Дитячий світ від А до Я</span> – це магазин, де можна знайти
                    все
                    необхідне для дітей: від іграшок до товарів для догляду.
                    Ми прагнемо зробити життя батьків простішим, а дитинство – яскравішим,
                    пропонуючи широкий асортимент товарів для малюків і дітей різного віку.<br/><br/>

                    Наша місія – забезпечити дітей якісними та безпечними продуктами, що сприяють їхньому розвитку та
                    веселому дозвіллю. Ми ...</p>
                <a href="/about-us" className="WhoAreWe-content__button">
                    Детальніше
                </a>
            </div>
            <div className="WhoAreWe-slide">
                <img src={Slide1} className="WhoAreWe-img" alt="WhoAreWe-img" />
            </div>
        </section>
    )
}

export default WhoAreWe;