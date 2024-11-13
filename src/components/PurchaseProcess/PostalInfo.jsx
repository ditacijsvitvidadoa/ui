import React, { useState, useEffect, useCallback } from "react";
import SuggestionsList from "../shared/SuggestionsList/SuggestionsList.jsx";
import { fetchdata } from "../../services/fetchdata.js";

export default function PostalInfo({ formPostal, setFormPostal, isValidCity, setIsValidCity }) {
    const [inputCity, setInputCity] = useState(formPostal.city || "");
    const [citySuggestions, setCitySuggestions] = useState([]);
    const [showCitySuggestions, setShowCitySuggestions] = useState(false);
    const [searchTimeout, setSearchTimeout] = useState(null);

    const fetchCitySuggestions = useCallback(async (query) => {
        if (!query) {
            setCitySuggestions([]);
            setIsValidCity(false);
            return;
        }
        try {
            const response = await fetchdata(`/api/get-cities?search=${query}`);
            if (response.status === 200) {
                setCitySuggestions(response.data);
                const isCityValid = response.data.some(city => city.desc.toLowerCase() === query.toLowerCase());
                setIsValidCity(isCityValid);
            } else {
                console.warn(`Failed to fetch cities: Status ${response.status}`);
            }
        } catch (error) {
            console.error("Error fetching cities:", error.message);
        }
    }, [setIsValidCity]);

    useEffect(() => {
        setInputCity(formPostal.city || "");
    }, [formPostal.city]);

    const handleCityInputChange = useCallback((e) => {
        const { value } = e.target;
        setInputCity(value);
        setShowCitySuggestions(true);

        if (searchTimeout) clearTimeout(searchTimeout);
        setSearchTimeout(setTimeout(() => fetchCitySuggestions(value), 500));
    }, [fetchCitySuggestions, searchTimeout]);

    const selectCity = useCallback((city) => {
        setInputCity(city.desc);
        setFormPostal(prevData => ({ ...prevData, city: city.desc }));
        setCitySuggestions([]);
        setIsValidCity(true);
        setShowCitySuggestions(false);
    }, [setFormPostal, setIsValidCity]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormPostal(prevData => ({ ...prevData, [name]: value }));
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
                    onFocus={() => setShowCitySuggestions(true)}
                    onBlur={() => setTimeout(() => setShowCitySuggestions(false), 100)}
                    placeholder="Місто"
                    className={`purchase-process__suggestion-input ${!isValidCity ? "invalid" : ""}`}
                />
                {showCitySuggestions && (
                    <SuggestionsList suggestions={citySuggestions} onSelectCity={selectCity} />
                )}
            </div>

            <article className="postal-options">
                {["NovaPoshta", "UrkPoshta"].map((type) => (
                    <label key={type} className="postal-option">
                        <input
                            type="radio"
                            name="postal_type"
                            value={type}
                            checked={formPostal.postal_type === type}
                            onChange={handleInputChange}
                            className="postal-radio"
                            required
                        />
                        {type === "NovaPoshta" ? "Новою поштою" : "Укр поштою"}
                    </label>
                ))}
            </article>

            <div className="separator-block"></div>

            <article className="postal-options">
                {["Branches", "Courier"].map((receivingType) => (
                    <label key={receivingType} className="postal-option">
                        <input
                            type="radio"
                            name="receiving_type"
                            value={receivingType}
                            checked={formPostal.receiving_type === receivingType}
                            onChange={handleInputChange}
                            className="postal-radio"
                            required
                        />
                        {receivingType === "Branches" ? "Самовивіз" : "Кур'єром"}
                    </label>
                ))}
            </article>

            {formPostal.postal_type && formPostal.receiving_type && (
                <div>
                    <div className="separator-block"></div>
                    <article className="postal-options">
                        {formPostal.receiving_type === "Branches" ? (
                            <input
                                type="text"
                                name="branch"
                                value={formPostal.postal_info || ""}
                                onChange={handleInputChange}
                                placeholder="Виберіть відділення"
                                className="contact-data-input"
                                required
                            />
                        ) : (
                            <article className="purchase-process-inputs">
                                {["street", "house", "apartment", "floor"].map((field) => (
                                    <input
                                        key={field}
                                        type="text"
                                        name={field}
                                        value={formPostal[field] || ""}
                                        onChange={handleInputChange}
                                        placeholder={field[0].toUpperCase() + field.slice(1)}
                                        className="contact-data-input"
                                        required={field === "street"}
                                    />
                                ))}
                            </article>
                        )}
                    </article>
                </div>
            )}
        </div>
    );
}
