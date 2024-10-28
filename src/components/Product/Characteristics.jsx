import React from 'react';

export default function Characteristics({ characteristic }) {
    return (
        <div className="characteristic-block">
            {Object.entries(characteristic).map(([title, value]) => (
                <article key={title} className="characteristic-item">
                    <p className="characteristic-item__title">{title}</p>
                    <div className="characteristic-item__stick"></div>
                    <p className="characteristic-item__value">{value}</p>
                </article>
            ))}
        </div>
    );
}
