import { useEffect, useState } from "react";
import SuccessfullCheckMark from "../../assets/images/Successful/successful-check-mark.svg";

export default function SuccessfulPurchase() {
    const [isVisible, setIsVisible] = useState(true);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        if (isVisible) {
            document.body.classList.add('no-scroll');
            // Запуск анимации
            const interval = setInterval(() => {
                setWidth((prevWidth) => {
                    if (prevWidth >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    return prevWidth + 1;
                });
            }, 18);

            return () => {
                clearInterval(interval);
                document.body.classList.remove('no-scroll');
            };
        }
    }, [isVisible]);

    const closeOverlay = () => {
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="successful-purchase-overlay">
            <div className="successful-purchase">
                <img src={SuccessfullCheckMark || ""} alt="successful" className="successful-purchase__img" />
                <h1 className="successful-purchase__h1">Ваш заказ успішно оформлено!</h1>
                <p className="successful-purchase__p">Через деякий час з вами зв'яжеться наш менеджер</p>

                <p className="successful-purchase__p2">Перенаправлення на головну сторінку:</p>
                <div className="progress-bar">
                    <div className="progress-bar__fill" style={{ width: `${width}%` }}></div>
                </div>
            </div>
        </div>
    );
}
