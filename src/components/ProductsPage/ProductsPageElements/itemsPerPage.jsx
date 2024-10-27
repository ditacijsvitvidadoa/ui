import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Arrow from "../../Header/images/arrow.svg";

const ItemsPerPage = ({ values, defaultValue }) => {
    const [selectedValue, setSelectedValue] = useState(defaultValue);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const pageSize = params.get('pageSize');
        if (pageSize && values.includes(Number(pageSize))) {
            setSelectedValue(Number(pageSize));
        }
    }, [location.search, values]);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    const handleSelect = (value) => {
        setSelectedValue(value);
        updateUrl(value);
        setIsDropdownOpen(false);
    };

    const updateUrl = (value) => {
        const params = new URLSearchParams(location.search);
        params.set('pageSize', value);
        navigate({ search: params.toString() });
    };

    const otherValues = values.filter((v) => v !== selectedValue);

    return (
        <div className="products-options__block">
            <article
                className={`products-options__content products-options__content-styles ${isDropdownOpen ? 'open' : ''}`}
                onClick={toggleDropdown}
                style={{cursor: 'pointer'}}
            >
                {selectedValue}
                <img
                    src={Arrow}
                    alt="arrow"
                    className={`products-options__content-arrow ${isDropdownOpen ? 'rotated' : ''}`}
                />
            </article>


            {isDropdownOpen && (
                <article className="products-options__dropdown">
                    {otherValues.map((value) => (
                        <p className="products-options__dropdown-value" key={value} onClick={() => handleSelect(value)}>
                            {value}
                        </p>
                    ))}
                </article>
            )}
        </div>
    );
};

export default ItemsPerPage;
