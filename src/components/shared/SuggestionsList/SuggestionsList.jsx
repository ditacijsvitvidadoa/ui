import React from 'react';

const SuggestionsList = ({ suggestions, onSelectCity }) => {
    if (suggestions.length === 0) return null;

    return (
        <ul className="purchase-process__suggestions-list">
            {suggestions.map((city, index) => (
                <li key={index} onClick={() => onSelectCity(city)}>
                    {city.desc}
                </li>
            ))}
        </ul>
    );
};

export default SuggestionsList;
