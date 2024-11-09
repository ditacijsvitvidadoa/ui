import React from 'react';

export default function Characteristics({ characteristics }) {
    return (
        <div className="characteristic-block">
            {characteristics.map((characteristic, index) => (
                <article key={index} className="characteristic-item">
                    <p className="characteristic-item__title">{characteristic.key}</p>
                    <div className="characteristic-item__stick"></div>
                    <p className="characteristic-item__value">{characteristic.value}</p>
                </article>
            ))}
        </div>
    );
}

