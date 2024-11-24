import { useEffect, useRef, useState } from "react";
import NovaPoshta from "../../../../assets/images/Postal/Nova-poshta.svg";
import { fetchdata } from "../../../../services/fetchdata.js";

function EniqueElement({ title, postal_service_info }) {
    const [selectedService, setSelectedService] = useState("NovaPoshta");
    const [deliveryType, setDeliveryType] = useState("address");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");
    const [house, setHouse] = useState("");
    const [branch, setBranch] = useState("");
    const [hasPostalInfo, setHasPostalInfo] = useState(!!postal_service_info);

    const inputRef = useRef(null);

    const handleServiceChange = (e) => setSelectedService(e.target.value);
    const handleDeliveryTypeChange = (e) => setDeliveryType(e.target.value);
    const handleCityChange = (e) => setCity(e.target.value);

    const handleShowInputs = () => setHasPostalInfo(true);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!city || (deliveryType === "address" && (!street || !house)) || (deliveryType === "branch" && !branch)) {
            return;
        }

        const payload = {
            postal_service: selectedService,
            delivery_type: deliveryType,
            city,
            ...(deliveryType === "address" && { street, house }),
            ...(deliveryType === "branch" && { branch }),
        };

        try {
            await fetchdata("/api/update-postal-info", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
        } catch (error) {
            console.error("Ошибка отправки данных:", error);
        }
    };

    useEffect(() => {
        if (inputRef.current) inputRef.current.focus();
    }, [deliveryType]);

    return (
        <article className="base-element">
            <section className="base-element__content">
                <p className="base-element__content-title">{title}:</p>

                {hasPostalInfo ? (
                    <form onSubmit={handleSubmit}>
                        <div className="base-element__content-block enuqie-element__content-block">
                            <label>
                                <img src={NovaPoshta} alt="NovaPoshta" />
                                <input
                                    type="radio"
                                    value="NovaPoshta"
                                    required
                                    checked={selectedService === "NovaPoshta"}
                                    onChange={handleServiceChange}
                                />
                            </label>
                        </div>

                        <div className="delivery-city">
                            <input
                                required
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
                                        className="base-element__content-input"
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Введіть номер будинку"
                                        value={house}
                                        onChange={(e) => setHouse(e.target.value)}
                                        className="base-element__content-input base-element__content-input__last"
                                        required
                                    />
                                </>
                            ) : (
                                <input
                                    type="text"
                                    placeholder="Введіть номер відділення"
                                    value={branch}
                                    onChange={(e) => setBranch(e.target.value)}
                                    ref={inputRef}
                                    className="base-element__content-input"
                                    required
                                />
                            )}
                        </div>

                        <button
                            type="submit"
                            className="base-element-btn enique-element_btn"
                        >
                            Відправити
                        </button>
                    </form>
                ) : (
                    <div className="base-element enique-element">
                        <p className="enique-element_p">Не вказано</p>
                        <button
                            className="base-element-btn"
                            onClick={handleShowInputs}
                        >
                            Добавити
                        </button>
                    </div>
                )}
            </section>
        </article>
    );
}

export default EniqueElement;
