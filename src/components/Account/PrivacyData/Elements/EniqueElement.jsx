import { useEffect, useRef, useState } from "react";
import NovaPoshta from "../../../../assets/images/Postal/Nova-poshta.svg";
import UkrPoshta from "../../../../assets/images/Postal/Ukr-poshta.svg";

function EniqueElement({ title, postal_service_info }) {
    const [selectedService, setSelectedService] = useState("NovaPoshta");
    const [deliveryType, setDeliveryType] = useState("address");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");
    const [house, setHouse] = useState("");
    const [branch, setBranch] = useState("");

    const inputRef = useRef(null);

    const handleServiceChange = (e) => setSelectedService(e.target.value);

    const handleDeliveryTypeChange = (e) => setDeliveryType(e.target.value);

    const handleCityChange = (e) => setCity(e.target.value);

    useEffect(() => {
        if (inputRef.current) inputRef.current.focus();
    }, [deliveryType]);

    return (
        <article className="base-element">
            <section className="base-element__content">
                <p className="base-element__content-title">{title}:</p>

                <div className="base-element__content-block">
                    <label>
                        <img src={NovaPoshta} alt="NovaPoshta" />
                        <input
                            type="radio"
                            value="NovaPoshta"
                            checked={selectedService === "NovaPoshta"}
                            onChange={handleServiceChange}
                        />
                        Нова Пошта
                    </label>

                    <label>
                        <img src={UkrPoshta} alt="UkrPoshta" />
                        <input
                            type="radio"
                            value="UkrPoshta"
                            checked={selectedService === "UkrPoshta"}
                            onChange={handleServiceChange}
                        />
                        Укр Пошта
                    </label>
                </div>

                <div className="delivery-city">
                    <input
                        type="text"
                        placeholder="Введіть місто"
                        value={city}
                        onChange={handleCityChange}
                    />
                </div>

                <div className="delivery-type">
                    <label>
                        <input
                            type="radio"
                            value="address"
                            checked={deliveryType === "address"}
                            onChange={handleDeliveryTypeChange}
                        />
                        За адресою
                    </label>

                    <label>
                        <input
                            type="radio"
                            value="branch"
                            checked={deliveryType === "branch"}
                            onChange={handleDeliveryTypeChange}
                        />
                        У відділення
                    </label>
                </div>

                <div className="delivery-fields">
                    {deliveryType === "address" ? (
                        <>
                            <input
                                type="text"
                                placeholder="Введіть вулицю"
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                                ref={inputRef}
                            />
                            <input
                                type="text"
                                placeholder="Введіть номер будинку"
                                value={house}
                                onChange={(e) => setHouse(e.target.value)}
                            />
                        </>
                    ) : (
                        <input
                            type="text"
                            placeholder="Введіть номер відділення"
                            value={branch}
                            onChange={(e) => setBranch(e.target.value)}
                            ref={inputRef}
                        />
                    )}
                </div>
            </section>
        </article>
    );
}

export default EniqueElement;
