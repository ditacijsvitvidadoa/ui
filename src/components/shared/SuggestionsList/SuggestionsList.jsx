import React from 'react';

const SuggestionsList = ({ suggestions, onSelectCity }) => {
    return (
        <ul className="purchase-process__suggestions-list">
            {suggestions.length > 0 ? (
                suggestions.map((city, index) => (
                    <li key={index} onClick={() => onSelectCity(city)}>
                        {city.desc}
                    </li>
                ))
            ) : (
                <li className="purchase-process__suggestions-list-no-results">Нічого не знайдено</li>
            )}
        </ul>
    );
};

export default SuggestionsList;
