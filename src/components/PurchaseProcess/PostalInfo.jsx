import React, { useState, useEffect } from "react";

const citiesData = [
    { name: "Киев" },
    { name: "Львов" },
    { name: "Одесса" },
    { name: "Харьков" },
    { name: "Днепр" },
    { name: "Запорожье" },
    { name: "Кривой Рог" },
    { name: "Николаев" },
    { name: "Тернополь" },
    { name: "Черновцы" },
    { name: "Сумы" },
    { name: "Житомир" },
    { name: "Мукачево" }
];

export default function PostalInfo({ formPostal, setFormPostal, isValidCity, setIsValidCity }) {
    const [inputCity, setInputCity] = useState(formPostal.city || "");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    useEffect(() => {
        setInputCity(formPostal.city || "");
    }, [formPostal.city]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormPostal(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCityInputChange = (e) => {
        const { value } = e.target;
        setInputCity(value);

        const filteredCities = citiesData.filter(city =>
            city.name.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filteredCities);

        const isCityValid = value === "" || filteredCities.some(city => city.name.toLowerCase() === value.toLowerCase());
        setIsValidCity(isCityValid);
    };

    const selectCity = (city) => {
        setInputCity(city.name);
        setFormPostal(prevData => ({
            ...prevData,
            city: city.name,
        }));
        setSuggestions([]);
        setIsValidCity(true);
        setShowSuggestions(false);
    };

    const handleFocus = () => {
        setShowSuggestions(true);
    };

    const handleBlur = () => {
        setTimeout(() => {
            setShowSuggestions(false);
        }, 100);
    };

    return (
        <div className="purchase-process-block">
            <h2 className="contact-data-block__h2">Доставка</h2>

            <div className="purchase-process__city-block">
                <input
                    type="text"
                    value={inputCity}
                    required
                    onChange={handleCityInputChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="Місто"
                    className={`contact-data-input ${!isValidCity ? "invalid" : ""}`}
                />
                {showSuggestions && suggestions.length > 0 && (
                    <ul className="purchase-process__suggestions-list">
                        {suggestions.map((city, index) => (
                            <li key={index} onClick={() => selectCity(city)}>
                                {city.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <article className="postal-options">
                <label className="postal-option">
                    <input
                        type="radio"
                        name="postal_type"
                        value="NovaPoshta"
                        checked={formPostal.postal_type === "NovaPoshta"}
                        onChange={handleInputChange}
                        className="postal-radio"
                        required
                    />
                    Новою поштою
                </label>

                <label className="postal-option">
                    <input
                        type="radio"
                        name="postal_type"
                        value="UrkPoshta"
                        checked={formPostal.postal_type === "UrkPoshta"}
                        onChange={handleInputChange}
                        className="postal-radio"
                        required
                    />
                    Укр поштою
                </label>
            </article>

            <div className="separator-block"></div>

            <article className="postal-options">
                <label className="postal-option">
                    <input
                        type="radio"
                        name="receiving_type"
                        value="Branches"
                        checked={formPostal.receiving_type === "Branches"}
                        onChange={handleInputChange}
                        className="postal-radio"
                        required
                    />
                    Самовивіз
                </label>

                <label className="postal-option">
                    <input
                        type="radio"
                        name="receiving_type"
                        value="Courier"
                        checked={formPostal.receiving_type === "Courier"}
                        onChange={handleInputChange}
                        className="postal-radio"
                        required
                    />
                    Кур'єром
                </label>
            </article>

            {formPostal.postal_type && formPostal.receiving_type && (
                <div>
                    <div className="separator-block"></div>
                    <article className="postal-options">
                        {
                            formPostal.receiving_type === "Branches" ? (
                                <div>
                                    <input
                                        type="text"
                                        name="branch"
                                        value={formPostal.postal_info || ""}
                                        onChange={handleInputChange}
                                        placeholder="Виберіть відділення"
                                        className="contact-data-input"
                                        required
                                    />
                                </div>
                            ) : formPostal.receiving_type === "Courier" ? (
                                <article className="purchase-process-inputs">
                                    <input
                                        type="text"
                                        name="street"
                                        value={formPostal.street || ""}
                                        onChange={handleInputChange}
                                        placeholder="Вулиця"
                                        className="contact-data-input"
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="house"
                                        value={formPostal.house || ""}
                                        onChange={handleInputChange}
                                        placeholder="Будинок"
                                        className="contact-data-input"
                                    />
                                    <input
                                        type="text"
                                        name="apartment"
                                        value={formPostal.apartment || ""}
                                        onChange={handleInputChange}
                                        placeholder="Квартира"
                                        className="contact-data-input"
                                    />
                                    <input
                                        type="text"
                                        name="floor"
                                        value={formPostal.floor || ""}
                                        onChange={handleInputChange}
                                        placeholder="Поверх"
                                        className="contact-data-input"
                                    />
                                </article>
                            ) : (
                                <></>
                            )
                        }
                    </article>
                </div>
            )}
        </div>
    );
}