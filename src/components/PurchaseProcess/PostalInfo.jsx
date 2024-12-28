import React, { useState, useEffect, useCallback } from "react";
import SuggestionsList from "../shared/SuggestionsList/SuggestionsList.jsx";
import { fetchdata } from "../../services/fetchdata.js";

export default function PostalInfo({ formPostal, setFormPostal }) {
    const [inputCity, setInputCity] = useState(formPostal.city || "");
    const [inputPostalInfo, setInputPostalInfo] = useState(formPostal.postal_info || "");
    const [citySuggestions, setCitySuggestions] = useState([]);
    const [postalInfoSuggestions, setPostalInfoSuggestions] = useState([]);
    const [showCitySuggestions, setShowCitySuggestions] = useState(false);
    const [showPostalInfoSuggestions, setShowPostalInfoSuggestions] = useState(false);
    const [cityRef, setCityRef] = useState(null);
    const [searchTimeout, setSearchTimeout] = useState(null);

    const fetchCitySuggestions = useCallback(async (query) => {
        if (!query) {
            setCitySuggestions([]);
            return;
        }
        try {
            const response = await fetchdata(`/api/get-cities?search=${query}`);
            if (response.status === 200) {
                setCitySuggestions(response.data);
            } else {
                console.warn(`Failed to fetch cities: Status ${response.status}`);
            }
        } catch (error) {
            console.error("Error fetching cities:", error.message);
        }
    }, []);

    const fetchPostalInfoSuggestions = useCallback(async (query) => {
        if (!query || !cityRef) {
            setPostalInfoSuggestions([]);
            return;
        }
        try {
            const response = await fetchdata(`/api/get-postals/${cityRef}`);
            if (response.status === 200) {
                setPostalInfoSuggestions(response.data);
            } else {
                console.warn(`Failed to fetch postal info: Status ${response.status}`);
            }
        } catch (error) {
            console.error("Error fetching postal info:", error.message);
        }
    }, [cityRef]);

    const handleCityInputChange = useCallback((e) => {
        const { value } = e.target;
        setInputCity(value);
        setShowCitySuggestions(true);

        if (searchTimeout) clearTimeout(searchTimeout);
        setSearchTimeout(setTimeout(() => fetchCitySuggestions(value), 500));
    }, [fetchCitySuggestions, searchTimeout]);

    const selectCity = useCallback((city) => {
        setInputCity(city.desc);
        setFormPostal((prevData) => ({ ...prevData, city: city.desc }));
        const cityRef = city.ref.replace('city:', '');
        setCityRef(cityRef);
        setFormPostal((prevData) => ({ ...prevData, cityRef: city.ref }));
        setCitySuggestions([]);
        setShowCitySuggestions(false);

        // Fetch postal information for the selected city
        fetchPostalInfoSuggestions('');
    }, [setFormPostal, fetchPostalInfoSuggestions]);

    const handlePostalInfoInputChange = useCallback((e) => {
        const { value } = e.target;
        setInputPostalInfo(value);
        setShowPostalInfoSuggestions(true);

        if (searchTimeout) clearTimeout(searchTimeout);
        setSearchTimeout(setTimeout(() => fetchPostalInfoSuggestions(value), 500));
    }, [fetchPostalInfoSuggestions, searchTimeout, cityRef]);

    const selectPostalInfo = useCallback((postalInfo) => {
        // Directly update the input and form state when a suggestion is selected
        setInputPostalInfo(postalInfo.desc);
        setFormPostal((prevData) => ({
            ...prevData,
            postal_info: postalInfo.desc,
            postal_info_ref: postalInfo.ref, // make sure to update the postal_info_ref as well
        }));
        setPostalInfoSuggestions([]);
        setShowPostalInfoSuggestions(false);
    }, [setFormPostal]);

    useEffect(() => {
        setInputPostalInfo(formPostal.postal_info || "");
    }, [formPostal.postal_info]);

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
                    placeholder="Виберіть місто"
                    className="purchase-process__suggestion-input"
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
                            onChange={(e) => setFormPostal({ ...formPostal, postal_type: e.target.value })}
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
                            onChange={(e) => setFormPostal({ ...formPostal, receiving_type: e.target.value })}
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
                            formPostal.postal_type === "NovaPoshta" ? (
                                <div className="purchase-process__city-block">
                                    <input
                                        type="text"
                                        value={inputPostalInfo}
                                        required
                                        onChange={handlePostalInfoInputChange}
                                        onFocus={() => handlePostalInfoInputChange}
                                        onBlur={() => setTimeout(() => setShowPostalInfoSuggestions(false), 100)}
                                        placeholder="Виберіть відділення"
                                        className="purchase-process__suggestion-input"
                                    />
                                    {showPostalInfoSuggestions && (
                                        <SuggestionsList suggestions={postalInfoSuggestions} onSelectCity={selectPostalInfo} />
                                    )}
                                </div>
                            ) : formPostal.postal_type === "UrkPoshta" ? (
                                <>
                                    <div className="purchase-process__city-block">
                                        <input
                                            type="text"
                                            value={inputPostalInfo}
                                            required
                                            onChange={handlePostalInfoInputChange}
                                            onFocus={() => setShowPostalInfoSuggestions(true)}
                                            onBlur={() => setTimeout(() => setShowPostalInfoSuggestions(false), 100)}
                                            placeholder="Виберіть відділення"
                                            className="purchase-process__suggestion-input"
                                        />
                                    </div>
                                    <p className="purchase-process__ukr-poshta-p">*Введіть коректне відділення Укрпошти</p>
                                </>
                            ) : null
                        ) : (
                            <article className="purchase-process-inputs">
                                {["street", "house", "apartment", "floor"].map((field) => (
                                    <input
                                        key={field}
                                        type="text"
                                        name={field}
                                        value={formPostal[field] || ""}
                                        onChange={(e) => setFormPostal({...formPostal, [field]: e.target.value})}
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
