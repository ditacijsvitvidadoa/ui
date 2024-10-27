import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Arrow from "../../Header/images/arrow.svg";

function SortProducts({ values, defaultValue }) {
    const [selectedValue, setSelectedValue] = useState(defaultValue);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const sortOrder = params.get('sortOrder');
        // Проверяем, если sortOrder существует и является допустимым значением
        if (sortOrder && values.some(option => option.value === sortOrder)) {
            setSelectedValue(sortOrder);
        } else {
            // Если нет, то устанавливаем значение по умолчанию
            setSelectedValue(defaultValue);
        }
    }, [location.search, values, defaultValue]);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    const handleSelect = (value) => {
        setSelectedValue(value);
        updateUrl(value);
        setIsDropdownOpen(false);
    };

    const updateUrl = (value) => {
        const params = new URLSearchParams(location.search);
        params.set('sortOrder', value);
        navigate({ search: params.toString() });
    };

    const otherValues = values.filter((option) => option.value !== selectedValue);

    return (
        <div className="products-sortOrder__block">
            <article
                className={`products-options__content products-options__content-styles ${isDropdownOpen ? 'open' : ''}`}
                onClick={toggleDropdown}
                style={{ cursor: 'pointer' }}
            >
                {values.find(option => option.value === selectedValue)?.label}
                <img
                    src={Arrow}
                    alt="arrow"
                    className={`products-options__content-arrow ${isDropdownOpen ? 'rotated' : ''}`}
                />
            </article>

            {isDropdownOpen && (
                <article className="products-options__dropdown products-sortOrder__dropdown">
                    {otherValues.map((option) => (
                        <p className="products-options__dropdown-value" key={option.value} onClick={() => handleSelect(option.value)}>
                            {option.label}
                        </p>
                    ))}
                </article>
            )}
        </div>
    );
}

export default SortProducts;
